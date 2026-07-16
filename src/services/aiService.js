// AI Service simulating intelligent, explainable LLM processing for SkillSync AI

/**
 * Normalizes input role to match seed role definitions
 */
function getRoleRequiredSkills(targetRole) {
  const role = targetRole.toLowerCase();
  
  if (role.includes("design") || role.includes("ux") || role.includes("ui")) {
    return [
      { name: "UI/UX Design", category: "Core Design", priority: "High" },
      { name: "Design Systems", category: "Core Design", priority: "High" },
      { name: "Figma", category: "Tooling", priority: "High" },
      { name: "User Research", category: "Strategy", priority: "Medium" },
      { name: "Prototyping", category: "Tooling", priority: "Medium" },
      { name: "Product Strategy", category: "Strategy", priority: "Low" }
    ];
  }
  
  if (role.includes("frontend") || role.includes("web") || role.includes("front")) {
    return [
      { name: "React", category: "Frameworks", priority: "High" },
      { name: "Next.js", category: "Frameworks", priority: "High" },
      { name: "TypeScript", category: "Languages", priority: "Medium" },
      { name: "JavaScript", category: "Languages", priority: "High" },
      { name: "Web Performance", category: "Advanced", priority: "Medium" },
      { name: "CSS/Tailwind", category: "Styling", priority: "High" },
      { name: "System Design", category: "Advanced", priority: "Medium" }
    ];
  }
  
  if (role.includes("data") || role.includes("machine") || role.includes("ml") || role.includes("ai")) {
    return [
      { name: "Python", category: "Languages", priority: "High" },
      { name: "Machine Learning", category: "Algorithms", priority: "High" },
      { name: "Data Science", category: "Core", priority: "High" },
      { name: "SQL", category: "Data", priority: "Medium" },
      { name: "Deep Learning", category: "Algorithms", priority: "Medium" },
      { name: "Data Engineering", category: "Infrastructure", priority: "Low" },
      { name: "A/B Testing", category: "Strategy", priority: "Medium" }
    ];
  }
  
  if (role.includes("product manager") || role.includes("pm") || role.includes("product lead")) {
    return [
      { name: "Product Management", category: "Core", priority: "High" },
      { name: "Roadmapping", category: "Strategy", priority: "High" },
      { name: "Product Analytics", category: "Data", priority: "High" },
      { name: "Agile", category: "Process", priority: "Medium" },
      { name: "User Stories", category: "Execution", priority: "Medium" },
      { name: "Stakeholder Communication", category: "Soft Skills", priority: "High" }
    ];
  }

  if (role.includes("growth") || role.includes("market") || role.includes("seo")) {
    return [
      { name: "Growth Marketing", category: "Core", priority: "High" },
      { name: "SEO & SEM", category: "Channels", priority: "High" },
      { name: "Data Analytics", category: "Data", priority: "High" },
      { name: "Content Strategy", category: "Creative", priority: "Medium" },
      { name: "A/B Testing", category: "Strategy", priority: "High" },
      { name: "Brand Positioning", category: "Creative", priority: "Medium" }
    ];
  }

  // Default: Full Stack
  return [
    { name: "React", category: "Frontend", priority: "High" },
    { name: "Node.js", category: "Backend", priority: "High" },
    { name: "PostgreSQL", category: "Database", priority: "Medium" },
    { name: "TypeScript", category: "Languages", priority: "Medium" },
    { name: "API Design", category: "Backend", priority: "High" },
    { name: "GraphQL", category: "Backend", priority: "Low" },
    { name: "Git & CI/CD", category: "DevOps", priority: "Medium" }
  ];
}

/**
 * Extracts current skills from resume text and flags gaps compared to target role.
 * Simulates a resume parser API.
 */
export const analyzeSkillsAndGaps = async (resumeText, targetRole) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const requiredSkills = getRoleRequiredSkills(targetRole);
  const textNormalized = (resumeText || "").toLowerCase();

  // Simple keywords heuristics for demo extraction
  const gapAnalysis = requiredSkills.map((skill) => {
    const skillLower = skill.name.toLowerCase();
    
    // Check for direct presence of skill name
    let status = "missing";
    
    if (textNormalized.includes(skillLower)) {
      status = "mastered";
    } else {
      // Check partial matches or related terms
      const partials = {
        "react": ["html", "css", "javascript", "js", "web", "frontend"],
        "next.js": ["react", "web", "router"],
        "typescript": ["javascript", "js", "ts"],
        "system design": ["architecture", "scaling", "aws", "backend"],
        "ui/ux design": ["sketch", "adobe", "photoshop", "illustrator", "design", "wireframes"],
        "design systems": ["figma", "components", "tokens", "ui kit"],
        "figma": ["design", "ui", "ux", "wireframe"],
        "python": ["programming", "coding", "r", "scripting"],
        "machine learning": ["data", "models", "pandas", "regression", "analytics"],
        "deep learning": ["neural", "pytorch", "tensorflow", "ai"],
        "product management": ["scrum", "agile", "jira", "jira", "launch", "metrics"],
        "roadmapping": ["strategy", "planning", "milestones"],
        "seo & sem": ["marketing", "adwords", "google ads", "content"]
      };

      const synonyms = partials[skillLower] || [];
      const hasSynonym = synonyms.some((syn) => textNormalized.includes(syn));
      
      if (hasSynonym) {
        status = "needs work";
      }
    }

    return {
      ...skill,
      status // "mastered" | "needs work" | "missing"
    };
  });

  return gapAnalysis;
};

/**
 * Computes matching percentage scores and generates GenZ-friendly match explanations
 */
export const scoreAndExplainMatches = async (studentProfile, gaps, mentors) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const targetRole = studentProfile.targetRole || "";
  const missingSkills = gaps.filter(g => g.status === "missing").map(g => g.name);
  const needsWorkSkills = gaps.filter(g => g.status === "needs work").map(g => g.name);
  
  const matchedMentors = mentors.map((mentor) => {
    // 1. Calculate skill overlap
    // How many of the student's gaps (missing + needs work) does this mentor have?
    const gapsCovered = mentor.skills.filter(skill => 
      missingSkills.includes(skill) || needsWorkSkills.includes(skill)
    );
    const totalGaps = missingSkills.length + needsWorkSkills.length;
    
    let skillScore = 0.5; // Base score
    if (totalGaps > 0) {
      skillScore = gapsCovered.length / totalGaps;
    }

    // 2. Profile role similarity
    const roleNormalized = mentor.role.toLowerCase();
    const targetNormalized = targetRole.toLowerCase();
    let roleScore = 0.6; // Base

    if (roleNormalized.includes(targetNormalized) || targetNormalized.includes(roleNormalized.split(" ")[1] || "")) {
      roleScore = 0.95;
    } else if (roleNormalized.split(" ").some(word => word.length > 2 && targetNormalized.includes(word))) {
      roleScore = 0.8;
    }

    // Weighted Score
    const rawScore = (skillScore * 0.6) + (roleScore * 0.4);
    // Add small random variation based on rating to look realistic, capped at 98%
    const finalPercentage = Math.min(98, Math.round((rawScore * 30 + 68) + (mentor.rating - 4.5) * 5));

    // 3. Generate customized explanation (GenZ conversational tone)
    let explanation = "";
    if (mentor.id === "mentor_1" && (targetRole.toLowerCase().includes("design") || targetRole.toLowerCase().includes("product"))) {
      explanation = `Figma design system queen who went self-taught ➔ Figma leader. She'll get you past your Figma and Design System blocker.`;
    } else if (mentor.id === "mentor_2" && (targetRole.toLowerCase().includes("front") || targetRole.toLowerCase().includes("web"))) {
      explanation = `Literally builds frontend tooling at Vercel. Devon knows exactly how to fast-track your React ➔ Next.js scaling journey.`;
    } else if (mentor.id === "mentor_3" && (targetRole.toLowerCase().includes("data") || targetRole.toLowerCase().includes("machine") || targetRole.toLowerCase().includes("ml"))) {
      explanation = `Math major who skipped grad school straight to applied ML at Stripe. Zoe is the GOAT for breaking into Python and predictive modeling.`;
    } else if (mentor.id === "mentor_4" && (targetRole.toLowerCase().includes("product manager") || targetRole.toLowerCase().includes("pm"))) {
      explanation = `Bootcamp-to-Spotify Product Lead. Marcus can teach you how to think in roadmaps and nail the tech PM interview loop.`;
    } else if (mentor.id === "mentor_5" && (targetRole.toLowerCase().includes("full") || targetRole.toLowerCase().includes("back"))) {
      explanation = `Self-taught SaaS founder turned Linear engineer. Kyler's got the cheat codes for structuring API architectures and Node.js.`;
    } else {
      // Fallback personalized generator
      const matchWord = mentor.skills.find(s => missingSkills.includes(s)) || mentor.skills[0];
      explanation = `High-impact specialist at ${mentor.company} who can fast-track your ${matchWord} learning curve and share real-world project feedback.`;
    }

    return {
      ...mentor,
      matchPercentage: finalPercentage,
      explanation,
      gapsCovered: gapsCovered
    };
  });

  // Sort by highest match score, return top 3
  return matchedMentors.sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 3);
};

/**
 * Maps gaps to matching mentors, ranked by priority (Missing > Needs Work).
 */
export const prioritizeGapsAndMap = (gaps, mentors) => {
  // Sort gaps: High priority (missing) first, then Medium (needs work)
  const sortedGaps = [...gaps].sort((a, b) => {
    const scoreMap = { "missing": 3, "needs work": 2, "mastered": 1 };
    
    // Primary sort: Status
    if (scoreMap[a.status] !== scoreMap[b.status]) {
      return scoreMap[b.status] - scoreMap[a.status];
    }
    // Secondary sort: Role significance (High > Medium > Low)
    const priorityMap = { "High": 3, "Medium": 2, "Low": 1 };
    return priorityMap[b.priority] - priorityMap[a.priority];
  });

  // Filter out mastered skills (we only care about gaps)
  const activeGaps = sortedGaps.filter(g => g.status !== "mastered");

  // Map each gap to the mentor who has it as their core skill
  return activeGaps.map((gap) => {
    // Find mentors who master this skill
    const coveringMentors = mentors.filter(m => m.skills.includes(gap.name));
    
    // Sort mentors by experience/rating for this skill
    const primaryMentor = coveringMentors[0] || null;

    return {
      skillName: gap.name,
      status: gap.status,
      priority: gap.status === "missing" ? "Critical Block" : "Needs Polish",
      mappedMentor: primaryMentor ? {
        id: primaryMentor.id,
        name: primaryMentor.name,
        role: primaryMentor.role,
        company: primaryMentor.company,
        gradient: primaryMentor.gradient
      } : null
    };
  });
};

/**
 * Drafts an AI suggested first-session agenda for the mentor-side dashboard
 */
export const generateMentorAgenda = (studentProfile, gaps, mentor) => {
  const missing = gaps.filter(g => g.status === "missing").map(g => g.name);
  const needsWork = gaps.filter(g => g.status === "needs work").map(g => g.name);
  
  const mainGap = missing[0] || needsWork[0] || "Target Role Basics";
  const secondGap = missing[1] || needsWork[1] || null;
  
  const goals = studentProfile.goals || "Level up career skills";
  const learningStyle = studentProfile.learningStyle || "hands-on project building";

  return {
    title: `Kickoff Session: ${studentProfile.name} ➔ ${studentProfile.targetRole}`,
    focusGap: mainGap,
    duration: "45 mins",
    agendaItems: [
      {
        time: "00:00 - 00:10",
        task: "Icebreaker & Story Align",
        details: `Discuss ${studentProfile.name}'s goal of: "${goals}". Share your non-traditional journey to tech.`
      },
      {
        time: "00:10 - 00:25",
        task: `Deep Dive into ${mainGap}`,
        details: `Assess the primary skill blocker. Since they prefer ${learningStyle}, sketch out a small demo project resolving this gap.`
      },
      ...(secondGap ? [{
        time: "00:25 - 00:35",
        task: `Mini Review: ${secondGap}`,
        details: `High-level conceptual overview and pointing to standard templates/repos to review.`
      }] : []),
      {
        time: "00:35 - 00:45",
        task: "Sprint Action Plan",
        details: `Draft a 2-week learning roadmap with deliverables. Agree on async Slack checkpoints and book the next deep dive.`
      }
    ]
  };
};
