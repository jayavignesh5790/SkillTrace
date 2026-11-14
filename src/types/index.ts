export type SkillImportance = 'Critical' | 'Core' | 'Elective';
export type SkillStatus = 'Demonstrated' | 'Partially Demonstrated' | 'Missing';

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 0 to 100
  status: SkillStatus;
  evidenceConfidence: number; // 0.0 to 1.0
  source?: string;
}

export interface CareerRequirement {
  name: string;
  category: string;
  importance: SkillImportance;
  targetLevel: number;
}

export interface CareerProfile {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: string;
  estimatedTimeToJob: string;
  requiredSkills: CareerRequirement[];
}

export interface LearnerProfile {
  id: string;
  fullName: string;
  email: string;
  university: string;
  department: string;
  yearOfStudy: string;
  careerGoal: string;
  learningPace: string;
  bio: string;
}

export interface EvidenceRecord {
  id: string;
  skill: string;
  task: string;
  date: string;
  type: string;
  score: number;
  weight: number;
  confidence: number;
  authenticity: string;
}

export interface AutopsyDiagnosis {
  detectedProblem: string;
  rootCauseHypothesis: string;
  confidenceScore: number;
  evidenceSources: string[];
  targetedFollowUpChallenge: {
    title: string;
    instructions: string;
    estimatedMinutes: number;
  };
}

export interface AgentLog {
  timestamp: string;
  agent: string;
  message: string;
}

