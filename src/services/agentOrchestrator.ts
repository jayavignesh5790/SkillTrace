import { CareerProfile, Skill, AutopsyDiagnosis } from '../types';
import { CAREER_PROFILES } from '../data/mockData';

export interface MultiAgentAnalysisResult {
  career: CareerProfile;
  matchPercentage: number;
  analyzedSkills: Array<{
    name: string;
    category: string;
    importance: string;
    targetLevel: number;
    currentLevel: number;
    status: string;
    gap: number;
    confidence: number;
  }>;
  missingSkills: Skill[];
  demonstratedSkills: Skill[];
  autopsyInsight: AutopsyDiagnosis | null;
  mentorMessage: string;
}

export function runSkillAnalyzer(targetCareerId: string, userSkills: Skill[]): MultiAgentAnalysisResult {
  const career = CAREER_PROFILES[targetCareerId] || CAREER_PROFILES["full-stack-dev"];
  const targetSkills = career.requiredSkills;

  let totalWeight = 0;
  let earnedWeight = 0;

  const analyzedSkills = targetSkills.map(req => {
    const existing = userSkills.find(s => s.name.toLowerCase() === req.name.toLowerCase());
    const currentLevel = existing ? existing.level : 0;
    const confidence = existing ? existing.evidenceConfidence : 0;

    let status = "Missing";
    if (currentLevel >= req.targetLevel) {
      status = "Demonstrated";
    } else if (currentLevel > 0) {
      status = "Partially Demonstrated";
    }

    const weight = req.importance === "Critical" ? 2.0 : 1.0;
    totalWeight += weight * req.targetLevel;
    earnedWeight += weight * currentLevel;

    return {
      name: req.name,
      category: req.category,
      importance: req.importance,
      targetLevel: req.targetLevel,
      currentLevel,
      status,
      gap: Math.max(0, req.targetLevel - currentLevel),
      confidence
    };
  });

  const matchPercentage = Math.round((earnedWeight / totalWeight) * 100);
  const missingSkills = userSkills.filter(s => s.status === "Missing");
  const demonstratedSkills = userSkills.filter(s => s.status === "Demonstrated" || s.status === "Partially Demonstrated");

  const mentorMessage = `Based on your profile, you match ${matchPercentage}% of ${career.title} competencies. We have prioritized foundational gaps so you can progress methodically with verifiable evidence.`;

  return {
    career,
    matchPercentage,
    analyzedSkills,
    missingSkills,
    demonstratedSkills,
    autopsyInsight: null,
    mentorMessage
  };
}

export function runEvaluatorAutopsy(failedTests: Array<{ name: string; message: string }>): AutopsyDiagnosis {
  return {
    detectedProblem: "Asynchronous Request Parsing / Non-blocking Stream Handling",
    rootCauseHypothesis: "Learner confuses synchronous return values with asynchronous Promises/JSON streaming callbacks. Rather than a syntax error, this points to a mental-model gap regarding the non-blocking execution loop.",
    confidenceScore: 0.92,
    evidenceSources: failedTests.map(t => `${t.name}: ${t.message}`),
    targetedFollowUpChallenge: {
      title: "Micro-Challenge: Asynchronous JSON Deserialization",
      instructions: "Fix the Express/Flask route handler to properly await the request body parse stream before sending the 200 response.",
      estimatedMinutes: 10
    }
  };
}

