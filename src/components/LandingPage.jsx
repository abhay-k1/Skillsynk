import React, { useState } from 'react';
import { ArrowRight, Sparkles, Zap, Shield, HelpCircle, Calendar, ExternalLink, RefreshCw, X, Video, Users } from 'lucide-react';

export default function LandingPage({ onStart, onSwitchToMentor, userRole, seminars = [] }) {
  // Modal states
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [showSeminarsModal, setShowSeminarsModal] = useState(false);

  // AI Roadmap state variables
  const [domain, setDomain] = useState('');
  const [timeline, setTimeline] = useState('4 Weeks');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmapResult, setRoadmapResult] = useState(null);

  // Custom roadmap generator
  const handleGenerateRoadmap = (e) => {
    e.preventDefault();
    if (!domain.trim()) return;

    setIsGenerating(true);
    setRoadmapResult(null);

    setTimeout(() => {
      const query = domain.toLowerCase();
      let steps = [];

      if (query.includes('react') || query.includes('frontend') || query.includes('web') || query.includes('js') || query.includes('javascript')) {
        steps = [
          { 
            title: "ES6 JavaScript & Asynchronous Flow", 
            desc: "Learn callbacks, Promises, async/await, fetching JSON APIs, and scope closures.",
            source: "GeeksforGeeks JS Tutorial",
            link: "https://www.geeksforgeeks.org/javascript/"
          },
          { 
            title: "React Component States & Hook Pipelines", 
            desc: "Master useState, useEffect dependency hooks, custom hook extraction, and component rendering logic.",
            source: "Official React Documentation",
            link: "https://react.dev"
          },
          { 
            title: "Global State Managers & Caching API", 
            desc: "Sync states globally across pages using Zustand or Redux Toolkit, and cache data with RTK Query.",
            source: "Zustand State Guide (GitHub)",
            link: "https://github.com/pmndrs/zustand"
          },
          { 
            title: "CSS Systems & Tailwind Fluid Grids", 
            desc: "Configure theme tokens, implement absolute/relative layouts, responsive grids, and clean margins.",
            source: "TailwindCSS Setup Docs",
            link: "https://tailwindcss.com"
          }
        ];
      } else if (query.includes('data science') || query.includes('python') || query.includes('ml') || query.includes('machine learning') || query.includes('ai')) {
        steps = [
          { 
            title: "Python Syntax Core & Pandas Framework", 
            desc: "Master lists, tuples, dict comprehensions, Panda Series objects, data cleaning, and filtering matrices.",
            source: "GeeksforGeeks Pandas Tutorial",
            link: "https://www.geeksforgeeks.org/pandas-tutorial/"
          },
          { 
            title: "Exploratory Visualizations & Statistical EDA", 
            desc: "Generate seaborn heatmap correlation matrices, outlier boxplots, and statistical distribution checks.",
            source: "Seaborn Visual Guide",
            link: "https://seaborn.pydata.org"
          },
          { 
            title: "Scikit-Learn Predictive Algorithm Pipelines", 
            desc: "Train Logistic Regression models, Decision Tree classifiers, and configure GridSearchCV cross-validation.",
            source: "Scikit-Learn Documentation",
            link: "https://scikit-learn.org"
          },
          { 
            title: "Deep Learning Tensor Models", 
            desc: "Configure neural network structures, activation matrices (ReLU, Sigmoid), and inspect accuracy checkpoints.",
            source: "TensorFlow Quickstart Guides",
            link: "https://www.tensorflow.org/tutorials"
          }
        ];
      } else {
        steps = [
          { 
            title: `Core Specifications of ${domain}`, 
            desc: `Master basic setups, syntax paradigms, and command-line execution parameters for ${domain}.`,
            source: "MDN Web Docs Index",
            link: "https://developer.mozilla.org"
          },
          { 
            title: "Intermediate Module Configurations", 
            desc: "Build secondary component functions, link files, and run local integration audits.",
            source: "GeeksforGeeks Reference Directory",
            link: "https://www.geeksforgeeks.org"
          },
          { 
            title: "Advanced Clean Code & Optimization", 
            desc: "Optimize processing threads, refactor scripts into reusable folders, and write testing matrices.",
            source: "freeCodeCamp Developer News",
            link: "https://www.freecodecamp.org/news/"
          },
          { 
            title: "Production Deployment & Monitoring", 
            desc: "Bundle static assets, deploy files to public domains, and track server error codes.",
            source: "GitHub Git Collection",
            link: "https://github.com"
          }
        ];
      }

      let adjusted = [];
      if (timeline === '2 Weeks') {
        adjusted = [
          { title: `Crash Course Part 1: ${steps[0].title}`, desc: `${steps[0].desc} Also covers: ${steps[1].desc}`, source: steps[0].source, link: steps[0].link },
          { title: `Crash Course Part 2: ${steps[2].title}`, desc: `${steps[2].desc} Also covers: ${steps[3].desc}`, source: steps[2].source, link: steps[2].link }
        ];
      } else if (timeline === '8 Weeks') {
        adjusted = steps.flatMap((s, idx) => [
          { title: `Deep Dive: ${s.title}`, desc: s.desc, source: s.source, link: s.link },
          { title: `Applied Project: Build ${s.title.split(' ')[0]} Integration`, desc: `Design, configure, and publish a functional tool implementing ${s.title.toLowerCase()}.`, source: "GitHub Starter Guides", link: "https://github.com" }
        ]);
      } else {
        adjusted = steps;
      }

      setRoadmapResult({
        domain: domain,
        timeline: timeline,
        steps: adjusted
      });
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="landing-container animate-slide-up">
      {/* High-Opacity Background Video */}
      <div className="hero-video-bg-container">
        <video 
          src="/landingpg.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-bg-video"
        />
        <div className="hero-video-bg-overlay"></div>
      </div>

      {/* Maximalist Marquee Banner */}
      <div className="ticker-banner">
        <div className="ticker-track">
          <span>NO CAP MATCHING ⚡ EXPLAINABLE INSIGHTS ⚡ CHUNKY BORDERS ⚡ ZERO CORPORATE CRINGE ⚡ LEVEL UP SPEEDRUN ⚡ </span>
          <span>NO CAP MATCHING ⚡ EXPLAINABLE INSIGHTS ⚡ CHUNKY BORDERS ⚡ ZERO CORPORATE CRINGE ⚡ LEVEL UP SPEEDRUN ⚡ </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="sticker sticker-top-left font-funky">GOAT Matches Only</div>
        <div className="sticker sticker-top-right font-funky" style={{ backgroundColor: 'var(--color-lime)' }}>100% Explainable</div>

        <div className="hero-badge-tag">
          <Sparkles size={14} className="sparkle-icon" />
          <span>Stop swiping resumes. Let AI cook.</span>
        </div>
        
        <h1 className="hero-title">
          Stop searching for mentors.<br />
          <span className="accent-text-stroke">Let AI find the right one.</span>
        </h1>
        
        <p className="hero-subtitle">
          Upload your resume, parse your exact skill blockers for your target role, and get matched with tech mentors who speedran the same path. No generic filter checklists.
        </p>

        {/* Action Button Row */}
        <div className="hero-ctas">
          <button className="btn btn-primary btn-lg pulse-cta glass-maximal-btn-primary" onClick={onStart}>
            <span>Let's find your mentor ⚡</span>
            <ArrowRight size={18} />
          </button>
          
          <button className="btn btn-secondary btn-lg glass-maximal-btn-secondary" onClick={() => setShowRoadmapModal(true)}>
            <Sparkles size={18} style={{ color: 'var(--color-lime)' }} />
            <span>Build AI Roadmap 🔮</span>
          </button>

          <button className="btn btn-secondary btn-lg glass-maximal-btn-secondary" onClick={() => setShowSeminarsModal(true)}>
            <Users size={18} style={{ color: 'var(--color-primary)' }} />
            <span>Public Seminars 🎪</span>
          </button>
          
          {userRole === 'admin' && (
            <button className="btn btn-secondary btn-lg glass-maximal-btn-secondary admin-btn" onClick={onSwitchToMentor}>
              <span>Mentor Portal ➔</span>
            </button>
          )}
        </div>
      </section>

      {/* Grid of Core Pillars */}
      <section className="features-grid">
        <div className="feature-card glass-maximal-card card">
          <div className="card-sticker">Blocker Check</div>
          <div className="feature-icon-wrapper" style={{ backgroundColor: 'rgba(132, 204, 22, 0.15)', borderColor: 'rgba(255,255,255,0.2)' }}>
            <Zap size={24} style={{ color: 'var(--color-lime)' }} />
          </div>
          <h3>Skill Gap Detection</h3>
          <p>
            Paste your resume, and our AI scans it against role expectations to flag exactly what stands between you and your dream role.
          </p>
        </div>

        <div className="feature-card glass-maximal-card card">
          <div className="card-sticker">No Fluff</div>
          <div className="feature-icon-wrapper" style={{ backgroundColor: 'rgba(88, 80, 236, 0.15)', borderColor: 'rgba(255,255,255,0.2)' }}>
            <Sparkles size={24} style={{ color: '#8F8BFF' }} />
          </div>
          <h3>Explainable Matches</h3>
          <p>
            We don't do filter lists. We show you a one-line breakdown of *why* each mentor matches your specific learning style.
          </p>
        </div>

        <div className="feature-card glass-maximal-card card">
          <div className="card-sticker">Locked In</div>
          <div className="feature-icon-wrapper" style={{ backgroundColor: 'rgba(255, 90, 90, 0.15)', borderColor: 'rgba(255,255,255,0.2)' }}>
            <Shield size={24} style={{ color: 'var(--color-accent)' }} />
          </div>
          <h3>Priority Roadmap</h3>
          <p>
            Every gap mapped to the mentor who covers it best, ordered by which skills are blocking your progress the most.
          </p>
        </div>
      </section>

      {/* MODAL 1: AI Roadmap Generator Modal */}
      {showRoadmapModal && (
        <div className="modal-backdrop">
          <div className="glass-modal-panel animate-slide-up">
            <button className="modal-close-btn" onClick={() => setShowRoadmapModal(false)}>
              <X size={20} />
            </button>

            <div className="section-badge-tag" style={{ backgroundColor: 'rgba(132, 204, 22, 0.15)', color: '#BEF264' }}>
              <Sparkles size={14} />
              <span>INSTANT STUDY SYLLABUS TOOL</span>
            </div>
            
            <h3 className="modal-title">🔮 Instant AI Roadmap Generator</h3>
            <p className="modal-subtitle">
              Type in any framework or domain and pick a commitment timeline. We will fetch GeeksforGeeks, MDN, and other reference links.
            </p>

            <form onSubmit={handleGenerateRoadmap} className="roadmap-generator-form">
              <div className="form-input-row">
                <div className="input-group">
                  <label className="generator-lbl">Target Domain</label>
                  <input 
                    type="text" 
                    required
                    className="generator-input"
                    placeholder="e.g. Next.js Routing, Web Scrapers, iOS Swift"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                  />
                </div>
                
                <div className="input-group">
                  <label className="generator-lbl">Timeline Duration</label>
                  <div className="duration-pill-group">
                    {['2 Weeks', '4 Weeks', '8 Weeks'].map((t) => (
                      <button 
                        key={t}
                        type="button" 
                        className={`duration-pill-btn ${timeline === t ? 'active' : ''}`}
                        onClick={() => setTimeline(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary generator-submit-btn" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <RefreshCw size={18} className="spin-icon" />
                    <span>AI is compiling...</span>
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    <span>Build AI Roadmap ⚡</span>
                  </>
                )}
              </button>
            </form>

            {isGenerating && (
              <div className="loading-card animate-pulse">
                <RefreshCw size={24} className="spin-icon loading-spin" />
                <p>Generating roadmap steps & loading reference links...</p>
              </div>
            )}

            {roadmapResult && (
              <div className="roadmap-result-panel" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                <div className="result-header">
                  <h4>🎯 Generated Plan: {roadmapResult.domain}</h4>
                  <span className="timeline-tag">{roadmapResult.timeline} Track</span>
                </div>

                <div className="result-steps-timeline">
                  {roadmapResult.steps.map((step, idx) => (
                    <div key={idx} className="result-step-card">
                      <div className="step-num-left">
                        <span className="step-week-lbl">STEP {idx + 1}</span>
                        <div className="step-circle-badge">{idx + 1}</div>
                      </div>
                      
                      <div className="step-info-right">
                        <h5>{step.title}</h5>
                        <p>{step.desc}</p>
                        
                        <div className="resource-link-row">
                          <span className="study-lbl">Resource:</span>
                          <a 
                            href={step.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="resource-anchor"
                          >
                            <span>{step.source}</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: Public Seminars Hub Modal */}
      {showSeminarsModal && (
        <div className="modal-backdrop">
          <div className="glass-modal-panel animate-slide-up">
            <button className="modal-close-btn" onClick={() => setShowSeminarsModal(false)}>
              <X size={20} />
            </button>

            <div className="section-badge-tag" style={{ backgroundColor: 'rgba(88, 80, 236, 0.15)', color: '#A5B4FC' }}>
              <Video size={14} />
              <span>COMMUNITY KNOWLEDGE HUB</span>
            </div>
            
            <h3 className="modal-title">🎪 Public Mentorship Seminars</h3>
            <p className="modal-subtitle">
              Public talks, masterclasses, and group sessions hosted by mentors. Open to all students on the platform, regardless of domain or matched profile.
            </p>

            <div className="seminars-list-container" style={{ maxHeight: '420px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
              {seminars.length === 0 ? (
                <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                  No public seminars scheduled yet. Keep an eye out!
                </div>
              ) : (
                seminars.map((sem, idx) => (
                  <div key={sem.id || idx} className="seminar-item-card">
                    <div className="seminar-main-details">
                      <div className="seminar-badge-row">
                        <span className="seminar-mentor-badge">Host: {sem.mentorName}</span>
                        <span className="seminar-time-badge">{sem.dateTime}</span>
                      </div>
                      <h5>{sem.title}</h5>
                      <p>{sem.description}</p>
                    </div>
                    <a 
                      href={sem.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary seminar-join-btn"
                    >
                      <Video size={16} />
                      <span>Join Seminar</span>
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Dark theme container */
        .landing-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
          padding: 0 2rem 4rem 2rem;
          background: #0B0C10 !important; 
          margin-top: -2rem; 
          min-height: 100vh;
          color: #FFFFFF;
        }

        .hero-video-bg-container {
          position: absolute;
          top: -6rem; 
          left: 0;
          width: 100vw;
          height: calc(100% + 6rem); 
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .hero-bg-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.85; 
          filter: contrast(102%) brightness(90%);
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .hero-video-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom, 
            rgba(11, 12, 16, 0.15) 0%, 
            rgba(11, 12, 16, 0.45) 50%,
            #0B0C10 95%
          );
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .landing-container:hover .hero-bg-video {
          opacity: 0.95;
          filter: contrast(108%) brightness(95%);
          transform: scale(1.01);
        }

        .landing-container:hover .hero-video-bg-overlay {
          background: linear-gradient(
            to bottom, 
            rgba(11, 12, 16, 0.08) 0%, 
            rgba(11, 12, 16, 0.35) 50%,
            #0B0C10 95%
          );
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
        }

        /* Marquee banner */
        .ticker-banner {
          width: 100vw;
          background-color: var(--color-dark);
          color: #FFFFFF;
          padding: 0.85rem 0;
          overflow: hidden;
          white-space: nowrap;
          border-bottom: 3px solid var(--color-dark);
          margin-bottom: 4rem;
          display: flex;
          z-index: 10;
        }

        .ticker-track {
          display: inline-block;
          animation: ticker-slide 20s linear infinite;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
        }

        @keyframes ticker-slide {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        /* Hero */
        .hero-section {
          text-align: center;
          max-width: 900px;
          margin: 1.5rem auto 7rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          padding: 1.5rem;
          z-index: 10;
        }

        .hero-badge-tag {
          background-color: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          padding: 0.5rem 1.25rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 9999px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.875rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
          box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
        }

        .hero-title {
          font-size: 3.75rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 1.5rem;
          line-height: 1.15;
          color: #FFFFFF;
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }

        .accent-text-stroke {
          color: #FFFFFF;
          position: relative;
          display: inline-block;
        }

        .accent-text-stroke::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 2px;
          width: 100%;
          height: 8px;
          background-color: var(--color-lime);
          z-index: -1;
          transform: rotate(-1deg);
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          margin-bottom: 2.5rem;
          max-width: 680px;
          line-height: 1.65;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
        }

        .hero-ctas {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .glass-maximal-btn-primary {
          background-color: var(--color-primary) !important;
          border: 2px solid #FFFFFF !important;
          box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5) !important;
        }

        .glass-maximal-btn-primary:hover {
          transform: translate(-2px, -2px) !important;
          box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.5) !important;
        }

        .glass-maximal-btn-secondary {
          background-color: rgba(255, 255, 255, 0.08) !important;
          color: #FFFFFF !important;
          border: 2px solid rgba(255, 255, 255, 0.3) !important;
          box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.5) !important;
          backdrop-filter: blur(8px);
        }

        .glass-maximal-btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.15) !important;
          transform: translate(-2px, -2px) !important;
          box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.5) !important;
        }

        .btn-lg {
          padding: 1rem 2.25rem;
          font-size: 1.15rem;
        }

        /* Features */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.25rem;
          width: 100%;
          max-width: 1100px;
          margin-bottom: 5rem;
          z-index: 10;
        }

        .glass-maximal-card {
          background: rgba(255, 255, 255, 0.07) !important;
          border: 2px solid rgba(255, 255, 255, 0.18) !important;
          box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.5) !important;
          color: #FFFFFF !important;
          backdrop-filter: blur(16px) saturate(140%) !important;
          -webkit-backdrop-filter: blur(16px) saturate(140%) !important;
        }

        .glass-maximal-card:hover {
          transform: translate(-4px, -4px) !important;
          box-shadow: 10px 10px 0px rgba(0, 0, 0, 0.5) !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
          background: rgba(255, 255, 255, 0.12) !important;
        }

        .glass-maximal-card p {
          color: rgba(255, 255, 255, 0.75) !important;
        }

        .card-sticker {
          position: absolute;
          top: 15px;
          right: 15px;
          background-color: #FFFFFF;
          border: 2px solid var(--color-dark);
          color: var(--color-dark);
          padding: 0.25rem 0.5rem;
          border-radius: var(--border-radius-md);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .feature-icon-wrapper {
          width: 54px;
          height: 54px;
          border-radius: var(--border-radius-lg);
          border: 2px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .feature-card h3 {
          font-size: 1.45rem;
          font-weight: 700;
        }

        /* Glassmorphic Modals */
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(11, 12, 16, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .glass-modal-panel {
          width: 100%;
          max-width: 650px;
          background: rgba(255, 255, 255, 0.08);
          border: 2px solid rgba(255, 255, 255, 0.22);
          border-radius: 28px;
          padding: 2.5rem;
          position: relative;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          color: #FFFFFF;
          text-align: left;
        }

        .modal-close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.15);
          color: #FFFFFF;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .modal-close-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: #EF4444;
          color: #FCA5A5;
        }

        .modal-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .modal-subtitle {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.7);
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        /* Roadmap Form */
        .roadmap-generator-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .form-input-row {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .input-group {
          flex: 1;
          min-width: 250px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .generator-lbl {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.6);
        }

        .generator-input {
          background: rgba(255, 255, 255, 0.04);
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          color: #FFFFFF;
          outline: none;
          transition: all 0.3s ease;
        }

        .generator-input:focus {
          border-color: #84CC16;
        }

        .duration-pill-group {
          display: flex;
          gap: 0.35rem;
        }

        .duration-pill-btn {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.75);
          padding: 0.75rem;
          border-radius: 12px;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .duration-pill-btn.active {
          background: rgba(99, 102, 241, 0.2);
          border-color: #6366F1;
          color: #A5B4FC;
        }

        .generator-submit-btn {
          width: fit-content;
        }

        .loading-card {
          background: rgba(255, 255, 255, 0.03);
          border: 2px dashed rgba(255, 255, 255, 0.1);
          padding: 1.5rem;
          border-radius: 16px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
        }

        .loading-spin {
          color: var(--color-lime);
        }

        .roadmap-result-panel {
          border-top: 1.5px dashed rgba(255, 255, 255, 0.12);
          margin-top: 1.5rem;
          padding-top: 1.5rem;
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .result-header h4 {
          font-size: 1.25rem;
          font-weight: 800;
          font-family: 'Space Grotesk', sans-serif;
        }

        .timeline-tag {
          background: rgba(132, 204, 22, 0.15);
          border: 1px solid #84CC16;
          color: #BEF264;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 750;
        }

        .result-steps-timeline {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .result-step-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .step-num-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 60px;
          flex-shrink: 0;
        }

        .step-week-lbl {
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--color-lime);
          font-family: 'Space Grotesk', sans-serif;
        }

        .step-circle-badge {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 0.85rem;
          margin-top: 0.15rem;
        }

        .step-info-right h5 {
          font-size: 1.05rem;
          font-weight: 800;
          font-family: 'Space Grotesk', sans-serif;
        }

        .step-info-right p {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.45;
        }

        .resource-link-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          margin-top: 0.4rem;
        }

        .study-lbl {
          font-weight: 800;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          font-size: 0.7rem;
        }

        .resource-anchor {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          color: #A5B4FC;
          font-weight: 700;
          text-decoration: underline;
        }

        /* Seminar Card */
        .seminar-item-card {
          background: rgba(255, 255, 255, 0.04);
          border: 2px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          box-shadow: 2px 2px 0 rgba(0,0,0,0.15);
        }

        .seminar-main-details {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          text-align: left;
        }

        .seminar-badge-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .seminar-mentor-badge {
          background-color: rgba(132, 204, 22, 0.15);
          color: #BEF264;
          border: 1px solid rgba(132, 204, 22, 0.2);
          border-radius: 6px;
          padding: 0.15rem 0.5rem;
          font-size: 0.7rem;
          font-weight: 800;
          font-family: 'Space Grotesk', sans-serif;
        }

        .seminar-time-badge {
          background-color: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          padding: 0.15rem 0.5rem;
          font-size: 0.7rem;
          font-weight: 700;
        }

        .seminar-main-details h5 {
          font-size: 1.15rem;
          font-weight: 800;
          font-family: 'Space Grotesk', sans-serif;
        }

        .seminar-main-details p {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
        }

        .seminar-join-btn {
          flex-shrink: 0;
          padding: 0.75rem 1.25rem !important;
          font-size: 0.9rem !important;
        }

        @media (max-width: 600px) {
          .seminar-item-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .seminar-join-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
