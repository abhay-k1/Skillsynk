import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, User, Compass, Sparkles, BookOpen } from 'lucide-react';

export default function OnboardingForm({ profile, setProfile, onComplete }) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateField = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const progressPercent = (step / totalSteps) * 100;

  const roles = [
    { id: 'Product Designer', label: 'Product Designer 🎨', sub: 'UX/UI, Figma, user paths' },
    { id: 'Frontend Engineer', label: 'Frontend Engineer 💻', sub: 'React, Next.js, code scaling' },
    { id: 'Data Scientist', label: 'Data Scientist / ML 🧠', sub: 'Python, ML, predictive models' },
    { id: 'Product Manager', label: 'Product Manager 🚀', sub: 'Metrics, roadmap, team sprint' },
    { id: 'Growth Marketer', label: 'Growth Marketer 📈', sub: 'SEO, data growth, A/B checks' }
  ];

  const experienceLevels = [
    { id: 'Beginner', label: 'Beginner (0-1 yrs) 🌱', sub: 'Just starting out, zero corporate experience.' },
    { id: 'Intermediate', label: 'Intermediate (1-3 yrs) 🛠️', sub: 'Know my way around, ready to level up my stack.' },
    { id: 'Advanced', label: 'Advanced (3+ yrs) 👑', sub: 'Experienced, targeting leadership & complex design.' }
  ];

  const learningStyles = [
    { id: 'hands-on project building', label: 'Project Speedrunner 🏎️', sub: 'Build real stuff together, audit repos, pair program.', icon: <Compass size={20} /> },
    { id: 'deep-dive theory with pair programming', label: 'System Theorist 📚', sub: 'Explain *why* things work conceptual first, then code.', icon: <BookOpen size={20} /> },
    { id: 'Q&A and career strategy', label: 'Strategic Audits 🔍', sub: 'Focus on portfolio roast, mock loops, and career plans.', icon: <Sparkles size={20} /> }
  ];

  const canProgress = () => {
    if (step === 1 && !profile.name.trim()) return false;
    if (step === 4 && !profile.goals.trim()) return false;
    return true;
  };

  return (
    <div className="onboarding-wrapper">
      {/* Progress header */}
      <div className="onboarding-progress-header">
        <span className="onboarding-step-indicator">Question {step} / {totalSteps}</span>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className="onboarding-card card animate-slide-up">
        {/* Stickers */}
        <div className="sticker sticker-top-right">Zero Spam</div>

        {/* Step 1: Name */}
        {step === 1 && (
          <div className="onboarding-step">
            <label className="form-label">
              Hey! What should we call you? 🏷️
            </label>
            <div className="input-with-icon">
              <User size={22} className="input-icon" />
              <input 
                type="text"
                className="form-input-text"
                placeholder="Type your name or nickname..."
                value={profile.name}
                onChange={(e) => updateField('name', e.target.value)}
                autoFocus
                onKeyDown={(e) => { if(e.key === 'Enter' && canProgress()) handleNext(); }}
              />
            </div>
            <p className="microcopy">We keep it friendly here. Real names, coding aliases, all good.</p>
          </div>
        )}

        {/* Step 2: Target Role */}
        {step === 2 && (
          <div className="onboarding-step">
            <label className="form-label">
              What is your target tech role right now? 🎯
            </label>
            <div className="options-grid-custom">
              {roles.map((r) => (
                <div 
                  key={r.id}
                  className={`onboarding-option-card ${profile.targetRole === r.id ? 'selected' : ''}`}
                  onClick={() => updateField('targetRole', r.id)}
                >
                  <span className="option-label">{r.label}</span>
                  <span className="option-subtext">{r.sub}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Experience */}
        {step === 3 && (
          <div className="onboarding-step">
            <label className="form-label">
              Where are you currently at in your journey? 🧭
            </label>
            <div className="experience-list">
              {experienceLevels.map((exp) => (
                <div 
                  key={exp.id}
                  className={`experience-option-card ${profile.experience === exp.id ? 'selected' : ''}`}
                  onClick={() => updateField('experience', exp.id)}
                >
                  <div className="exp-info">
                    <span className="exp-title">{exp.label}</span>
                    <span className="exp-sub">{exp.sub}</span>
                  </div>
                  <div className="exp-radio"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Primary Goal */}
        {step === 4 && (
          <div className="onboarding-step">
            <label className="form-label">
              What's the main goal you are trying to speedrun? 🏁
            </label>
            <input 
              type="text"
              className="form-input-text"
              placeholder="e.g. Pivot from design to PM, build a SaaS tool, crush Vercel interviews..."
              value={profile.goals}
              onChange={(e) => updateField('goals', e.target.value)}
              autoFocus
              onKeyDown={(e) => { if(e.key === 'Enter' && canProgress()) handleNext(); }}
            />
            <p className="microcopy">AI uses this to customize the kickoff checklist and match scores.</p>
          </div>
        )}

        {/* Step 5: Learning Style */}
        {step === 5 && (
          <div className="onboarding-step">
            <label className="form-label">
              How do you learn best? Choose your learning vibe. ⚡
            </label>
            <div className="options-grid-vertical">
              {learningStyles.map((style) => (
                <div 
                  key={style.id}
                  className={`style-option-card ${profile.learningStyle === style.id ? 'selected' : ''}`}
                  onClick={() => updateField('learningStyle', style.id)}
                >
                  <div className="style-icon">{style.icon}</div>
                  <div className="style-info">
                    <span className="style-title">{style.label}</span>
                    <span className="style-sub">{style.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="onboarding-actions">
          {step > 1 ? (
            <button className="btn btn-secondary" onClick={handlePrev}>
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          <button 
            className={`btn btn-primary ${!canProgress() ? 'disabled-btn' : ''}`}
            onClick={handleNext}
            disabled={!canProgress()}
          >
            <span>{step === totalSteps ? "Analyze Skill Gaps ➔" : "Next Question"}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .onboarding-wrapper {
          max-width: 680px;
          margin: 2rem auto;
        }

        .onboarding-progress-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .onboarding-step-indicator {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 750;
          color: var(--color-primary);
          font-size: 0.95rem;
        }

        .onboarding-card {
          min-height: 420px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3rem 2rem 2.5rem 2rem;
        }

        .onboarding-step {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          flex: 1;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .input-icon {
          position: absolute;
          left: 1.25rem;
          color: var(--color-dark);
        }

        .input-with-icon .form-input-text {
          padding-left: 3.5rem;
        }

        .microcopy {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-top: 0.75rem;
          font-weight: 600;
        }

        /* Step 2 specific styles */
        .options-grid-custom {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .onboarding-option-card {
          background-color: #FFFFFF;
          border: 3px solid var(--color-dark);
          border-radius: var(--border-radius-lg);
          padding: 1.25rem;
          cursor: pointer;
          transition: var(--transition-bounce);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          text-align: left;
          box-shadow: var(--block-shadow-sm);
        }

        .onboarding-option-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: var(--block-shadow-md);
          background-color: var(--color-purple-light);
        }

        .onboarding-option-card.selected {
          background-color: var(--color-lime);
          transform: translate(-4px, -4px);
          box-shadow: var(--block-shadow-hover);
        }

        .option-label {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
        }

        .option-subtext {
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }

        /* Step 3 specific styles */
        .experience-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }

        .experience-option-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 1.5rem;
          background-color: #FFFFFF;
          border: 3px solid var(--color-dark);
          border-radius: var(--border-radius-lg);
          cursor: pointer;
          transition: var(--transition-bounce);
          box-shadow: var(--block-shadow-sm);
        }

        .experience-option-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: var(--block-shadow-md);
          background-color: var(--color-purple-light);
        }

        .experience-option-card.selected {
          background-color: var(--color-lime);
          transform: translate(-3px, -3px);
          box-shadow: var(--block-shadow-hover);
        }

        .exp-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          text-align: left;
        }

        .exp-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--color-dark);
        }

        .exp-sub {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .exp-radio {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 3px solid var(--color-dark);
          position: relative;
          background-color: #FFFFFF;
        }

        .experience-option-card.selected .exp-radio {
          background-color: var(--color-primary);
        }

        .experience-option-card.selected .exp-radio::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          background-color: #FFFFFF;
          border-radius: 50%;
          top: 4px;
          left: 4px;
        }

        /* Step 5 vertical selection cards */
        .options-grid-vertical {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }

        .style-option-card {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.25rem;
          background-color: #FFFFFF;
          border: 3px solid var(--color-dark);
          border-radius: var(--border-radius-lg);
          cursor: pointer;
          transition: var(--transition-bounce);
          box-shadow: var(--block-shadow-sm);
        }

        .style-option-card:hover {
          transform: translate(-2px, -2px);
          box-shadow: var(--block-shadow-md);
          background-color: var(--color-purple-light);
        }

        .style-option-card.selected {
          background-color: var(--color-lime);
          transform: translate(-3px, -3px);
          box-shadow: var(--block-shadow-hover);
        }

        .style-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--border-radius-md);
          background-color: var(--bg-secondary);
          border: 2px solid var(--color-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-dark);
        }

        .style-option-card.selected .style-icon {
          background-color: #FFFFFF;
        }

        .style-info {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          text-align: left;
        }

        .style-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--color-dark);
        }

        .style-sub {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        /* Actions */
        .onboarding-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 2.5rem;
          border-top: 3px solid var(--color-dark);
          padding-top: 1.5rem;
        }

        .disabled-btn {
          opacity: 0.4;
          cursor: not-allowed;
          box-shadow: none !important;
          transform: none !important;
        }
      `}</style>
    </div>
  );
}
