import React from 'react';
import { Compass, Users } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Navbar({ currentView, setView, userRole }) {
  const isMentorView = currentView === 'mentor-dashboard';
  const isLanding = currentView === 'landing';

  // Helper to determine active step in the learner journey
  const getStepClass = (stepViews) => {
    return stepViews.includes(currentView) 
      ? 'navbar-step active' 
      : 'navbar-step';
  };

  return (
    <header className={`navbar-header ${isLanding ? 'is-landing-nav' : ''}`}>
      <div className="navbar-inner">
        {/* Brand Logo */}
        <div className="navbar-logo" onClick={() => setView('landing')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <img src={logoImg} alt="SkillSync" style={{ height: '36px', objectFit: 'contain' }} />
        </div>

        {/* Learner Journey Map */}
        {currentView !== 'landing' && !isMentorView && (
          <nav className="navbar-steps-nav">
            <div className={getStepClass(['onboarding'])}>
              <span className="step-num">1</span>
              <span className="step-label">Goals</span>
            </div>
            <div className="step-connector"></div>
            <div className={getStepClass(['gap-detection'])}>
              <span className="step-num">2</span>
              <span className="step-label">Gaps</span>
            </div>
            <div className="step-connector"></div>
            <div className={getStepClass(['matches', 'booking'])}>
              <span className="step-num">3</span>
              <span className="step-label">Matching</span>
            </div>
          </nav>
        )}

        {/* View Switcher (Only accessible to Admin) */}
        {userRole === 'admin' && (
          <div className="navbar-actions">
            {isMentorView ? (
              <button 
                className="btn btn-secondary btn-sm navbar-mode-btn"
                onClick={() => setView('landing')}
              >
                <Compass size={16} />
                <span>Learner Mode</span>
              </button>
            ) : (
              <button 
                className="btn btn-outline btn-sm navbar-mode-btn"
                onClick={() => setView('mentor-dashboard')}
              >
                <Users size={16} />
                <span>Mentor Portal</span>
              </button>
            )}
          </div>
        )}
      </div>

      <style>{`
        .navbar-header {
          background-color: transparent;
          border-bottom: none;
          box-shadow: none;
          position: sticky;
          top: 0;
          z-index: 100;
          padding: 1.5rem 2rem;
          transition: var(--transition-bounce);
        }
        
        /* Glassmorphic dark styling on landing view navbar overlay */
        .navbar-header.is-landing-nav {
          background-color: rgba(13, 14, 21, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }

        .navbar-header.is-landing-nav .logo-text {
          color: #FFFFFF; /* white text on landing */
        }

        .navbar-header.is-landing-nav .navbar-mode-btn {
          background-color: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.4);
        }

        .navbar-header.is-landing-nav .navbar-mode-btn:hover {
          background-color: rgba(255, 255, 255, 0.15);
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.4);
        }

        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .logo-icon {
          font-size: 1.5rem;
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }

        .logo-text {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 1.35rem;
          color: var(--color-dark);
          letter-spacing: -0.02em;
          transition: color 0.3s ease;
        }

        .logo-accent {
          color: var(--color-primary);
        }

        .navbar-steps-nav {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background-color: #FFFFFF;
          border: 2px solid var(--color-dark);
          padding: 0.4rem 0.8rem;
          border-radius: var(--border-radius-lg);
          box-shadow: 2px 2px 0 var(--color-dark);
        }

        @media (max-width: 768px) {
          .navbar-steps-nav {
            display: none;
          }
        }

        .navbar-step {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          opacity: 0.4;
          transition: var(--transition-smooth);
        }

        .navbar-step.active {
          opacity: 1;
        }

        .step-num {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background-color: var(--color-dark);
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 700;
          font-family: 'Space Grotesk', sans-serif;
        }

        .navbar-step.active .step-num {
          background-color: var(--color-primary);
        }

        .step-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.875rem;
          font-weight: 700;
        }

        .step-connector {
          width: 24px;
          height: 2px;
          background-color: var(--color-dark);
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          border-radius: var(--border-radius-md);
        }

        .navbar-mode-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          box-shadow: 3px 3px 0 var(--color-dark);
          background-color: #FFFFFF;
        }
        
        .navbar-mode-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 var(--color-dark);
        }

        @media (max-width: 480px) {
          .navbar-header {
            padding: 0.75rem 1rem;
          }
          .logo-text {
            font-size: 1.15rem;
          }
        }
      `}</style>
    </header>
  );
}
