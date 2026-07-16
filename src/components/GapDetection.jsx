import React, { useState } from 'react';
import { Upload, FileText, ArrowRight, Loader2, Sparkles, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { analyzeSkillsAndGaps } from '../services/aiService';

export default function GapDetection({ targetRole, setGaps, onComplete }) {
  const [resumeText, setResumeText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [fileName, setFileName] = useState('');
  const [analysisResults, setAnalysisResults] = useState(null);

  // Seed sample resumes to make demoing effortless
  const loadSampleResume = (type) => {
    if (type === 'designer') {
      setFileName('portfolio_july2026.pdf');
      setResumeText(`
        LIAM VANCE - Product Designer & Thinker
        CONTACT: liam@vance.design
        SUMMARY: Graphic Design graduate pivot to product. Love typography, wireframing.
        SKILLS: HTML, CSS, User Research, Graphic Design, Web Layouts, Adobe Illustrator, Adobe Photoshop.
        PROJECTS: Redesigned a local cafe website. Created vector illustration library.
        EXPERIENCE: Freelance Illustrator (1 year) - created branding packs.
      `);
    } else if (type === 'frontend') {
      setFileName('dev_resume_2026.docx');
      setResumeText(`
        CHLOE ZHANG - Frontend Engineer
        CONTACT: chloe.z@github.io
        SUMMARY: Junior developer looking to learn advanced React ecosystems.
        SKILLS: HTML, CSS, JavaScript, React, Web Design, Git, npm, Tailwind CSS.
        PROJECTS: Weather App (React, Tailwind), Personal blog page.
        EXPERIENCE: Web Dev Intern at Startup X (6 months). Managed landing pages.
      `);
    } else {
      setFileName('general_business.pdf');
      setResumeText(`
        Alex Miller - Business Associate
        CONTACT: alex.m@gmail.com
        SKILLS: Customer support, Microsoft Office, Google Sheets, basic HTML, writing, presentation slides.
        EXPERIENCE: Associate at Retail Co. (1 year).
      `);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      // Mock reading file
      setResumeText(`Mock extracted text from uploaded file: ${file.name}. Experience in tech, basic CSS, coding, and problem-solving.`);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setResumeText(`Mock extracted text from uploaded file: ${file.name}. Experience in tech, basic CSS, coding, and problem-solving.`);
    }
  };

  const handleStartAnalysis = async () => {
    if (!resumeText.trim()) return;
    
    setIsLoading(true);
    setLoadingStep(1); // Reading
    
    // Simulate multi-step intelligence loading
    setTimeout(() => {
      setLoadingStep(2); // Analyzing gaps
    }, 600);
    
    setTimeout(() => {
      setLoadingStep(3); // Mapping target role requirements
    }, 1100);

    try {
      const results = await analyzeSkillsAndGaps(resumeText, targetRole);
      setGaps(results);
      setAnalysisResults(results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  // Icon mapping helper
  const getStatusIcon = (status) => {
    switch (status) {
      case 'mastered':
        return <CheckCircle2 className="gap-icon text-success" size={24} />;
      case 'needs work':
        return <AlertCircle className="gap-icon text-warning" size={24} />;
      case 'missing':
      default:
        return <XCircle className="gap-icon text-danger" size={24} />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'mastered':
        return <span className="badge badge-success">Mastered</span>;
      case 'needs work':
        return <span className="badge badge-warning">Needs Work</span>;
      case 'missing':
      default:
        return <span className="badge badge-danger">Missing</span>;
    }
  };

  return (
    <div className="gap-detection-container">
      {!analysisResults ? (
        <div className="uploader-view animate-slide-up">
          <div className="section-intro">
            <h2>Let's check your skill gaps.</h2>
            <p>Paste your resume text or upload your CV, and our AI will compare your skills against a standard <strong>{targetRole}</strong> role checklist.</p>
          </div>

          {/* Quick seeds */}
          <div className="demo-seeds">
            <span>Or try a quick sample resume:</span>
            <div className="seed-buttons">
              <button className="btn btn-secondary btn-sm" onClick={() => loadSampleResume('designer')}>
                🎨 UI Designer Resume
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => loadSampleResume('frontend')}>
                💻 Frontend Dev Resume
              </button>
            </div>
          </div>

          <div 
            className={`drag-area ${dragActive ? 'drag-active' : ''} ${fileName ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            {fileName ? (
              <div className="file-attached">
                <FileText size={48} className="file-icon" />
                <span className="file-name">{fileName}</span>
                <button className="btn-text" onClick={() => { setFileName(''); setResumeText(''); }}>
                  Remove file
                </button>
              </div>
            ) : (
              <div className="upload-prompt">
                <Upload size={48} className="upload-icon" />
                <p className="drag-label">Drag & drop your resume file here or <span className="browse-link">browse</span></p>
                <input 
                  type="file" 
                  className="file-input-hidden" 
                  id="resumeFile" 
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileChange}
                />
                <label htmlFor="resumeFile" className="file-label-cover"></label>
              </div>
            )}
          </div>

          <div className="divider-or">
            <span>OR PASTE TEXT</span>
          </div>

          <textarea
            className="resume-textarea"
            rows="6"
            placeholder="Paste your resume text directly, or list your past projects, tools, and background..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          ></textarea>

          <button 
            className={`btn btn-primary btn-lg action-btn ${(!resumeText.trim() || isLoading) ? 'disabled-btn' : ''}`}
            disabled={!resumeText.trim() || isLoading}
            onClick={handleStartAnalysis}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>
                  {loadingStep === 1 && "Reading resume content..."}
                  {loadingStep === 2 && "Analyzing skill alignments..."}
                  {loadingStep === 3 && "Building gap list..."}
                </span>
              </>
            ) : (
              <>
                <span>Analyze Skill Gaps</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="results-view animate-slide-up">
          <div className="section-intro">
            <div className="badge-wrapper">
              <span className="badge badge-primary">Analysis Completed</span>
            </div>
            <h2>Here are your skill gaps for <span className="gradient-text">{targetRole}</span></h2>
            <p>Our AI processed your profile. We found skills you have locked down, and some critical building blocks you need to cover to match the industry standard.</p>
          </div>

          <div className="gaps-grid">
            {analysisResults.map((gap, idx) => (
              <div key={idx} className={`gap-card card gap-status-${gap.status}`}>
                <div className="gap-card-header">
                  {getStatusIcon(gap.status)}
                  <div className="gap-card-info">
                    <h4>{gap.name}</h4>
                    <span className="gap-category">{gap.category}</span>
                  </div>
                </div>
                <div className="gap-card-footer">
                  {getStatusLabel(gap.status)}
                  <span className="priority-tag">Priority: {gap.priority}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="gaps-actions">
            <button className="btn btn-secondary btn-lg" onClick={() => setAnalysisResults(null)}>
              Start Over
            </button>
            <button className="btn btn-primary btn-lg" onClick={() => onComplete(analysisResults)}>
              <span>Find Matching Mentors</span>
              <Sparkles size={18} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .gap-detection-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .section-intro {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .section-intro h2 {
          font-size: 2.25rem;
          margin-bottom: 0.75rem;
          font-weight: 800;
        }

        .section-intro p {
          color: var(--color-text-muted);
          font-size: 1.05rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .demo-seeds {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          background-color: var(--bg-secondary);
          padding: 0.75rem 1rem;
          border-radius: var(--border-radius-lg);
          font-size: 0.9rem;
          font-weight: 600;
        }

        .seed-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn-sm {
          padding: 0.4rem 0.8rem;
          font-size: 0.85rem;
          border-radius: var(--border-radius-md);
        }

        /* Drag and Drop area */
        .drag-area {
          border: 2px dashed rgba(99, 102, 241, 0.3);
          background-color: var(--bg-card);
          border-radius: var(--border-radius-xl);
          padding: 3rem 2rem;
          text-align: center;
          transition: var(--transition-smooth);
          position: relative;
          cursor: pointer;
        }

        .drag-area:hover, .drag-area.drag-active {
          border-color: var(--color-primary);
          background-color: var(--color-primary-light);
        }

        .upload-icon {
          color: var(--color-primary);
          margin-bottom: 1rem;
        }

        .drag-label {
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-text-main);
        }

        .browse-link {
          color: var(--color-primary);
          font-weight: 700;
          text-decoration: underline;
        }

        .file-input-hidden {
          display: none;
        }

        .file-label-cover {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          cursor: pointer;
        }

        .file-attached {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .file-icon {
          color: var(--color-primary);
        }

        .file-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          color: var(--color-text-main);
        }

        .btn-text {
          border: none;
          background: transparent;
          color: var(--color-accent);
          font-weight: 700;
          font-size: 0.875rem;
          cursor: pointer;
          text-decoration: underline;
        }

        .divider-or {
          text-align: center;
          margin: 1.5rem 0;
          position: relative;
        }

        .divider-or::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 100%;
          height: 1px;
          background-color: var(--border-color);
          z-index: 1;
        }

        .divider-or span {
          background-color: var(--bg-app);
          padding: 0 1rem;
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--color-text-muted);
          position: relative;
          z-index: 2;
          letter-spacing: 0.1em;
        }

        .resume-textarea {
          width: 100%;
          background-color: var(--bg-card);
          border: 2px solid rgba(226, 232, 240, 0.8);
          border-radius: var(--border-radius-xl);
          padding: 1.25rem 1.5rem;
          font-family: inherit;
          font-size: 1rem;
          color: var(--color-text-main);
          box-shadow: var(--shadow-sm);
          transition: var(--transition-smooth);
          resize: vertical;
          margin-bottom: 2rem;
        }

        .resume-textarea:focus {
          border-color: var(--color-primary);
          outline: none;
          box-shadow: 0 0 0 4px var(--color-primary-light);
        }

        .action-btn {
          width: 100%;
        }

        /* Gaps Results styles */
        .gaps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
          margin-bottom: 3rem;
        }

        .gap-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-left: 5px solid transparent;
          gap: 1.5rem;
        }

        .gap-status-mastered {
          border-left-color: var(--color-success);
        }

        .gap-status-needs\ work {
          border-left-color: var(--color-warning);
        }

        .gap-status-missing {
          border-left-color: var(--color-accent);
        }

        .gap-card-header {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .gap-icon {
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .text-success { color: var(--color-success); }
        .text-warning { color: var(--color-warning); }
        .text-danger { color: var(--color-accent); }

        .gap-card-info h4 {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.15rem;
        }

        .gap-category {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }

        .gap-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(226, 232, 240, 0.4);
          padding-top: 1rem;
        }

        .priority-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-text-muted);
        }

        .gaps-actions {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .badge-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 0.75rem;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
          .gaps-actions {
            flex-direction: column-reverse;
          }
          .gaps-actions .btn {
            width: 100%;
          }
          .demo-seeds {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
