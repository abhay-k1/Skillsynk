import React, { useEffect, useState } from 'react';
import { ShieldCheck, Star, ArrowLeft, Calendar, HelpCircle, ArrowRight, Download, BookOpen, CheckSquare, Square, Award, ExternalLink } from 'lucide-react';
import { prioritizeGapsAndMap } from '../services/aiService';

export default function MatchResults({ gaps, matches, mentors, customRoadmaps = [], onSelectMentor, onBack }) {
  const [priorityMap, setPriorityMap] = useState([]);
  const [expandedGap, setExpandedGap] = useState(null);
  
  // Keep track of ticked checkboxes inside the roadmaps so it feels interactive
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    if (gaps && gaps.length > 0) {
      const mapped = prioritizeGapsAndMap(gaps, mentors);
      setPriorityMap(mapped);
    }
  }, [gaps, mentors]);

  const toggleCheck = (gapName, stepIdx, subIdx) => {
    const key = `${gapName}-${stepIdx}-${subIdx}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Detailed proper roadmaps
  const detailedRoadmaps = {
    "UI/UX Design": {
      duration: "4 Weeks • ~12 hours/week",
      steps: [
        { 
          title: "Foundations of Layout & Visual Systems", 
          duration: "Week 1", 
          desc: "Master grid alignments, padding, margins, and geometric balance.",
          subtasks: [
            "Study standard grid layouts (8pt grid system, 12-column layouts).",
            "Learn typography systems: font scaling, line height ratios, and weight contrast.",
            "Establish color theory maps: primary, neutral, warning, and contrast accessibility (WCAG AA rating)."
          ]
        },
        { 
          title: "User Research & Information Architecture", 
          duration: "Week 2", 
          desc: "Translate user goals into clear wireframe frameworks.",
          subtasks: [
            "Create user flows and site maps showing screen relationships.",
            "Construct low-fidelity wireframes in grayscale to isolate layout from style.",
            "Conduct card sorting audits and draft user journey matrices."
          ]
        },
        { 
          title: "Design Systems & Component Library setup", 
          duration: "Week 3", 
          desc: "Build scalable, responsive components with tokens.",
          subtasks: [
            "Build reusable master components (Buttons, Inputs, Modals).",
            "Define design variables (padding modes, margin variables, theme values).",
            "Draft developer handoff redlines and component specs."
          ]
        },
        { 
          title: "Advanced Interactions & Micro-animations", 
          duration: "Week 4", 
          desc: "Add spring transitions and interactive states to components.",
          subtasks: [
            "Build component-level states (hover, active, disabled) in Figma.",
            "Animate page transitions with smart-animate curves (easing, springs).",
            "Conduct usability audits of interactive prototypes with real users."
          ]
        }
      ],
      project: {
        title: "SaaS Dashboard Redesign",
        desc: "Redesign a complex, data-heavy SaaS dashboard. Establish a strict design system, build fully responsive hi-fi prototypes, and document accessibility ratios."
      },
      resources: [
        "Refactoring UI by Steve Schoger",
        "Laws of UX (lawsofux.com)",
        "WCAG Contrast Auditing Guidelines"
      ]
    },
    "Figma": {
      duration: "4 Weeks • ~15 hours/week",
      steps: [
        { 
          title: "Auto-Layout & Responsive Constraints", 
          duration: "Week 1", 
          desc: "Build layouts that automatically scale to mobile and desktop resolutions.",
          subtasks: [
            "Master absolute positioning, padding, and gap rules in Auto-Layout.",
            "Set resizing configurations (Hug, Fill, Fixed) correctly on nested containers.",
            "Build clean, spacer-free layouts using wrap properties."
          ]
        },
        { 
          title: "Advanced Component Properties & Variants", 
          duration: "Week 2", 
          desc: "Build highly consolidated component structures.",
          subtasks: [
            "Configure component variants and boolean toggles.",
            "Set text overrides and instance swap properties on icons.",
            "Simplify design libraries by nesting atomic components."
          ]
        },
        { 
          title: "Figma Variables & Token Integration", 
          duration: "Week 3", 
          desc: "Configure theme engines directly in Figma files.",
          subtasks: [
            "Define number variables for margins, paddings, and border radius.",
            "Establish color variables mapped to semantic variables (e.g. background-surface).",
            "Set up multi-mode variable collections (Light Mode, Dark Mode, Mobile Density)."
          ]
        },
        { 
          title: "Interactive Prototypes & Easing Curves", 
          duration: "Week 4", 
          desc: "Construct fully functional mockups.",
          subtasks: [
            "Set up interactive components (e.g. switch toggling state without extra frames).",
            "Build dynamic overlays, scroll overflows, and persistent navbars.",
            "Configure smart-animate spring parameters for premium micro-interactions."
          ]
        }
      ],
      project: {
        title: "Multi-Platform Themeable UI Kit",
        desc: "Design a comprehensive component library in Figma utilizing Auto-Layout 5.0, complete variables for color/spacing, and interactive states supporting Light/Dark themes."
      },
      resources: [
        "Figma Help Center: Auto-Layout Masterclass",
        "Design Systems Repo (designsystemsrepo.com)",
        "Config Conference Sessions on Advanced Prototyping"
      ]
    },
    "Data Science": {
      duration: "6 Weeks • ~18 hours/week",
      steps: [
        { 
          title: "Data Manipulation & Analytics Core", 
          duration: "Week 1-2", 
          desc: "Import, clean, and manipulate large transaction files.",
          subtasks: [
            "Master Pandas Series, DataFrames, indexing, and slice configurations.",
            "Clean missing data, remove duplicates, and merge datasets with SQL-like joins.",
            "Perform advanced aggregates using groupby and pivot tables."
          ]
        },
        { 
          title: "Exploratory Data Analysis (EDA) & Visualization", 
          duration: "Week 3", 
          desc: "Plot distributions, correlation matrix grids, and identify outlier nodes.",
          subtasks: [
            "Plot datasets using Matplotlib (subplots, figure layouts).",
            "Construct Seaborn charts (pairplots, heatmaps, jointplots).",
            "Audit statistical distributions (skewness, kurtosis, normal tests)."
          ]
        },
        { 
          title: "Supervised Machine Learning Foundations", 
          duration: "Week 4-5", 
          desc: "Train predictive classifiers and regressors.",
          subtasks: [
            "Train Linear & Logistic Regression models in Scikit-Learn.",
            "Build Random Forest and Decision Tree classifiers.",
            "Optimize hyperparameters using GridSearchCV and cross-validation."
          ]
        },
        { 
          title: "Model Validation & Pipeline Deployment", 
          duration: "Week 6", 
          desc: "Validate metrics and deploy model predictions.",
          subtasks: [
            "Evaluate models using confusion matrices, ROC curves, F1-scores, and precision-recall.",
            "Build automated data cleaning and scaling pipelines using Pipeline objects.",
            "Serialize trained models using Joblib for API deployment."
          ]
        }
      ],
      project: {
        title: "Customer Churn Prediction Engine",
        desc: "Analyze customer subscription logs. Clean features, run EDA, train a Random Forest model, optimize hyperparameters, and output the probability matrix of churn risks."
      },
      resources: [
        "Python for Data Analysis by Wes McKinney",
        "Scikit-Learn Documentation (scikit-learn.org)",
        "Kaggle Intro to Machine Learning courses"
      ]
    },
    "React": {
      duration: "4 Weeks • ~15 hours/week",
      steps: [
        { 
          title: "React Core Hooks & State Pipeline", 
          duration: "Week 1", 
          desc: "Master state tracking, effects, and custom hooks.",
          subtasks: [
            "Use useState and useReducer to track component states.",
            "Master useEffect dependencies to synchronize with external APIs without infinite loops.",
            "Extract repeated logic into custom hooks (e.g. useFetch, useWindowSize)."
          ]
        },
        { 
          title: "Routing & Application layouts", 
          duration: "Week 2", 
          desc: "Build multi-page SPA interfaces.",
          subtasks: [
            "Configure React Router app routers, loaders, and nested route layouts.",
            "Build protected routes (route guards) checking auth status.",
            "Implement lazy loading components using Suspense and React.lazy."
          ]
        },
        { 
          title: "State Engines & Global Context", 
          duration: "Week 3", 
          desc: "Manage state globally with zero prop-drilling.",
          subtasks: [
            "Build global contexts with React Context API.",
            "Migrate complex states to Zustand or Redux Toolkit.",
            "Integrate caching APIs using React Query or RTK Query."
          ]
        },
        { 
          title: "React Performance Optimization", 
          duration: "Week 4", 
          desc: "Verify renders and optimize render times.",
          subtasks: [
            "Prevent useless renders using useMemo and useCallback hook caches.",
            "Optimize list rendering using React virtualized grids.",
            "Analyze renders using React DevTools Profiler."
          ]
        }
      ],
      project: {
        title: "Real-time Dashboard with Drag-and-Drop",
        desc: "Build a highly responsive task management dashboard. Integrate custom state hooks, context providers, Zustand store integrations, and optimize render lists."
      },
      resources: [
        "Beta React Docs (react.dev)",
        "Zustand State Library Guide",
        "Epic React by Kent C. Dodds"
      ]
    }
  };

  // Helper to fetch matching steps (either custom from mentor or default)
  const getRoadmapData = (skillName) => {
    // 1. Look for custom roadmap uploads
    const custom = customRoadmaps.find(
      (r) => r.skillName.toLowerCase() === skillName.toLowerCase()
    );
    if (custom) {
      return {
        isCustom: true,
        mentorName: custom.mentorName,
        duration: "4 Weeks • Custom schedule",
        steps: custom.steps.map((s, idx) => ({
          title: s.title || `Phase ${idx + 1}`,
          duration: `Phase ${idx + 1}`,
          desc: s.desc || "Guidelines provided by mentor.",
          subtasks: s.subtasks || ["Complete milestones listed by mentor."]
        })),
        project: {
          title: "Mentor Assigned Capstone",
          desc: "Implement the custom portfolio capstone challenge outlined by your mentor."
        },
        resources: [
          "Curated documentation link provided by mentor",
          "Workspace templates folder"
        ]
      };
    }

    // 2. Resolve database detailed templates
    const detailed = detailedRoadmaps[skillName] || detailedRoadmaps[gaps.find(g => g.name === skillName)?.name];
    
    if (detailed) {
      return {
        isCustom: false,
        mentorName: null,
        ...detailed
      };
    }

    // 3. Ultra detailed fallback template
    return {
      isCustom: false,
      mentorName: null,
      duration: "4 Weeks • ~10 hours/week",
      steps: [
        { 
          title: `Core Fundamentals of ${skillName}`, 
          duration: "Week 1", 
          desc: `Understand the core specifications and utility rules of ${skillName}.`,
          subtasks: [
            `Read official onboarding guidelines for ${skillName}.`,
            "Set up development sandbox environment.",
            "Build basic hello-world models."
          ]
        },
        { 
          title: "Intermediate Practices", 
          duration: "Week 2", 
          desc: `Build standard application frameworks with ${skillName}.`,
          subtasks: [
            "Build nested components showing state transitions.",
            "Write basic error handling modules.",
            "Inspect console layouts."
          ]
        },
        { 
          title: "Advanced Scenarios", 
          duration: "Week 3", 
          desc: "Audit optimization, clean code, and design patterns.",
          subtasks: [
            "Run performance profiling tests.",
            "Format code files according to standard linter settings.",
            "Refactor modules to be fully reusable."
          ]
        },
        { 
          title: "Capstone Delivery", 
          duration: "Week 4", 
          desc: "Complete final project handoff specifications.",
          subtasks: [
            "Write testing suites covering main code branches.",
            "Deploy final build folders to production.",
            "Create document index files."
          ]
        }
      ],
      project: {
        title: `${skillName} Mastery Project`,
        desc: `Build a complete showcase application or workflow utilizing ${skillName} features. Document steps and upload to your portfolio.`
      },
      resources: [
        `Official ${skillName} Reference documentation`,
        "GitHub Awesome repository indexes"
      ]
    };
  };

  // Triggers print view layout styled specifically for PDF saves
  const triggerPDFDownload = (skillName, roadmap) => {
    const printWindow = window.open('', '_blank');
    const stepsHtml = roadmap.steps
      .map(
        (step, idx) => `
        <div class="step-card">
          <div class="step-badge">${step.duration}</div>
          <div class="step-title">${step.title}</div>
          <div class="step-desc">${step.desc}</div>
          <ul class="subtasks-list">
            ${step.subtasks.map(task => `<li>${task}</li>`).join('')}
          </ul>
        </div>
      `
      )
      .join('');

    const resourcesHtml = roadmap.resources
      .map(r => `<li>${r}</li>`)
      .join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>${skillName} Master Syllabus - SkillSync</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');
            body { 
              font-family: 'Plus Jakarta Sans', sans-serif; 
              padding: 50px; 
              color: #1A1A1A; 
              background-color: #FAF8F2;
            }
            .header {
              border-bottom: 3px solid #1A1A1A;
              padding-bottom: 20px;
              margin-bottom: 40px;
            }
            h1 { 
              font-family: 'Space Grotesk', sans-serif; 
              font-size: 32px; 
              font-weight: 700;
              margin: 0;
            }
            .meta { 
              font-family: 'Space Grotesk', sans-serif; 
              font-size: 14px; 
              font-weight: 700;
              color: #5850EC;
              margin-top: 5px;
            }
            .duration-lbl {
              font-size: 12px;
              color: #6B7280;
              font-weight: 700;
              margin-top: 5px;
            }
            .step-card {
              background: #FFFFFF;
              border: 3px solid #1A1A1A;
              border-radius: 16px;
              padding: 24px;
              margin-bottom: 25px;
              box-shadow: 4px 4px 0px #1A1A1A;
            }
            .step-badge {
              display: inline-block;
              background: #84CC16;
              border: 2px solid #1A1A1A;
              padding: 2px 8px;
              border-radius: 8px;
              font-family: 'Space Grotesk', sans-serif;
              font-size: 11px;
              font-weight: 700;
              margin-bottom: 10px;
            }
            .step-title {
              font-family: 'Space Grotesk', sans-serif;
              font-size: 18px;
              font-weight: 700;
              margin-bottom: 8px;
            }
            .step-desc {
              font-size: 14px;
              color: #4B5563;
              line-height: 1.6;
              margin-bottom: 15px;
            }
            .subtasks-list {
              padding-left: 20px;
              margin: 0;
            }
            .subtasks-list li {
              font-size: 13px;
              color: #1A1A1A;
              margin-bottom: 6px;
              line-height: 1.5;
            }
            .project-card {
              background: #FFF5F5;
              border: 3px solid #1A1A1A;
              border-radius: 16px;
              padding: 24px;
              margin-bottom: 25px;
              box-shadow: 4px 4px 0px #1A1A1A;
            }
            .project-title {
              font-family: 'Space Grotesk', sans-serif;
              font-weight: 800;
              color: #FF5A5A;
              font-size: 18px;
              margin-bottom: 8px;
            }
            .resources-card {
              background: #EEF2FF;
              border: 3px solid #1A1A1A;
              border-radius: 16px;
              padding: 24px;
              margin-bottom: 25px;
              box-shadow: 4px 4px 0px #1A1A1A;
            }
            .resources-title {
              font-family: 'Space Grotesk', sans-serif;
              font-weight: 800;
              color: #5850EC;
              font-size: 18px;
              margin-bottom: 12px;
            }
            .footer {
              margin-top: 60px;
              font-size: 12px;
              color: #6B7280;
              text-align: center;
              border-top: 2px dashed #1A1A1A;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${skillName} Mastery Syllabus</h1>
            <div class="meta">
              ${roadmap.isCustom ? `⭐ CUSTOM GUIDE UPLOADED BY MENTOR: ${roadmap.mentorName}` : '✨ AI GENERATED DEVELOPMENT TRACK'}
            </div>
            <div class="duration-lbl">${roadmap.duration}</div>
          </div>
          
          ${stepsHtml}

          <div class="project-card">
            <div class="project-title">🏆 CAPSTONE PROJECT: ${roadmap.project.title}</div>
            <div style="font-size: 14px; line-height: 1.6; color: #4B5563;">${roadmap.project.desc}</div>
          </div>

          <div class="resources-card">
            <div class="resources-title">📚 RECOMMENDED STUDY RESOURCES</div>
            <ul style="padding-left: 20px; font-size: 14px; margin: 0; line-height: 1.6;">
              ${resourcesHtml}
            </ul>
          </div>

          <div class="footer">
            Generated by SkillSync — Intelligent Mentor Matchmaking.
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="matches-container animate-slide-up">
      {/* Intro */}
      <div className="section-intro">
        <span className="badge badge-primary">Matches Ranked By AI</span>
        <h2>Meet your top 3 mentor matches</h2>
        <p>Our algorithms scored mentors based on how their actual career path and expertise match your goals and bridge your skill gaps.</p>
      </div>

      {/* Top 3 Mentor Cards */}
      <div className="mentors-grid">
        {matches.map((mentor, idx) => (
          <div key={mentor.id} className="mentor-card card">
            {/* Ribbon Rank */}
            <div className="rank-ribbon" style={{ background: mentor.gradient }}>
              #{idx + 1} Match
            </div>

            {/* Match Score Badge */}
            <div className="match-score-badge">
              <span className="score-num">{mentor.matchPercentage}%</span>
              <span className="score-lbl">Match</span>
            </div>

            {/* Profile Info */}
            <div className="mentor-header">
              <div className="mentor-avatar" style={{ background: mentor.gradient }}>
                {mentor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="mentor-meta">
                <h3>{mentor.name}</h3>
                <p className="mentor-title">{mentor.role} at <strong>{mentor.company}</strong></p>
                <div className="mentor-stats">
                  <span className="stat-item"><Star size={14} className="star-icon" /> {mentor.rating}</span>
                  <span className="stat-separator">•</span>
                  <span className="stat-item">{mentor.sessionsCount} sessions</span>
                </div>
              </div>
            </div>

            {/* Explainable AI block */}
            <div className="ai-explanation-box">
              <div className="ai-explanation-header">
                <ShieldCheck size={16} className="ai-shield-icon" />
                <span>WHY THIS MENTOR</span>
              </div>
              <p className="ai-explanation-text">"{mentor.explanation}"</p>
            </div>

            {/* Skills & Gap Coverage */}
            <div className="mentor-skills-section">
              <h5>Expertise Highlights</h5>
              <div className="skills-badge-list">
                {mentor.skills.map((skill, sIdx) => {
                  const coversGap = gaps.some(g => g.name === skill && g.status !== 'mastered');
                  return (
                    <span 
                      key={sIdx} 
                      className={`skill-pill ${coversGap ? 'covers-gap' : ''}`}
                    >
                      {coversGap ? '⚡ ' : ''}{skill}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Book CTA */}
            <button 
              className="btn btn-primary book-btn"
              onClick={() => onSelectMentor(mentor)}
            >
              <span>Book Kickoff Session</span>
            </button>
          </div>
        ))}
      </div>

      {/* Gap-to-mentor priority linking */}
      {priorityMap.length > 0 && (
        <section className="priority-roadmap-section card">
          <div className="roadmap-header">
            <h3>⚡ Gap-to-Mentor Priority Roadmap</h3>
            <p>Click any gap card to expand a step-by-step master roadmap. Download it as a PDF or access custom guides uploaded by mentors.</p>
          </div>

          <div className="roadmap-list">
            {priorityMap.map((item, idx) => {
              const roadmap = getRoadmapData(item.skillName);
              const isExpanded = expandedGap === item.skillName;
              return (
                <div key={idx} className="roadmap-row-container">
                  <div 
                    className={`roadmap-item ${isExpanded ? 'is-expanded-header' : ''}`}
                    onClick={() => setExpandedGap(isExpanded ? null : item.skillName)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="roadmap-gap-info">
                      <div className="roadmap-priority-badge">
                        <span className={`badge ${item.status === 'missing' ? 'badge-danger' : 'badge-warning'}`}>
                          {item.priority}
                        </span>
                      </div>
                      <div className="roadmap-gap-name">
                        <h4>{item.skillName}</h4>
                        <p className="status-sub">
                          Status: {item.status} 
                          {roadmap.isCustom && <span className="custom-guide-alert"> (Custom Guide Available ⭐)</span>}
                        </p>
                      </div>
                    </div>

                    <div className="roadmap-connector">
                      <ArrowRight size={20} className="connector-arrow" />
                    </div>

                    {item.mappedMentor ? (
                      <div 
                        className="roadmap-mentor-pill"
                        onClick={(e) => {
                          e.stopPropagation(); // Avoid expanding
                          const matched = mentors.find(m => m.id === item.mappedMentor.id);
                          if (matched) onSelectMentor(matched);
                        }}
                      >
                        <div className="mentor-pill-avatar" style={{ background: item.mappedMentor.gradient }}>
                          {item.mappedMentor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="mentor-pill-info">
                          <span className="mentor-pill-name">{item.mappedMentor.name}</span>
                          <span className="mentor-pill-role">{item.mappedMentor.role} @ {item.mappedMentor.company}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="roadmap-mentor-pill empty">
                        <HelpCircle size={16} />
                        <span>Self-guided study recommended</span>
                      </div>
                    )}
                  </div>

                  {/* Expanded Roadmap Block (Detailed Syllabus View) */}
                  {isExpanded && (
                    <div className="roadmap-expanded-panel animate-slide-up">
                      
                      {/* Meta header */}
                      <div className="panel-header-row">
                        <div className="panel-title-wrapper">
                          <BookOpen size={20} className="panel-title-icon" />
                          <h4>{item.skillName} Mastery Pathway</h4>
                          <span className="roadmap-duration-badge">{roadmap.duration}</span>
                          {roadmap.isCustom ? (
                            <span className="badge badge-success">⭐ Custom Mentor Guide by {roadmap.mentorName}</span>
                          ) : (
                            <span className="badge badge-primary">✨ AI Syllabus</span>
                          )}
                        </div>
                        <button 
                          className="btn btn-secondary btn-sm download-pdf-btn"
                          onClick={() => triggerPDFDownload(item.skillName, roadmap)}
                        >
                          <Download size={14} />
                          <span>Download PDF</span>
                        </button>
                      </div>

                      {/* Phased Timeline */}
                      <div className="pathway-steps-container">
                        {roadmap.steps.map((step, sIdx) => (
                          <div key={sIdx} className="pathway-step-card">
                            <div className="step-left-block">
                              <span className="step-time-tag">{step.duration}</span>
                              <div className="step-number-circle">{sIdx + 1}</div>
                            </div>
                            <div className="step-body-content">
                              <h5>{step.title}</h5>
                              <p className="step-desc-para">{step.desc}</p>
                              
                              {/* Subtask Checklists */}
                              <div className="step-subtasks-wrapper">
                                <h6>Milestone Checkpoints:</h6>
                                <div className="subtask-checkbox-list">
                                  {step.subtasks.map((task, tIdx) => {
                                    const isTicked = checkedItems[`${item.skillName}-${sIdx}-${tIdx}`] || false;
                                    return (
                                      <div 
                                        key={tIdx} 
                                        className={`subtask-checkbox-row ${isTicked ? 'ticked' : ''}`}
                                        onClick={() => toggleCheck(item.skillName, sIdx, tIdx)}
                                      >
                                        {isTicked ? (
                                          <CheckSquare size={16} className="checkbox-icon checked" />
                                        ) : (
                                          <Square size={16} className="checkbox-icon" />
                                        )}
                                        <span>{task}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Capstone project highlight */}
                      <div className="roadmap-project-callout">
                        <div className="project-badge">
                          <Award size={18} />
                          <span>CAPSTONE DELIVERABLE</span>
                        </div>
                        <div className="project-details">
                          <h5>🏆 {roadmap.project.title}</h5>
                          <p>{roadmap.project.desc}</p>
                        </div>
                      </div>

                      {/* Study Resources */}
                      <div className="roadmap-resources-callout">
                        <h5>📚 Recommended Learning Resources</h5>
                        <div className="resources-grid-row">
                          {roadmap.resources.map((res, rIdx) => (
                            <div key={rIdx} className="resource-item">
                              <ExternalLink size={12} className="resource-link-icon" />
                              <span>{res}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Footer controls */}
      <div className="navigation-controls">
        <button className="btn btn-secondary" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Adjust resume analysis</span>
        </button>
      </div>

      <style>{`
        .matches-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .mentors-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .mentor-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2.25rem 2rem;
          min-height: 480px;
        }

        .rank-ribbon {
          position: absolute;
          top: 1rem;
          left: 0;
          padding: 0.35rem 1rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 0.75rem;
          color: #FFFFFF;
          border-top-right-radius: 9999px;
          border-bottom-right-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Match Score Badge */
        .match-score-badge {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: var(--color-purple-light);
          padding: 0.5rem 0.75rem;
          border-radius: var(--border-radius-md);
          border: 2px solid var(--color-dark);
          box-shadow: 2px 2px 0 var(--color-dark);
        }

        .score-num {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          color: var(--color-dark);
          line-height: 1;
        }

        .score-lbl {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-text-muted);
          letter-spacing: 0.05em;
        }

        /* Header Info */
        .mentor-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-top: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .mentor-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid var(--color-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 1.25rem;
          box-shadow: 3px 3px 0 var(--color-dark);
        }

        .mentor-meta {
          text-align: left;
        }

        .mentor-meta h3 {
          font-size: 1.25rem;
          font-weight: 800;
          line-height: 1.2;
        }

        .mentor-title {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-top: 0.15rem;
        }

        .mentor-stats {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.25rem;
        }

        .stat-item {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          gap: 0.2rem;
        }

        .star-icon {
          color: var(--color-accent);
          fill: var(--color-accent);
        }

        .stat-separator {
          color: var(--color-dark);
          font-size: 0.8rem;
        }

        /* Explainable AI Block */
        .ai-explanation-box {
          background-color: var(--bg-secondary);
          border-radius: var(--border-radius-lg);
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
          border: 2px solid var(--color-dark);
          box-shadow: 3px 3px 0 var(--color-dark);
        }

        .ai-explanation-header {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 0.7rem;
          color: var(--color-primary);
          letter-spacing: 0.08em;
          margin-bottom: 0.25rem;
        }

        .ai-shield-icon {
          color: var(--color-primary);
        }

        .ai-explanation-text {
          font-size: 0.85rem;
          font-weight: 600;
          line-height: 1.45;
          color: var(--color-dark);
          font-style: italic;
        }

        /* Skills section */
        .mentor-skills-section {
          text-align: left;
          margin-bottom: 2rem;
        }

        .mentor-skills-section h5 {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .skills-badge-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .skill-pill {
          font-size: 0.75rem;
          font-weight: 600;
          background-color: var(--bg-secondary);
          color: var(--color-text-muted);
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          border: 2px solid var(--color-dark);
          transition: var(--transition-smooth);
        }

        .skill-pill.covers-gap {
          background-color: var(--color-lime-light);
          color: var(--color-dark);
          font-weight: 700;
        }

        .book-btn {
          width: 100%;
          margin-top: auto;
        }

        /* Roadmap section styling */
        .priority-roadmap-section {
          margin-bottom: 3rem;
          padding: 2.5rem;
        }

        .roadmap-header {
          text-align: left;
          margin-bottom: 2rem;
        }

        .roadmap-header h3 {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
        }

        .roadmap-header p {
          color: var(--color-text-muted);
          font-size: 0.95rem;
        }

        .roadmap-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .roadmap-row-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .roadmap-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem;
          background-color: var(--bg-secondary);
          border: 3px solid var(--color-dark);
          border-radius: var(--border-radius-lg);
          transition: var(--transition-bounce);
          box-shadow: var(--block-shadow-sm);
        }

        .roadmap-item:hover {
          transform: translateY(-2px);
          box-shadow: var(--block-shadow-md);
          background-color: #FFFFFF;
        }

        .roadmap-item.is-expanded-header {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          transform: none !important;
          box-shadow: 3px 3px 0 var(--color-dark);
        }

        .roadmap-gap-info {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex: 1;
          text-align: left;
        }

        .roadmap-priority-badge {
          width: 120px;
          flex-shrink: 0;
          text-align: left;
        }

        .roadmap-gap-name h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-dark);
        }

        .status-sub {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }

        .custom-guide-alert {
          color: var(--color-lime);
          font-weight: 800;
        }

        .roadmap-connector {
          padding: 0 1.5rem;
          color: var(--color-dark);
        }

        .roadmap-mentor-pill {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background-color: #FFFFFF;
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius-md);
          border: 2px solid var(--color-dark);
          box-shadow: 2px 2px 0 var(--color-dark);
          cursor: pointer;
          transition: var(--transition-bounce);
          width: 250px;
          flex-shrink: 0;
          text-align: left;
        }

        .roadmap-mentor-pill:hover {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 var(--color-dark);
        }

        .roadmap-mentor-pill.empty {
          background-color: transparent;
          box-shadow: none;
          border: 2px dashed var(--color-dark);
          color: var(--color-text-muted);
          justify-content: center;
          cursor: default;
          font-size: 0.85rem;
          font-weight: 700;
        }

        .mentor-pill-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid var(--color-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 800;
          font-family: 'Space Grotesk', sans-serif;
        }

        .mentor-pill-info {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .mentor-pill-name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 750;
          font-size: 0.9rem;
          color: var(--color-dark);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mentor-pill-role {
          font-size: 0.7rem;
          color: var(--color-text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Glassmorphic Expanded Roadmap Panel */
        .roadmap-expanded-panel {
          background-color: rgba(255, 255, 255, 0.55);
          border: 3px solid var(--color-dark);
          border-top: none;
          border-bottom-left-radius: var(--border-radius-lg);
          border-bottom-right-radius: var(--border-radius-lg);
          padding: 2.25rem 2.5rem;
          box-shadow: 3px 3px 0 var(--color-dark);
          animation: slideUp 0.3s ease-out forwards;
          text-align: left;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .panel-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px dashed rgba(26, 26, 26, 0.15);
          padding-bottom: 1.25rem;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        .panel-title-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .panel-title-icon {
          color: var(--color-primary);
        }

        .panel-title-wrapper h4 {
          font-size: 1.35rem;
          font-weight: 800;
          font-family: 'Space Grotesk', sans-serif;
          margin: 0;
        }

        .roadmap-duration-badge {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--color-text-muted);
          background-color: var(--bg-secondary);
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          border: 1px solid rgba(26, 26, 26, 0.1);
        }

        .download-pdf-btn {
          box-shadow: 2px 2px 0 var(--color-dark) !important;
          background-color: #FFFFFF !important;
        }

        .download-pdf-btn:hover {
          transform: translate(-1px, -1px) !important;
          box-shadow: 3px 3px 0 var(--color-dark) !important;
        }

        /* Phased Timeline */
        .pathway-steps-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          margin-bottom: 2.25rem;
        }

        .pathway-step-card {
          background-color: #FFFFFF;
          border: 2px solid var(--color-dark);
          border-radius: var(--border-radius-lg);
          padding: 1.5rem 1.75rem;
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          box-shadow: 3px 3px 0 rgba(0,0,0,0.15);
          position: relative;
        }

        .step-left-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          flex-shrink: 0;
          width: 80px;
        }

        .step-time-tag {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--color-primary);
          text-transform: uppercase;
        }

        .step-number-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid var(--color-dark);
          background-color: var(--color-lime);
          color: var(--color-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
        }

        .step-body-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-align: left;
          flex: 1;
        }

        .step-body-content h5 {
          font-size: 1.15rem;
          font-weight: 800;
          font-family: 'Space Grotesk', sans-serif;
        }

        .step-desc-para {
          font-size: 0.9rem;
          color: var(--color-dark);
          line-height: 1.5;
        }

        /* Checklists */
        .step-subtasks-wrapper {
          border-top: 1px dashed rgba(26,26,26,0.12);
          padding-top: 0.85rem;
          margin-top: 0.5rem;
        }

        .step-subtasks-wrapper h6 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .subtask-checkbox-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .subtask-checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.875rem;
          color: var(--color-dark);
          cursor: pointer;
          transition: color 0.2s ease;
          user-select: none;
        }

        .subtask-checkbox-row:hover {
          color: var(--color-primary);
        }

        .subtask-checkbox-row.ticked {
          color: var(--color-text-muted);
          text-decoration: line-through;
        }

        .checkbox-icon {
          flex-shrink: 0;
          margin-top: 0.15rem;
          color: var(--color-dark);
        }

        .checkbox-icon.checked {
          color: var(--color-lime);
        }

        /* Capstone Callout */
        .roadmap-project-callout {
          background: #FFF5F5;
          border: 3px solid var(--color-dark);
          border-radius: var(--border-radius-lg);
          padding: 1.5rem 1.75rem;
          margin-bottom: 1.5rem;
          box-shadow: 3px 3px 0 var(--color-dark);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .project-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: var(--color-accent);
          color: #FFFFFF;
          border: 2px solid var(--color-dark);
          border-radius: var(--border-radius-md);
          padding: 0.25rem 0.65rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          font-size: 0.75rem;
          width: fit-content;
        }

        .project-details h5 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--color-dark);
          margin-bottom: 0.25rem;
        }

        .project-details p {
          font-size: 0.875rem;
          line-height: 1.55;
          color: var(--color-dark);
        }

        /* Study resources */
        .roadmap-resources-callout {
          border-top: 2px dashed rgba(26,26,26,0.15);
          padding-top: 1.5rem;
          text-align: left;
        }

        .roadmap-resources-callout h5 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.9rem;
          font-weight: 850;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-text-muted);
          margin-bottom: 0.85rem;
        }

        .resources-grid-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .resource-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--color-primary);
          font-weight: 700;
        }

        .resource-link-icon {
          color: var(--color-primary);
        }

        .navigation-controls {
          display: flex;
          justify-content: flex-start;
          margin-top: 2rem;
        }

        @media (max-width: 768px) {
          .roadmap-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .roadmap-connector {
            display: none;
          }
          .roadmap-mentor-pill {
            width: 100%;
          }
          .panel-header-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .download-pdf-btn {
            width: 100%;
          }
          .pathway-step-card {
            flex-direction: column;
            gap: 0.75rem;
          }
          .step-left-block {
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}
