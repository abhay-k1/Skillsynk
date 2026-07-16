import React, { useEffect, useState } from 'react';
import { Sparkles, Calendar, Clock, CheckCircle2, ChevronRight, UserCheck, MessageSquare, AlertCircle, PlayCircle } from 'lucide-react';
import { generateMentorAgenda } from '../services/aiService';

export default function MentorDashboard({ bookings, mentors, customRoadmaps = [], onPublishRoadmap, seminars = [], onPublishSeminar }) {
  // Choose which mentor profile is logged in for the demo
  const [activeMentorId, setActiveMentorId] = useState('mentor_1'); // Default Aria Chen
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [agenda, setAgenda] = useState(null);
  const [agendaStatus, setAgendaStatus] = useState('draft'); // draft | approved | sent

  const activeMentor = mentors.find(m => m.id === activeMentorId);
  const mentorBookings = bookings.filter(b => b.mentorId === activeMentorId);

  // Recalculate agenda when selected booking changes
  useEffect(() => {
    if (selectedBooking) {
      const generated = generateMentorAgenda(
        selectedBooking.studentProfile, 
        selectedBooking.gaps, 
        activeMentor
      );
      setAgenda(generated);
      setAgendaStatus('draft');
    } else {
      setAgenda(null);
    }
  }, [selectedBooking, activeMentorId]);

  // Roadmap Builder states
  const [selectedSkill, setSelectedSkill] = useState('Figma');
  const [p1Title, setP1Title] = useState('');
  const [p1Desc, setP1Desc] = useState('');
  const [p2Title, setP2Title] = useState('');
  const [p2Desc, setP2Desc] = useState('');
  const [p3Title, setP3Title] = useState('');
  const [p3Desc, setP3Desc] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // Seminar Builder states
  const [semTitle, setSemTitle] = useState('');
  const [semDateTime, setSemDateTime] = useState('');
  const [semDesc, setSemDesc] = useState('');
  const [semLink, setSemLink] = useState('');
  const [semSuccess, setSemSuccess] = useState(false);

  const handlePublishSeminarSubmit = (e) => {
    e.preventDefault();
    if (!semTitle.trim() || !semDateTime.trim() || !semLink.trim()) return;

    onPublishSeminar({
      id: `seminar_${Date.now()}`,
      title: semTitle,
      mentorName: activeMentor?.name || "Aria Chen",
      dateTime: semDateTime,
      description: semDesc,
      link: semLink
    });

    setSemTitle('');
    setSemDateTime('');
    setSemDesc('');
    setSemLink('');

    setSemSuccess(true);
    setTimeout(() => {
      setSemSuccess(false);
    }, 4000);
  };

  const handlePublishRoadmap = (e) => {
    e.preventDefault();
    if (!p1Title || !p1Desc || !p2Title || !p2Desc || !p3Title || !p3Desc) {
      alert("Please fill in all phases of the roadmap!");
      return;
    }
    
    const newRoadmap = {
      mentorId: activeMentorId,
      mentorName: activeMentor?.name || "Aria Chen",
      skillName: selectedSkill,
      steps: [
        { title: p1Title, desc: p1Desc },
        { title: p2Title, desc: p2Desc },
        { title: p3Title, desc: p3Desc }
      ]
    };

    onPublishRoadmap(newRoadmap);

    // Reset form fields
    setP1Title('');
    setP1Desc('');
    setP2Title('');
    setP2Desc('');
    setP3Title('');
    setP3Desc('');

    // Trigger success alert
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
    }, 4000);
  };

  // Set default selected booking when active mentor changes
  useEffect(() => {
    if (mentorBookings.length > 0) {
      setSelectedBooking(mentorBookings[0]);
    } else {
      setSelectedBooking(null);
    }
  }, [activeMentorId]);

  const handleApproveAgenda = () => {
    setAgendaStatus('approved');
  };

  const handleSendToStudent = () => {
    setAgendaStatus('sent');
  };

  return (
    <div className="mentor-dashboard-container animate-slide-up">
      <div className="mentor-identity-picker card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexGrow: 1, flexWrap: 'wrap' }}>
          <div className="identity-lbl">
            <UserCheck size={18} />
            <span>Select Mentor Account:</span>
          </div>
          <div className="mentor-picker-select-wrapper" style={{ flexGrow: 1, maxWidth: '400px' }}>
            <select 
              className="builder-select" 
              value={activeMentorId} 
              onChange={(e) => setActiveMentorId(e.target.value)}
              style={{ padding: '0.65rem 1rem', border: '2px solid var(--color-dark)', borderRadius: '12px', fontSize: '0.95rem', fontWeight: 700, width: '100%', background: '#FFFFFF', color: 'var(--color-dark)', cursor: 'pointer' }}
            >
              {mentors.map((m) => {
                const count = bookings.filter(b => b.mentorId === m.id).length;
                return (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.company}) {count > 0 ? `— [${count} Session(s)]` : ''}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => {
            window.location.hash = '#login';
            window.location.reload();
          }}
          style={{ padding: '0.65rem 1.25rem', border: '2px solid var(--color-dark)', fontWeight: 800 }}
        >
          Logout / Switch Account ➔
        </button>
      </div>

      <div className="dashboard-grid">
        {/* Bookings List Panel */}
        <div className="bookings-panel card">
          <div className="panel-header">
            <h3>Upcoming Sessions</h3>
            <p>Active matching sessions for <strong>{activeMentor?.name}</strong></p>
          </div>

          {mentorBookings.length === 0 ? (
            <div className="empty-panel">
              <Calendar size={48} className="empty-icon" />
              <h4>No sessions booked yet</h4>
              <p>When students choose you on the learner journey, bookings will populate here instantly.</p>
            </div>
          ) : (
            <div className="bookings-list">
              {mentorBookings.map((b) => (
                <div 
                  key={b.id}
                  className={`booking-card-item ${selectedBooking?.id === b.id ? 'active' : ''}`}
                  onClick={() => setSelectedBooking(b)}
                >
                  <div className="booking-card-info">
                    <h4>{b.studentName}</h4>
                    <p className="student-target">{b.studentProfile.targetRole}</p>
                    <div className="booking-time-lbl">
                      <Clock size={12} />
                      <span>{b.slot}</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="arrow-right-icon" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Booking Deep Dive & AI Agenda */}
        {selectedBooking ? (
          <div className="deep-dive-panel card">
            <div className="deep-dive-header">
              <div className="student-header-info">
                <h2>{selectedBooking.studentName}</h2>
                <p>Target Goal: <strong>"{selectedBooking.studentProfile.goals}"</strong></p>
              </div>
              <div className="student-experience-badge">
                <span className="badge badge-primary">{selectedBooking.studentProfile.experience} level</span>
              </div>
            </div>

            {/* Gap List */}
            <div className="details-section">
              <h4 className="section-title">Detected Skill Gaps</h4>
              <div className="student-gaps-list">
                {selectedBooking.gaps.map((g, idx) => (
                  <div key={idx} className={`details-gap-tag status-${g.status}`}>
                    <span className="gap-tag-dot"></span>
                    <span className="gap-tag-name">{g.name}</span>
                    <span className="gap-tag-status">{g.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Suggested Agenda */}
            {agenda && (
              <div className="ai-agenda-section">
                <div className="agenda-sec-header">
                  <div className="agenda-badge">
                    <Sparkles size={14} className="sparkle-icon" />
                    <span>AI SUGGESTED AGENDA</span>
                  </div>
                  <span className="agenda-duration">Duration: {agenda.duration}</span>
                </div>
                
                <h3 className="agenda-title">{agenda.title}</h3>
                <p className="agenda-intro">Focusing on your core gap overlap: <strong>{agenda.focusGap}</strong></p>

                <div className="agenda-timeline">
                  {agenda.agendaItems.map((item, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-time">{item.time}</div>
                      <div className="timeline-content">
                        <h5>{item.task}</h5>
                        <p>{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Agenda controls */}
                <div className="agenda-status-actions">
                  {agendaStatus === 'draft' && (
                    <div className="draft-actions">
                      <button className="btn btn-outline" onClick={handleApproveAgenda}>
                        <span>Approve Agenda</span>
                      </button>
                      <button className="btn btn-primary" onClick={handleSendToStudent}>
                        <span>Send Checklist to Student</span>
                      </button>
                    </div>
                  )}

                  {agendaStatus === 'approved' && (
                    <div className="status-confirmed-state text-success-gradient">
                      <CheckCircle2 size={18} />
                      <span>Agenda approved! Link is added to calendar invite.</span>
                    </div>
                  )}

                  {agendaStatus === 'sent' && (
                    <div className="status-confirmed-state text-primary-gradient">
                      <MessageSquare size={18} />
                      <span>Sent! Checkpoints dispatched to learner slack thread.</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="deep-dive-panel card empty-deep-dive">
            <AlertCircle size={48} className="empty-icon" />
            <h4>Select a student session to view agenda</h4>
            <p>Choose an upcoming meeting from the sidebar to view their skill gap breakdown and generate the meeting roadmap.</p>
          </div>
        )}
      </div>

      {/* Dynamic Custom Roadmap Builder Section */}
      <section className="custom-roadmap-builder card">
        <div className="builder-header">
          <h3>🛠️ Curate Custom Skills Roadmap</h3>
          <p>Publish a step-by-step master guide for your domains. Learners matched with you can immediately view and download it as a PDF.</p>
        </div>

        <div className="builder-grid">
          <form onSubmit={handlePublishRoadmap} className="roadmap-form">
            {showSuccessAlert && (
              <div className="success-toast">
                <CheckCircle2 size={16} />
                <span>Roadmap for {selectedSkill} published successfully! Learners can now access it.</span>
              </div>
            )}

            <div className="form-row">
              <div className="form-col-50">
                <label className="builder-label">Select Target Skill</label>
                <select 
                  className="builder-select"
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                >
                  <option value="Figma">Figma (UI/UX)</option>
                  <option value="UI/UX Design">UI/UX Design Principles</option>
                  <option value="Design Systems">Design Systems Architecture</option>
                  <option value="User Research">User Research & Audits</option>
                  <option value="Prototyping">Interactive Prototyping</option>
                  <option value="Product Strategy">Product Strategy & MVP</option>
                  <option value="React">React (JS Framework)</option>
                  <option value="Next.js">Next.js & SSR</option>
                  <option value="TypeScript">TypeScript Basics & Generics</option>
                  <option value="CSS/Tailwind">CSS Grid & Transitions</option>
                  <option value="JavaScript">JavaScript ES6 & Async</option>
                  <option value="System Design">System Design Scale</option>
                  <option value="Python">Python Data Science</option>
                </select>
              </div>
              <div className="form-col-50" style={{ justifyContent: 'flex-end', display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                  Curated by <strong>{activeMentor?.name}</strong>
                </span>
              </div>
            </div>

            <div className="phase-fieldset">
              <legend>Phase 1: Basic Foundations</legend>
              <div className="form-col-100">
                <label className="builder-label">Milestone Title</label>
                <input 
                  type="text" 
                  className="builder-input" 
                  placeholder="e.g. Spacing rules & layout grids"
                  value={p1Title}
                  onChange={(e) => setP1Title(e.target.value)}
                  required
                />
              </div>
              <div className="form-col-100">
                <label className="builder-label">Milestone Details</label>
                <textarea 
                  className="builder-textarea" 
                  placeholder="Describe the learning materials, tasks, and requirements for this phase."
                  value={p1Desc}
                  onChange={(e) => setP1Desc(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="phase-fieldset">
              <legend>Phase 2: Applied Projects</legend>
              <div className="form-col-100">
                <label className="builder-label">Milestone Title</label>
                <input 
                  type="text" 
                  className="builder-input" 
                  placeholder="e.g. Design token mapping & Dark mode variables"
                  value={p2Title}
                  onChange={(e) => setP2Title(e.target.value)}
                  required
                />
              </div>
              <div className="form-col-100">
                <label className="builder-label">Milestone Details</label>
                <textarea 
                  className="builder-textarea" 
                  placeholder="Describe the practical challenge or project deliverables."
                  value={p2Desc}
                  onChange={(e) => setP2Desc(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="phase-fieldset">
              <legend>Phase 3: Portfolio Case Study</legend>
              <div className="form-col-100">
                <label className="builder-label">Milestone Title</label>
                <input 
                  type="text" 
                  className="builder-input" 
                  placeholder="e.g. Spring transition components & prototyping flows"
                  value={p3Title}
                  onChange={(e) => setP3Title(e.target.value)}
                  required
                />
              </div>
              <div className="form-col-100">
                <label className="builder-label">Milestone Details</label>
                <textarea 
                  className="builder-textarea" 
                  placeholder="Describe the final hand-off criteria or portfolio asset showcase."
                  value={p3Desc}
                  onChange={(e) => setP3Desc(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary roadmap-submit-btn">
              <span>Publish Custom Roadmap ⚡</span>
            </button>
          </form>

          {/* Published Roadmaps Library */}
          <div className="library-panel">
            <h4 className="library-title">Your Published Roadmaps</h4>
            <div className="library-list">
              {customRoadmaps.filter(r => r.mentorId === activeMentorId).length === 0 ? (
                <div style={{ padding: '2rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                  No roadmaps published for {activeMentor?.name} yet. Use the form to submit one!
                </div>
              ) : (
                customRoadmaps
                  .filter(r => r.mentorId === activeMentorId)
                  .map((r, idx) => (
                    <div key={idx} className="library-card">
                      <div className="library-card-header">
                        <h5>{r.skillName}</h5>
                        <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Active</span>
                      </div>
                      <div className="library-card-steps">
                        {r.steps.map((s, sIdx) => (
                          <div key={sIdx} style={{ marginBottom: '0.25rem' }}>
                            <span className="library-step-bullet">P{sIdx + 1}:</span> {s.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Public Seminar Scheduler Section */}
      <section className="custom-roadmap-builder card" style={{ marginTop: '2.5rem' }}>
        <div className="builder-header">
          <h3>🎪 Host a Public Mentorship Seminar</h3>
          <p>Schedule a public talk, group workshop, or masterclass. These seminars are accessible to all platform students globally, and are not restricted to domain-centric or personal matches.</p>
        </div>

        <div className="builder-grid">
          <form onSubmit={handlePublishSeminarSubmit} className="roadmap-form">
            {semSuccess && (
              <div className="success-toast">
                <CheckCircle2 size={16} />
                <span>Seminar published successfully! It is now live in the Learner Knowledge Hub.</span>
              </div>
            )}

            <div className="form-row">
              <div className="form-col-100">
                <label className="builder-label">Seminar Title</label>
                <input 
                  type="text" 
                  className="builder-input" 
                  placeholder="e.g. Scaling web architectures to 10k users"
                  value={semTitle}
                  onChange={(e) => setSemTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-col-50">
                <label className="builder-label">Date & Time</label>
                <input 
                  type="text" 
                  className="builder-input" 
                  placeholder="e.g. July 24 at 5:00 PM EST"
                  value={semDateTime}
                  onChange={(e) => setSemDateTime(e.target.value)}
                  required
                />
              </div>
              <div className="form-col-50">
                <label className="builder-label">Video Conference Link</label>
                <input 
                  type="url" 
                  className="builder-input" 
                  placeholder="e.g. https://zoom.us/j/123456"
                  value={semLink}
                  onChange={(e) => setSemLink(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-col-100">
                <label className="builder-label">Short Description</label>
                <textarea 
                  className="builder-textarea" 
                  placeholder="Briefly describe what students will learn and who this session is designed for."
                  value={semDesc}
                  onChange={(e) => setSemDesc(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary roadmap-submit-btn">
              <span>Publish Seminar ⚡</span>
            </button>
          </form>

          {/* List of active seminars */}
          <div className="library-panel">
            <h4 className="library-title">Scheduled Seminars</h4>
            <div className="library-list">
              {seminars.filter(s => s.mentorName === activeMentor?.name).length === 0 ? (
                <div style={{ padding: '2rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                  No seminars scheduled yet. Use the form to host a session!
                </div>
              ) : (
                seminars
                  .filter(s => s.mentorName === activeMentor?.name)
                  .map((s, idx) => (
                    <div key={idx} className="library-card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
                      <div className="library-card-header">
                        <h5>{s.title}</h5>
                        <span className="badge badge-success" style={{ fontSize: '0.65rem', backgroundColor: 'var(--color-primary)', color: '#fff' }}>Live Link</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '0.4rem 0' }}>
                        {s.dateTime}
                      </p>
                      <a href={s.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textDecoration: 'underline' }}>
                        Join URL ➔
                      </a>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .mentor-dashboard-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Identity selector pill box */
        .mentor-identity-picker {
          padding: 1.25rem 2rem;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          justify-content: flex-start;
          flex-wrap: wrap;
        }

        .identity-lbl {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 750;
          font-size: 0.95rem;
          color: var(--color-text-main);
        }

        .mentor-pills {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .mentor-login-pill {
          background-color: var(--bg-secondary);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: var(--border-radius-lg);
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: var(--transition-spring);
        }

        .mentor-login-pill:hover, .mentor-login-pill.active {
          background-color: #FFFFFF;
          border-color: var(--color-primary);
          box-shadow: var(--shadow-sm);
        }

        .mentor-login-pill.active {
          box-shadow: 0 0 0 2px var(--color-primary-light);
        }

        .pill-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .pill-badge {
          background-color: var(--color-primary);
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 0.1rem 0.4rem;
          border-radius: 9999px;
        }

        /* Dashboard layout */
        .dashboard-grid {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 2rem;
          min-height: 500px;
        }

        @media (max-width: 850px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Bookings sidebar */
        .bookings-panel {
          padding: 2rem;
          text-align: left;
        }

        .panel-header {
          margin-bottom: 1.5rem;
          border-bottom: 1px solid rgba(226, 232, 240, 0.4);
          padding-bottom: 1rem;
        }

        .panel-header h3 {
          font-size: 1.35rem;
          font-weight: 800;
        }

        .panel-header p {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        .bookings-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .booking-card-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          background-color: var(--bg-secondary);
          border-radius: var(--border-radius-lg);
          cursor: pointer;
          transition: var(--transition-spring);
          border: 1px solid transparent;
        }

        .booking-card-item:hover, .booking-card-item.active {
          background-color: #FFFFFF;
          border-color: var(--color-primary);
        }

        .booking-card-item.active {
          box-shadow: var(--shadow-sm);
        }

        .booking-card-info {
          text-align: left;
        }

        .booking-card-info h4 {
          font-size: 1.05rem;
          font-weight: 750;
        }

        .student-target {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        .booking-time-lbl {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          color: var(--color-primary);
          font-weight: 700;
          margin-top: 0.4rem;
        }

        .arrow-right-icon {
          color: var(--color-text-muted);
          transition: var(--transition-smooth);
        }

        .booking-card-item:hover .arrow-right-icon {
          color: var(--color-primary);
          transform: translateX(2px);
        }

        .empty-panel, .empty-deep-dive {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem;
          color: var(--color-text-muted);
          text-align: center;
          flex: 1;
        }

        .empty-icon {
          margin-bottom: 1rem;
          opacity: 0.3;
        }

        /* Deep dive panel */
        .deep-dive-panel {
          padding: 2.5rem;
          text-align: left;
        }

        .deep-dive-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid rgba(226, 232, 240, 0.4);
          padding-bottom: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .student-header-info h2 {
          font-size: 1.8rem;
          font-weight: 850;
        }

        .student-header-info p {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-top: 0.25rem;
        }

        /* Gaps details section */
        .details-section {
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .student-gaps-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .details-gap-tag {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          border: 1px solid rgba(226, 232, 240, 0.8);
          background-color: var(--bg-secondary);
        }

        .gap-tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .details-gap-tag.status-mastered {
          border-color: rgba(16, 185, 129, 0.2);
          background-color: var(--color-success-light);
          color: var(--color-success);
        }
        .details-gap-tag.status-mastered .gap-tag-dot {
          background-color: var(--color-success);
        }

        .details-gap-tag.status-needs\\ work {
          border-color: rgba(245, 158, 11, 0.2);
          background-color: var(--color-warning-light);
          color: var(--color-warning);
        }
        .details-gap-tag.status-needs\\ work .gap-tag-dot {
          background-color: var(--color-warning);
        }

        .details-gap-tag.status-missing {
          border-color: rgba(255, 107, 107, 0.2);
          background-color: var(--color-accent-light);
          color: var(--color-accent);
        }
        .details-gap-tag.status-missing .gap-tag-dot {
          background-color: var(--color-accent);
        }

        .gap-tag-status {
          text-transform: uppercase;
          font-size: 0.6rem;
          opacity: 0.7;
          letter-spacing: 0.05em;
        }

        /* AI Agenda Section */
        .ai-agenda-section {
          background: linear-gradient(to bottom, #FFFFFF, var(--bg-secondary));
          border: 1px solid rgba(99, 102, 241, 0.15);
          border-radius: var(--border-radius-lg);
          padding: 1.75rem;
          box-shadow: var(--shadow-sm);
        }

        .agenda-sec-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .agenda-badge {
          background-color: var(--color-primary-light);
          color: var(--color-primary);
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          letter-spacing: 0.05em;
        }

        .agenda-duration {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-text-muted);
        }

        .agenda-title {
          font-size: 1.35rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .agenda-intro {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-bottom: 1.5rem;
        }

        /* Timeline styling */
        .agenda-timeline {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 2rem;
        }

        .agenda-timeline::before {
          content: '';
          position: absolute;
          left: 4px;
          top: 8px;
          bottom: 8px;
          width: 2px;
          background-color: var(--border-color);
        }

        .timeline-item {
          position: relative;
          text-align: left;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: -22px;
          top: 6px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--color-primary);
          border: 2px solid #FFFFFF;
        }

        .timeline-time {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 0.75rem;
          color: var(--color-primary);
          margin-bottom: 0.15rem;
        }

        .timeline-content h5 {
          font-size: 0.95rem;
          font-weight: 750;
          color: var(--color-text-main);
        }

        .timeline-content p {
          font-size: 0.825rem;
          color: var(--color-text-muted);
          line-height: 1.45;
          margin-top: 0.15rem;
        }

        /* Action Buttons */
        .agenda-status-actions {
          border-top: 1px solid rgba(226, 232, 240, 0.6);
          padding-top: 1.25rem;
          margin-top: 1rem;
        }

        .draft-actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
        }

        .status-confirmed-state {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 750;
          font-size: 0.9rem;
          padding: 0.75rem;
          border-radius: var(--border-radius-md);
        }

        .text-success-gradient {
          background-color: var(--color-success-light);
          color: var(--color-success);
        }

        .text-primary-gradient {
          background-color: var(--color-primary-light);
          color: var(--color-primary);
        }

        @media (max-width: 480px) {
          .draft-actions {
            flex-direction: column-reverse;
          }
          .draft-actions .btn {
            width: 100%;
          }
        }

        /* Custom Roadmap Builder styling */
        .custom-roadmap-builder {
          margin-top: 3rem;
          padding: 2.5rem;
          text-align: left;
        }

        .builder-header {
          margin-bottom: 2rem;
          border-bottom: 2px dashed rgba(26, 26, 26, 0.1);
          padding-bottom: 1.25rem;
        }

        .builder-header h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .builder-header p {
          color: var(--color-text-muted);
          font-size: 0.95rem;
        }

        .builder-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 2.5rem;
        }

        @media (max-width: 900px) {
          .builder-grid {
            grid-template-columns: 1fr;
          }
        }

        .roadmap-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .form-col-50 {
          flex: 1;
          min-width: 250px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-col-100 {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }

        .builder-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.85rem;
          font-weight: 750;
          color: var(--color-dark);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .builder-select, .builder-input, .builder-textarea {
          background-color: #FFFFFF;
          border: 2px solid var(--color-dark);
          border-radius: var(--border-radius-md);
          padding: 0.75rem 1rem;
          font-family: inherit;
          font-size: 0.95rem;
          color: var(--color-dark);
          outline: none;
          box-shadow: 2px 2px 0 var(--color-dark);
          transition: var(--transition-bounce);
        }

        .builder-select:focus, .builder-input:focus, .builder-textarea:focus {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 var(--color-dark);
        }

        .builder-textarea {
          min-height: 80px;
          resize: vertical;
        }

        .phase-fieldset {
          border: 2px solid var(--color-dark);
          border-radius: var(--border-radius-lg);
          padding: 1.5rem;
          background-color: var(--bg-secondary);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 3px 3px 0 var(--color-dark);
        }

        .phase-fieldset legend {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
          padding: 0.25rem 0.75rem;
          background-color: var(--color-lime);
          border: 2px solid var(--color-dark);
          border-radius: var(--border-radius-md);
          text-transform: uppercase;
        }

        .roadmap-submit-btn {
          width: fit-content;
          align-self: flex-start;
        }

        .library-panel {
          border: 2px dashed var(--color-dark);
          border-radius: var(--border-radius-lg);
          padding: 1.5rem;
          background-color: rgba(255, 255, 255, 0.4);
          max-height: 520px;
          overflow-y: auto;
        }

        .library-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          margin-bottom: 1.25rem;
          border-bottom: 2px solid var(--color-dark);
          padding-bottom: 0.5rem;
        }

        .library-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .library-card {
          background-color: #FFFFFF;
          border: 2px solid var(--color-dark);
          border-radius: var(--border-radius-md);
          padding: 1rem;
          box-shadow: 2px 2px 0 var(--color-dark);
          text-align: left;
        }

        .library-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .library-card-header h5 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          color: var(--color-primary);
        }

        .library-card-steps {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: var(--color-text-muted);
          border-top: 1px dashed rgba(26, 26, 26, 0.1);
          padding-top: 0.5rem;
          margin-top: 0.5rem;
        }

        .library-step-bullet {
          font-weight: 700;
          color: var(--color-dark);
        }

        .success-toast {
          background-color: var(--color-lime-light);
          border: 2px solid var(--color-lime);
          border-radius: var(--border-radius-md);
          padding: 0.75rem 1rem;
          color: var(--color-dark);
          font-size: 0.9rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

    </div>
  );
}
