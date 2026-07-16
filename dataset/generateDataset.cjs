const fs = require('fs');
const path = require('path');

const firstNames = [
  "Liam", "Olivia", "Noah", "Emma", "Oliver", "Ava", "Elijah", "Charlotte", "William", "Sophia",
  "James", "Amelia", "Benjamin", "Isabella", "Lucas", "Mia", "Henry", "Evelyn", "Alexander", "Harper",
  "Mason", "Camila", "Michael", "Gianna", "Ethan", "Abigail", "Daniel", "Luna", "Jacob", "Ella",
  "Logan", "Elizabeth", "Jackson", "Sofia", "Levi", "Avery", "Sebastian", "Scarlett", "Mateo", "Emily",
  "Jack", "Aria", "Owen", "Penelope", "Theodore", "Chloe", "Aiden", "Layla", "Samuel", "Mila",
  "Joseph", "Nora", "John", "Hazel", "David", "Madison", "Wyatt", "Ellie", "Carter", "Lily",
  "Julian", "Nova", "Luke", "Isla", "Grayson", "Grace", "Isaac", "Violet", "Jayden", "Aurora",
  "Dylan", "Zoey", "Griffin", "Stella", "Andrew", "Emilia", "Lincoln", "Everly", "Joshua", "Maya"
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
  "Gomez", "Phillips", "Evans", "Turner", "Diaz", "Parker", "Cruz", "Edwards", "Collins", "Reyes",
  "Stewart", "Morris", "Morales", "Murphy", "Cook", "Rogers", "Gutierrez", "Ortiz", "Morgan", "Cooper",
  "Peterson", "Bailey", "Reed", "Kelly", "Howard", "Ramos", "Kim", "Cox", "Ward", "Richardson"
];

const companies = ["Google", "Meta", "Netflix", "Airbnb", "Stripe", "Vercel", "Microsoft", "Uber", "Apple", "Amazon"];

const roles = [
  { name: "Frontend Engineer", skills: ["React", "Next.js", "TypeScript", "JavaScript", "CSS/Tailwind"] },
  { name: "Product Designer", skills: ["Figma", "UI/UX Design", "Design Systems", "User Research", "Prototyping"] },
  { name: "Data Scientist", skills: ["Python", "Pandas", "Machine Learning", "Data Visualization", "SQL"] },
  { name: "Backend Architect", skills: ["Node.js", "System Design", "SQL", "Docker", "API Integration"] }
];

const experienceLevels = ["Beginner", "Intermediate", "Senior", "Lead", "Staff"];
const learningStyles = ["hands-on project building", "deep-dive theory", "pair programming", "interactive code reviews"];
const accentColors = ["#84CC16", "#6366F1", "#EF4444", "#3B82F6", "#F59E0B", "#10B981", "#EC4899", "#8B5CF6"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const times = ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSubarray(arr, min, max) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  return shuffled.slice(0, count);
}

// Generate Mentors (150)
const mentors = [];
for (let i = 1; i <= 150; i++) {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const name = `${firstName} ${lastName}`;
  const company = getRandomElement(companies);
  const roleObj = getRandomElement(roles);
  const rating = (4.5 + Math.random() * 0.5).toFixed(1);
  const sessionsCount = Math.floor(Math.random() * 80) + 10;
  
  // Mentor slots
  const availability = getRandomSubarray(days, 2, 4).map(d => `${d} ${getRandomElement(times)}`);

  mentors.push({
    id: `mentor_${i}`,
    name,
    role: `${getRandomElement(["Senior", "Lead", "Staff", "Principal"])} ${roleObj.name}`,
    company,
    bio: `Passionate builder helping developers speedrun their skill gaps at ${company}. Ex-industry veteran.`,
    rating: parseFloat(rating),
    sessionsCount,
    skills: roleObj.skills,
    gapsHandled: getRandomSubarray(roleObj.skills, 3, roleObj.skills.length),
    accentColor: getRandomElement(accentColors),
    availability
  });
}

// Generate Learners (150)
const learners = [];
for (let i = 1; i <= 150; i++) {
  const firstName = getRandomElement(firstNames);
  const lastName = getRandomElement(lastNames);
  const name = `${firstName} ${lastName}`;
  const roleObj = getRandomElement(roles);
  
  // Custom gaps
  const gaps = roleObj.skills.map(s => {
    const status = getRandomElement(["missing", "needs work", "mastered"]);
    const priority = getRandomElement(["High", "Medium", "Low"]);
    return { name: s, status, priority };
  });

  learners.push({
    id: `learner_${i}`,
    name,
    targetRole: roleObj.name,
    experience: getRandomElement(["Beginner", "Intermediate"]),
    goals: `Transition to a full-time ${roleObj.name} and build custom products.`,
    learningStyle: getRandomElement(learningStyles),
    gaps
  });
}

const combinedDataset = {
  totalCount: mentors.length + learners.length,
  mentorCount: mentors.length,
  learnerCount: learners.length,
  mentors,
  learners
};

// Create directories if not exist
const datasetDir = path.join(__dirname, '..', 'dataset');
if (!fs.existsSync(datasetDir)) {
  fs.mkdirSync(datasetDir, { recursive: true });
}

// Write JSON files
fs.writeFileSync(path.join(datasetDir, 'mentors.json'), JSON.stringify(mentors, null, 2));
fs.writeFileSync(path.join(datasetDir, 'learners.json'), JSON.stringify(learners, null, 2));
fs.writeFileSync(path.join(datasetDir, 'combined_dataset.json'), JSON.stringify(combinedDataset, null, 2));

// Export as ES6 JS files as well
const jsMentorsContent = `export const mockMentors = ${JSON.stringify(mentors, null, 2)};`;
const jsLearnersContent = `export const mockLearners = ${JSON.stringify(learners, null, 2)};`;
fs.writeFileSync(path.join(datasetDir, 'mentors.js'), jsMentorsContent);
fs.writeFileSync(path.join(datasetDir, 'learners.js'), jsLearnersContent);

// Copy to source folder for application use!
const srcDataDir = path.join(__dirname, '..', 'src', 'data');
fs.writeFileSync(path.join(srcDataDir, 'mockMentors.js'), jsMentorsContent);

console.log("Dataset generated successfully inside dataset/ directory and synced with application!");
