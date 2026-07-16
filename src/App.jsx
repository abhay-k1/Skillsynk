import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import OnboardingForm from './components/OnboardingForm';
import GapDetection from './components/GapDetection';
import MatchResults from './components/MatchResults';
import BookingScreen from './components/BookingScreen';
import MentorDashboard from './components/MentorDashboard';
import LoginPage from './components/LoginPage';
import { supabase } from './supabaseClient';

// Mock mentors list
import { mockMentors } from './data/mockMentors';
import { scoreAndExplainMatches } from './services/aiService';

export default function App() {
  const [view, setView] = useState('login'); // default to glassmorphic login
  const [userRole, setUserRole] = useState(null); // 'learner' | 'mentor' | 'admin'

  // Learner profile state
  const [learnerProfile, setLearnerProfile] = useState({
    name: '',
    targetRole: 'Product Designer',
    experience: 'Junior',
    goals: '',
    learningStyle: 'hands-on project building',
    currentSkills: []
  });

  // Skills & Gaps analysis results
  const [gaps, setGaps] = useState([]);
  // Top matched mentors
  const [matches, setMatches] = useState([]);
  // Selected mentor for booking
  const [selectedMentor, setSelectedMentor] = useState(null);

  // Shared state for custom roadmaps uploaded by mentors
  const [customRoadmaps, setCustomRoadmaps] = useState([]);

  // Shared state for public seminars
  const [seminars, setSeminars] = useState([
    {
      id: "seed_seminar_1",
      title: "Breaking into Tech: Resume speedruns & portfolio roasting",
      mentorName: "Aria Chen",
      dateTime: "2026-07-22 at 6:00 PM EST",
      description: "Public roasting of portfolio frameworks. Open to all students, developers, and designers.",
      link: "https://zoom.us/mock-seminar-aria"
    }
  ]);

  // Role Access Security Guard
  useEffect(() => {
    if (!userRole && view !== 'login') {
      setView('login');
      return;
    }
    if (userRole === 'learner') {
      // Learners can only view learner screens
      if (view === 'mentor-dashboard' || view === 'admin-dashboard') {
        setView('landing');
      }
    } else if (userRole === 'mentor') {
      // Mentors are locked into the mentor dashboard
      if (view !== 'mentor-dashboard') {
        setView('mentor-dashboard');
      }
    }
  }, [view, userRole]);

  // Sync React View state with browser hash history for Back/Forward navigation
  useEffect(() => {
    if (!window.history.state) {
      window.history.replaceState({ view }, '', `#${view}`);
    }
  }, []);

  useEffect(() => {
    if (window.location.hash !== `#${view}`) {
      window.history.pushState({ view }, '', `#${view}`);
    }
  }, [view]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.view) {
        setView(event.state.view);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch initial data from Supabase database on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch custom roadmaps
        const { data: roadmapsData } = await supabase
          .from('custom_roadmaps')
          .select('*');
        if (roadmapsData && roadmapsData.length > 0) {
          setCustomRoadmaps(roadmapsData.map(r => ({
            mentorId: r.mentor_id,
            mentorName: r.mentor_name,
            skillName: r.skill_name,
            steps: r.steps
          })));
        }

        // Fetch bookings
        const { data: bookingsData } = await supabase
          .from('bookings')
          .select('*');
        if (bookingsData && bookingsData.length > 0) {
          const mappedBookings = bookingsData.map(b => ({
            id: b.id,
            studentName: b.student_name,
            studentProfile: {
              name: b.student_name,
              targetRole: b.student_role,
              experience: b.student_experience,
              goals: b.student_goals,
              learningStyle: b.student_learning_style
            },
            gaps: b.gaps || [],
            mentorId: b.mentor_id,
            mentorName: b.mentor_name,
            slot: b.slot,
            dateBooked: b.date_booked
          }));
          setBookings(prev => {
            const combined = [...mappedBookings, ...prev.filter(p => !mappedBookings.some(m => m.id === p.id))];
            return combined;
          });
        }

        // Fetch public seminars
        const { data: seminarsData } = await supabase
          .from('seminars')
          .select('*');
        if (seminarsData && seminarsData.length > 0) {
          const mappedSeminars = seminarsData.map(s => ({
            id: s.id,
            title: s.title,
            mentorName: s.mentor_name,
            dateTime: s.date_time,
            description: s.description,
            link: s.link
          }));
          setSeminars(prev => {
            const combined = [...mappedSeminars, ...prev.filter(p => !mappedSeminars.some(m => m.id === p.id))];
            return combined;
          });
        }
      } catch (err) {
        console.warn("Supabase load initial state failed:", err);
      }
    };

    fetchInitialData();
  }, []);

  // Dynamic booking state
  const [bookings, setBookings] = useState([
    {
      id: "booking_seed_1",
      studentName: "Liam Vance",
      studentProfile: {
        name: "Liam Vance",
        targetRole: "Product Designer",
        experience: "Beginner",
        goals: "Transition from sales to product design",
        learningStyle: "hands-on project building"
      },
      gaps: [
        { name: "Figma", status: "missing", priority: "High" },
        { name: "Design Systems", status: "needs work", priority: "High" },
        { name: "UI/UX Design", status: "needs work", priority: "High" },
        { name: "User Research", status: "mastered", priority: "Medium" }
      ],
      mentorId: "mentor_1", // Aria Chen
      mentorName: "Aria Chen",
      slot: "Monday 3:00 PM",
      dateBooked: "2026-07-15"
    },
    {
      id: "booking_seed_2",
      studentName: "Chloe Zhang",
      studentProfile: {
        name: "Chloe Zhang",
        targetRole: "Frontend Engineer",
        experience: "Intermediate",
        goals: "Level up React skill gaps to Next.js systems",
        learningStyle: "deep-dive theory with pair programming"
      },
      gaps: [
        { name: "Next.js", status: "missing", priority: "High" },
        { name: "System Design", status: "missing", priority: "Medium" },
        { name: "React", status: "mastered", priority: "High" },
        { name: "JavaScript", status: "mastered", priority: "High" }
      ],
      mentorId: "mentor_2", // Devon Miller
      mentorName: "Devon Miller",
      slot: "Wednesday 3:00 PM",
      dateBooked: "2026-07-16"
    }
  ]);

  // Action: Add new booking
  const addBooking = async (mentor, slot) => {
    const newBooking = {
      id: `booking_${Date.now()}`,
      studentName: learnerProfile.name || 'Anonymous Learner',
      studentProfile: { ...learnerProfile },
      gaps: [...gaps],
      mentorId: mentor.id,
      mentorName: mentor.name,
      slot: slot,
      dateBooked: new Date().toISOString().split('T')[0]
    };

    try {
      await supabase.from('bookings').insert({
        id: newBooking.id,
        student_name: newBooking.studentName,
        student_role: learnerProfile.targetRole,
        student_experience: learnerProfile.experience,
        student_goals: learnerProfile.goals,
        student_learning_style: learnerProfile.learningStyle,
        mentor_id: mentor.id,
        mentor_name: mentor.name,
        slot: slot,
        date_booked: newBooking.dateBooked,
        gaps: gaps
      });
    } catch (err) {
      console.warn("Supabase booking insert failed:", err);
    }

    setBookings((prev) => [newBooking, ...prev]);
  };

  // Action: Publish custom roadmap (mentor upload)
  const publishCustomRoadmap = async (newRoadmap) => {
    try {
      // Overwrite existing by deleting old match first
      await supabase
        .from('custom_roadmaps')
        .delete()
        .match({ mentor_id: newRoadmap.mentorId, skill_name: newRoadmap.skillName });

      // Insert new custom record
      await supabase
        .from('custom_roadmaps')
        .insert({
          mentor_id: newRoadmap.mentorId,
          mentor_name: newRoadmap.mentorName,
          skill_name: newRoadmap.skillName,
          steps: newRoadmap.steps
        });
    } catch (err) {
      console.warn("Supabase custom roadmap insert failed:", err);
    }

    setCustomRoadmaps(prev => {
      const filtered = prev.filter(
        r => !(r.skillName.toLowerCase() === newRoadmap.skillName.toLowerCase() && r.mentorId === newRoadmap.mentorId)
      );
      return [newRoadmap, ...filtered];
    });
  };

  // Action: Publish public seminar
  const publishSeminar = async (newSeminar) => {
    try {
      await supabase.from('seminars').insert({
        title: newSeminar.title,
        mentor_name: newSeminar.mentorName,
        date_time: newSeminar.dateTime,
        description: newSeminar.description,
        link: newSeminar.link
      });
    } catch (err) {
      console.warn("Supabase seminar insert failed:", err);
    }
    setSeminars(prev => [newSeminar, ...prev]);
  };

  // Render view based on state
  const renderView = () => {
    switch (view) {
      case 'login':
        return (
          <LoginPage 
            onLogin={(email, role) => {
              // Extract name from email username and capitalize it
              const username = email.split('@')[0];
              const capName = username.charAt(0).toUpperCase() + username.slice(1);
              setLearnerProfile(prev => ({ ...prev, name: capName }));
              setUserRole(role);
              
              if (role === 'mentor') {
                setView('mentor-dashboard');
              } else if (role === 'admin') {
                setView('admin-dashboard');
              } else {
                setView('landing');
              }
            }}
          />
        );
      case 'landing':
        return (
          <LandingPage 
            onStart={() => setView('onboarding')} 
            onSwitchToMentor={() => setView('mentor-dashboard')}
            userRole={userRole}
            seminars={seminars}
          />
        );
      case 'onboarding':
        return (
          <OnboardingForm 
            profile={learnerProfile}
            setProfile={setLearnerProfile}
            onComplete={() => setView('gap-detection')}
          />
        );
      case 'gap-detection':
        return (
          <GapDetection 
            targetRole={learnerProfile.targetRole}
            setGaps={(analyzedGaps) => {
              setGaps(analyzedGaps);
            }}
            onComplete={async (analyzedGaps) => {
              // Immediately calculate matches using our AI service logic
              // to make transition seamless
              const topMatches = await scoreAndExplainMatches(learnerProfile, analyzedGaps, mockMentors);
              setMatches(topMatches);
              setView('matches');
            }}
          />
        );
      case 'matches':
        return (
          <MatchResults 
            gaps={gaps}
            matches={matches}
            mentors={mockMentors}
            customRoadmaps={customRoadmaps}
            onSelectMentor={(mentor) => {
              setSelectedMentor(mentor);
              setView('booking');
            }}
            onBack={() => setView('gap-detection')}
          />
        );
      case 'booking':
        return (
          <BookingScreen 
            mentor={selectedMentor}
            onBookSlot={(slot) => {
              addBooking(selectedMentor, slot);
            }}
            onBack={() => setView('matches')}
            onFinish={() => setView('mentor-dashboard')}
          />
        );
      case 'mentor-dashboard':
        return (
          <MentorDashboard 
            bookings={bookings}
            mentors={mockMentors}
            customRoadmaps={customRoadmaps}
            onPublishRoadmap={publishCustomRoadmap}
            seminars={seminars}
            onPublishSeminar={publishSeminar}
          />
        );
      case 'admin-dashboard':
        return (
          <div className="admin-dashboard card animate-slide-up" style={{ padding: '2.5rem', textAlign: 'left', background: 'rgba(255, 255, 255, 0.95)', border: '3px solid var(--color-dark)', boxShadow: 'var(--block-shadow-md)', borderRadius: '24px' }}>
            <div className="admin-header" style={{ borderBottom: '3px solid var(--color-dark)', paddingBottom: '1rem', marginBottom: '2rem' }}>
              <span className="badge badge-danger" style={{ backgroundColor: 'var(--color-accent)', color: '#FFFFFF', border: '2px solid var(--color-dark)' }}>ADMIN OVERWATCH</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Space Grotesk', marginTop: '0.5rem', color: 'var(--color-dark)' }}>⚡ System Oversight Control Panel</h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginTop: '0.25rem' }}>Manage mentor pipelines, verify match weights, and audit unaddressed skill blockers.</p>
            </div>

            <div className="admin-stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '2px solid var(--color-dark)', borderRadius: '16px', boxShadow: '3px 3px 0 var(--color-dark)' }}>
                <h5 style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>TOTAL LEARNERS</h5>
                <h3 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Space Grotesk', color: 'var(--color-dark)' }}>1,842</h3>
              </div>
              <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '2px solid var(--color-dark)', borderRadius: '16px', boxShadow: '3px 3px 0 var(--color-dark)' }}>
                <h5 style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>ACTIVE MENTORS</h5>
                <h3 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Space Grotesk', color: 'var(--color-dark)' }}>42</h3>
              </div>
              <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '2px solid var(--color-dark)', borderRadius: '16px', boxShadow: '3px 3px 0 var(--color-dark)' }}>
                <h5 style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>MATCHES COOKED</h5>
                <h3 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Space Grotesk', color: 'var(--color-dark)' }}>896</h3>
              </div>
              <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', border: '2px solid var(--color-dark)', borderRadius: '16px', boxShadow: '3px 3px 0 var(--color-dark)' }}>
                <h5 style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>AI MATCH ACCURACY</h5>
                <h3 style={{ fontSize: '2.2rem', fontWeight: 800, fontFamily: 'Space Grotesk', color: 'var(--color-dark)' }}>98.2%</h3>
              </div>
            </div>

            <div className="admin-table-section">
              <h4 style={{ fontWeight: 800, marginBottom: '1rem', fontFamily: 'Space Grotesk', color: 'var(--color-dark)' }}>Active System Operations Log</h4>
              <div className="card" style={{ padding: '1.5rem', border: '2px solid var(--color-dark)', borderRadius: '16px' }}>
                <div style={{ padding: '0.85rem 0', borderBottom: '1px solid rgba(0,0,0,0.1)', fontSize: '0.9rem', color: 'var(--color-dark)', fontWeight: 600 }}>🛡️ Vector database weight audits completed successfully.</div>
                <div style={{ padding: '0.85rem 0', borderBottom: '1px solid rgba(0,0,0,0.1)', fontSize: '0.9rem', color: 'var(--color-dark)', fontWeight: 600 }}>📦 Semantic index cache: 100% synchronized.</div>
                <div style={{ padding: '0.85rem 0', fontSize: '0.9rem', color: 'var(--color-dark)', fontWeight: 600 }}>💬 OpenAI/Gemini matching models checkpoints active.</div>
              </div>
            </div>

            <button className="btn btn-secondary" style={{ marginTop: '2rem' }} onClick={() => setView('login')}>
              <span>Return to Login ➔</span>
            </button>
          </div>
        );
      default:
        return <LandingPage onStart={() => setView('onboarding')} />;
    }
  };

  const getVideoSrcForView = () => {
    switch (view) {
      case 'landing':
        return '/video_40ac76faa492.mp4';
      case 'onboarding':
        return '/video_0f8c7842593b.mp4';
      case 'gap-detection':
        return '/video_658a681374e8.mp4';
      case 'matches':
        return '/video_ef6f88659975.mp4';
      case 'booking':
        return '/video_c88cffaa41b3.mp4';
      case 'mentor-dashboard':
        return '/video_0f8c7842593b.mp4';
      default:
        return '/video_40ac76faa492.mp4';
    }
  };

  const currentVideoSrc = getVideoSrcForView();

  return (
    <div className="app-container">
      {/* Global Background Video (only for internal pages) */}
      {view !== 'landing' && view !== 'login' && view !== 'admin-dashboard' && (
        <div className="global-bg-video-container">
          <video 
            key={currentVideoSrc}
            src={currentVideoSrc} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="global-bg-video"
          />
          <div className="global-bg-video-overlay"></div>
        </div>
      )}

      {view !== 'login' && view !== 'admin-dashboard' && (
        <Navbar 
          currentView={view} 
          setView={setView} 
          hasGaps={gaps.length > 0}
          userRole={userRole}
        />
      )}
      <main className="animate-fade-in">
        {renderView()}
      </main>
      
      {/* Dynamic light footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} SkillSync AI. Made for the next gen of builders. ⚡</p>
        </div>
      </footer>

      <style>{`
        .app-footer {
          padding: 2rem;
          text-align: center;
          margin-top: auto;
          border-top: 1px solid rgba(226, 232, 240, 0.4);
        }

        .footer-content p {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
