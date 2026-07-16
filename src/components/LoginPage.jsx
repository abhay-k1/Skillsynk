import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, UserCheck, Shield, Users } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState('learner'); // learner | mentor | admin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      onLogin(email, role);
    }
  };

  return (
    <div className="login-viewport">
      {/* Dynamic Background GIF */}
      <div className="login-bg-gif" style={{ backgroundImage: "url('/gif_4e24cf231a43.gif')" }}></div>
      <div className="login-bg-overlay"></div>

      {/* Glassmorphic Login Card */}
      <div className="glass-login-card animate-slide-up">
        <div className="glass-logo" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <img src={logoImg} alt="SkillSync" style={{ height: '42px', objectFit: 'contain' }} />
        </div>

        <div className="glass-header">
          <h2>Welcome back</h2>
          <p>Choose your portal and sign in to get started.</p>
        </div>

        {/* Role Selector above Username */}
        <div className="glass-role-container">
          <label className="glass-label">LOGIN AS A:</label>
          <div className="glass-role-grid">
            <button 
              type="button" 
              className={`glass-role-btn ${role === 'learner' ? 'active-learner' : ''}`}
              onClick={() => {
                setRole('learner');
                if (!email) setEmail('learner@skillsync.ai');
              }}
            >
              <span>Learner</span>
            </button>
            <button 
              type="button" 
              className={`glass-role-btn ${role === 'mentor' ? 'active-mentor' : ''}`}
              onClick={() => {
                setRole('mentor');
                if (!email || email.includes('learner')) setEmail('aria.chen@figma.com');
              }}
            >
              <span>Mentor</span>
            </button>
            <button 
              type="button" 
              className={`glass-role-btn ${role === 'admin' ? 'active-admin' : ''}`}
              onClick={() => {
                setRole('admin');
                setEmail('admin@skillsync.ai');
              }}
            >
              <span>Admin</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-form">
          <div className="glass-form-group">
            <label className="glass-label">EMAIL ADDRESS</label>
            <div className="glass-input-wrapper">
              <Mail size={18} className="glass-input-icon" />
              <input 
                type="email" 
                required
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="glass-input"
              />
            </div>
          </div>

          <div className="glass-form-group">
            <label className="glass-label">PASSWORD</label>
            <div className="glass-input-wrapper">
              <Lock size={18} className="glass-input-icon" />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input"
              />
            </div>
          </div>

          <button type="submit" className="glass-btn-primary">
            <span>Sign In to {role.charAt(0).toUpperCase() + role.slice(1)} Portal</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="glass-divider">
          <span>OR CONTINUE WITH</span>
        </div>

        <div className="glass-social-grid">
          <button className="glass-btn-social" onClick={() => onLogin(role === 'mentor' ? 'aria.chen@figma.com' : `${role}@skillsync.ai`, role)}>
            <span className="google-icon-mock">G</span>
            <span>Google</span>
          </button>
          <button className="glass-btn-social" onClick={() => onLogin(role === 'mentor' ? 'aria.chen@figma.com' : `${role}@skillsync.ai`, role)}>
            <span className="github-icon-mock">🐙</span>
            <span>GitHub</span>
          </button>
        </div>
      </div>

      <style>{`
        /* Viewport Frame */
        .login-viewport {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 200; 
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* GIF background cover */
        .login-bg-gif {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          z-index: 1;
        }

        .login-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, rgba(20, 20, 30, 0.4) 0%, rgba(10, 10, 15, 0.75) 100%);
          z-index: 2;
        }

        /* Glassmorphism Panel */
        .glass-login-card {
          width: 100%;
          max-width: 450px;
          padding: 2.5rem 2.25rem;
          background: rgba(255, 255, 255, 0.08); 
          border: 1px solid rgba(255, 255, 255, 0.18); 
          border-radius: 28px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3), 
                      inset 0 1px 0 rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          z-index: 10;
          text-align: center;
          color: #FFFFFF;
          margin: 1rem;
        }

        .glass-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .logo-spark {
          font-size: 1.75rem;
          background: linear-gradient(135deg, #A78BFA, #FF8E8E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
        }

        .logo-txt {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -0.02em;
          color: #FFFFFF;
        }

        .logo-sub {
          color: #A78BFA;
        }

        .glass-header h2 {
          font-size: 1.65rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.25rem;
          font-family: 'Space Grotesk', sans-serif;
        }

        .glass-header p {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 1.75rem;
          line-height: 1.4;
        }

        /* Role Selector Styles */
        .glass-role-container {
          text-align: left;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .glass-role-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0.5rem;
        }

        .glass-role-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.7);
          padding: 0.6rem;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.85rem;
          font-family: 'Space Grotesk', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .glass-role-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
        }

        /* Active selector styles: neon glass glow */
        .glass-role-btn.active-learner {
          background: rgba(99, 102, 241, 0.25);
          border-color: #6366F1;
          color: #A5B4FC;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.2);
        }

        .glass-role-btn.active-mentor {
          background: rgba(132, 204, 22, 0.2);
          border-color: #84CC16;
          color: #BEF264;
          box-shadow: 0 0 10px rgba(132, 204, 22, 0.2);
        }

        .glass-role-btn.active-admin {
          background: rgba(239, 68, 68, 0.25);
          border-color: #EF4444;
          color: #FCA5A5;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
        }

        .glass-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          text-align: left;
        }

        .glass-form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .glass-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 0.08em;
        }

        .glass-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .glass-input-icon {
          position: absolute;
          left: 1.25rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .glass-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
          padding: 0.85rem 1rem 0.85rem 3rem;
          font-size: 0.95rem;
          color: #FFFFFF;
          outline: none;
          transition: all 0.3s ease;
        }

        .glass-input::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }

        .glass-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(167, 139, 250, 0.6);
          box-shadow: 0 0 0 4px rgba(167, 139, 250, 0.15);
        }

        .glass-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #6366F1, #8B5CF6);
          color: #FFFFFF;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.85rem;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
          margin-top: 0.5rem;
        }

        .glass-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(99, 102, 241, 0.45);
        }

        .glass-divider {
          text-align: center;
          margin: 1.25rem 0;
          position: relative;
        }

        .glass-divider::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        .glass-divider span {
          background: transparent;
          padding: 0 1rem;
          font-size: 0.65rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          position: relative;
          letter-spacing: 0.08em;
        }

        .glass-social-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .glass-btn-social {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0.7rem;
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .glass-btn-social:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .google-icon-mock {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          color: #F87171;
        }

        .github-icon-mock {
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}
