import { CareerProfile, LearnerProfile, Skill, EvidenceRecord } from '../types';

export const CAREER_PROFILES: Record<string, CareerProfile> = {
  "full-stack-dev": {
    id: "full-stack-dev",
    title: "Full Stack Developer",
    category: "Software Engineering",
    description: "Builds modern client-facing applications and scalable server architectures, bridging frontend interfaces and backend databases.",
    difficulty: "Intermediate to Advanced",
    estimatedTimeToJob: "16-24 weeks",
    requiredSkills: [
      { name: "Python", category: "Backend", importance: "Core", targetLevel: 80 },
      { name: "SQL", category: "Database", importance: "Core", targetLevel: 75 },
      { name: "HTML & CSS", category: "Frontend", importance: "Core", targetLevel: 85 },
      { name: "JavaScript", category: "Core Language", importance: "Critical", targetLevel: 85 },
      { name: "React", category: "Frontend", importance: "Critical", targetLevel: 80 },
      { name: "Node.js", category: "Backend", importance: "Critical", targetLevel: 80 },
      { name: "REST APIs", category: "Architecture", importance: "Core", targetLevel: 85 },
      { name: "Git & GitHub", category: "DevOps", importance: "Core", targetLevel: 75 }
    ]
  },
  "backend-dev": {
    id: "backend-dev",
    title: "Backend Engineer",
    category: "Systems & Cloud",
    description: "Designs robust distributed microservices, APIs, database architectures, and caching layers with high security and performance.",
    difficulty: "Advanced",
    estimatedTimeToJob: "18-26 weeks",
    requiredSkills: [
      { name: "Python", category: "Backend", importance: "Critical", targetLevel: 90 },
      { name: "SQL", category: "Database", importance: "Critical", targetLevel: 85 },
      { name: "Flask / FastAPI", category: "Framework", importance: "Critical", targetLevel: 85 },
      { name: "REST APIs & JSON", category: "Architecture", importance: "Critical", targetLevel: 90 },
      { name: "Input Validation & Security", category: "Security", importance: "Critical", targetLevel: 80 }
    ]
  },
  "ai-ml-engineer": {
    id: "ai-ml-engineer",
    title: "AI / Machine Learning Engineer",
    category: "Artificial Intelligence",
    description: "Designs, trains, deploys, and tunes machine learning models, neural networks, and LLM agent pipelines for production.",
    difficulty: "Advanced",
    estimatedTimeToJob: "20-28 weeks",
    requiredSkills: [
      { name: "Python", category: "Language", importance: "Critical", targetLevel: 95 },
      { name: "SQL & Data Wrangling", category: "Data", importance: "Core", targetLevel: 80 },
      { name: "Machine Learning (Scikit-Learn)", category: "AI/ML", importance: "Critical", targetLevel: 85 },
      { name: "Deep Learning (PyTorch)", category: "AI/ML", importance: "Critical", targetLevel: 80 },
      { name: "LLM Orchestration & Prompting", category: "Generative AI", importance: "Core", targetLevel: 85 }
    ]
  },
  "cloud-devops": {
    id: "cloud-devops",
    title: "Cloud & DevOps Specialist",
    category: "Infrastructure",
    description: "Automates CI/CD pipelines, manages Kubernetes clusters, provisions infrastructure as code, and maintains cloud resilience.",
    difficulty: "Advanced",
    estimatedTimeToJob: "18-24 weeks",
    requiredSkills: [
      { name: "Linux Administration", category: "OS", importance: "Critical", targetLevel: 85 },
      { name: "Docker & Containers", category: "Containers", importance: "Critical", targetLevel: 90 },
      { name: "Kubernetes", category: "Orchestration", importance: "Critical", targetLevel: 80 },
      { name: "CI/CD Pipelines (GitHub Actions)", category: "Automation", importance: "Critical", targetLevel: 85 }
    ]
  }
};

export const INITIAL_LEARNER_PROFILE: LearnerProfile = {
  id: "learner-001",
  fullName: "Arun Kumar",
  email: "arun.kumar@university.edu",
  university: "Sri Ramakrishna College of Arts and Science (SRCAS)",
  department: "Computer Science & Engineering",
  yearOfStudy: "3rd Year Undergraduate",
  careerGoal: "full-stack-dev",
  learningPace: "10 hours/week",
  bio: "Passionate computer science student aiming to become a Full Stack Developer. Strong foundation in Python and SQL databases with basic HTML/CSS knowledge."
};

export const INITIAL_SKILLS: Skill[] = [
  { id: "sk-python", name: "Python", category: "Backend", level: 75, status: "Demonstrated", evidenceConfidence: 0.88, source: "Backend Practical Exam" },
  { id: "sk-sql", name: "SQL", category: "Database", level: 70, status: "Demonstrated", evidenceConfidence: 0.82, source: "Database Query Lab" },
  { id: "sk-html", name: "HTML & CSS", category: "Frontend", level: 50, status: "Partially Demonstrated", evidenceConfidence: 0.65, source: "Coursework Quiz" },
  { id: "sk-js", name: "JavaScript", category: "Core Language", level: 0, status: "Missing", evidenceConfidence: 0.0, source: "Unassessed" },
  { id: "sk-react", name: "React", category: "Frontend", level: 0, status: "Missing", evidenceConfidence: 0.0, source: "Unassessed" },
  { id: "sk-node", name: "Node.js", category: "Backend", level: 0, status: "Missing", evidenceConfidence: 0.0, source: "Unassessed" }
];

export const INITIAL_EVIDENCE_RECORDS: EvidenceRecord[] = [
  { id: "ev-01", skill: "Python", task: "Flask CRUD API Route Challenge", date: "2026-11-10", type: "Code Test Suite", score: 85, weight: 0.45, confidence: 0.88, authenticity: "Verified Sandbox" },
  { id: "ev-02", skill: "SQL", task: "Multi-Table Join & Index Query Task", date: "2026-11-08", type: "Practical Lab", score: 78, weight: 0.35, confidence: 0.82, authenticity: "Automated Evaluation" },
  { id: "ev-03", skill: "HTML & CSS", task: "Flexbox & Grid Layout Assessment", date: "2026-11-02", type: "Multiple Choice Quiz", score: 62, weight: 0.20, confidence: 0.65, authenticity: "Proctored Quiz" }
];

