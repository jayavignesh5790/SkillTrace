import React, { useState } from 'react';
import { 
  Cpu, Target, Map, Microscope, ShieldCheck, Terminal, Network, 
  UserCheck, Sparkles, AlertTriangle, Play, Save, MessageSquare, Bot, Send, Award
} from 'lucide-react';
import { INITIAL_LEARNER_PROFILE, INITIAL_SKILLS, INITIAL_EVIDENCE_RECORDS, CAREER_PROFILES } from './data/mockData';
import { runSkillAnalyzer, runEvaluatorAutopsy } from './services/agentOrchestrator';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'skill-gap' | 'roadmap' | 'autopsy' | 'evidence' | 'backend-lab' | 'agents' | 'profile'>('dashboard');
  const [learnerProfile, setLearnerProfile] = useState(INITIAL_LEARNER_PROFILE);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [evidenceList] = useState(INITIAL_EVIDENCE_RECORDS);
  const [autopsyActive, setAutopsyActive] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    { sender: 'ai', text: "Hello Arun! I'm your dedicated AI Career Mentor. I'm actively monitoring your progress toward Full Stack Developer. Ask me anything!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [agentLogs, setAgentLogs] = useState<Array<{ time: string; agent: string; text: string }>>([
    { time: "11:00:15", agent: "Skill Analyzer", text: "Parsed learner profile for Arun Kumar. Verified: Python (75%), SQL (70%), HTML (50%). Target: Full Stack Developer." },
    { time: "11:00:18", agent: "Skill Analyzer", text: "CRITICAL GAPS IDENTIFIED: JavaScript (Missing), React (Missing), Node.js (Missing). Current job match index: 42%." },
    { time: "11:00:20", agent: "Roadmap Architect", text: "Generated 4-Stage Adaptive Roadmap prioritizing Modern JavaScript ES6+ -> React UI Engineering -> Node/Express Backend." },
    { time: "11:00:22", agent: "AI Mentor", text: "Welcome Arun! Since you already know Python, picking up JavaScript syntax will be rapid. We will leverage your SQL background when learning Node ORMs." }
  ]);

  const analysis = runSkillAnalyzer(learnerProfile.careerGoal, skills);

  const addLog = (agent: string, text: string) => {
    const time = new Date().toLocaleTimeString();
    setAgentLogs(prev => [{ time, agent, text }, ...prev]);
  };

  const handleCareerGoalChange = (newGoal: string) => {
    setLearnerProfile(prev => ({ ...prev, careerGoal: newGoal }));
    const title = CAREER_PROFILES[newGoal]?.title || newGoal;
    addLog("Skill Analyzer", `Learner updated target to: ${title}. Recalculating skill delta...`);
    addLog("Roadmap Architect", `Roadmap dynamically rescheduled for ${title} requirements!`);
    addLog("AI Mentor", `Goal updated! We've adjusted your milestones to match ${title}.`);
  };

  const loadSampleScenario = () => {
    setLearnerProfile(prev => ({ ...prev, careerGoal: 'full-stack-dev' }));
    setSkills(INITIAL_SKILLS);
    addLog("Orchestrator Agent", "Reset to Official Sample Scenario: Full Stack Dev | Current: Python, SQL, HTML | Missing: JS, React, Node.js.");
  };

  const triggerAutopsy = () => {
    setAutopsyActive(true);
    setActiveTab('autopsy');
    addLog("Evaluator & Autopsy", "DIAGNOSIS TRIGGERED: Failed 2 Flask API tests. Root-cause hypothesis formulated with 92% confidence!");
    addLog("AI Mentor", "Injected Micro-Challenge on Asynchronous JSON Deserialization into Stage 1 roadmap.");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      let reply = `I'm analyzing your path toward ${analysis.career.title}. You have demonstrated solid foundations in Python & SQL. Stage 1 will close your JavaScript gap!`;
      const lower = userText.toLowerCase();
      if (lower.includes("why") && lower.includes("node")) {
        reply = "Great question! Learning Node.js allows you to share JavaScript across your React frontend and backend microservices, mastering asynchronous event loops required by 85%+ of full-stack job requisitions.";
      } else if (lower.includes("autopsy") || lower.includes("fail")) {
        reply = "Our Root-Cause Failure Autopsy doesn't just score 0. It diagnoses the conceptual root cause (e.g. sync vs async parsing) and injects targeted confirmation micro-exercises!";
      }
      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      addLog("AI Mentor", `Mentoring Arun: Addressed "${userText.slice(0, 30)}..."`);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#060813] text-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-[#060813]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[2px] shadow-lg">
              <div className="w-full h-full bg-[#060813] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl text-white tracking-wider">SKILL<span className="text-cyan-400">TRACE</span></span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">AGENTIC AI</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">SRCAS Hackathon 3.0 • #BuildTheFuture</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={loadSampleScenario} className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Load Sample Scenario
            </button>
            <button onClick={triggerAutopsy} className="text-xs px-3 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-medium flex items-center">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Test Failure Autopsy
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="border-t border-slate-800/60 bg-[#080d1a] px-4">
          <div className="max-w-7xl mx-auto flex items-center space-x-2 overflow-x-auto py-2 text-xs">
            <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-1.5 rounded font-medium ${activeTab === 'dashboard' ? 'text-cyan-400 bg-cyan-950/80 border border-cyan-800' : 'text-slate-400'}`}>
              Command Dashboard
            </button>
            <button onClick={() => setActiveTab('skill-gap')} className={`px-3 py-1.5 rounded font-medium ${activeTab === 'skill-gap' ? 'text-cyan-400 bg-cyan-950/80 border border-cyan-800' : 'text-slate-400'}`}>
              Skill Gap & Match
            </button>
            <button onClick={() => setActiveTab('roadmap')} className={`px-3 py-1.5 rounded font-medium ${activeTab === 'roadmap' ? 'text-cyan-400 bg-cyan-950/80 border border-cyan-800' : 'text-slate-400'}`}>
              Adaptive Roadmap
            </button>
            <button onClick={() => setActiveTab('autopsy')} className={`px-3 py-1.5 rounded font-medium ${activeTab === 'autopsy' ? 'text-rose-400 bg-rose-950/80 border border-rose-800' : 'text-slate-400'}`}>
              Root-Cause Autopsy
            </button>
            <button onClick={() => setActiveTab('evidence')} className={`px-3 py-1.5 rounded font-medium ${activeTab === 'evidence' ? 'text-purple-400 bg-purple-950/80 border border-purple-800' : 'text-slate-400'}`}>
              Evidence Matrix
            </button>
            <button onClick={() => setActiveTab('backend-lab')} className={`px-3 py-1.5 rounded font-medium ${activeTab === 'backend-lab' ? 'text-emerald-400 bg-emerald-950/80 border border-emerald-800' : 'text-slate-400'}`}>
              Backend API Lab
            </button>
            <button onClick={() => setActiveTab('agents')} className={`px-3 py-1.5 rounded font-medium ${activeTab === 'agents' ? 'text-amber-400 bg-amber-950/80 border border-amber-800' : 'text-slate-400'}`}>
              Agent Swarm
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-6 flex-1 w-full space-y-6">
        {/* Banner with Target Role Switcher */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-cyan-400">Personalized Learning & Career Architecture</div>
            <h1 className="text-2xl font-bold text-white mt-1">Learner: Arun Kumar ({analysis.career.title})</h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Dynamically maps current abilities (Python, SQL, HTML) against career demands. Diagnoses gaps via Root-Cause Failure Autopsy and proves backend skills with automated testing.
            </p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
            <label className="text-slate-400 font-mono block mb-1">Target Career:</label>
            <select 
              value={learnerProfile.careerGoal} 
              onChange={e => handleCareerGoalChange(e.target.value)}
              className="bg-[#060813] border border-cyan-500/50 text-cyan-300 rounded px-2.5 py-1.5 outline-none font-medium"
            >
              <option value="full-stack-dev">Full Stack Developer</option>
              <option value="backend-dev">Backend Engineer</option>
              <option value="ai-ml-engineer">AI / Machine Learning Engineer</option>
              <option value="cloud-devops">Cloud & DevOps Specialist</option>
            </select>
          </div>
        </div>

        {/* Dynamic Views */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-slate-400 font-mono">CAREER MATCH INDEX</div>
                <div className="text-3xl font-black text-cyan-400 mt-1">{analysis.matchPercentage}%</div>
                <div className="text-[11px] text-slate-400 mt-2 font-mono">Role: {analysis.career.title}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-slate-400 font-mono">VERIFIED DEMONSTRATED</div>
                <div className="text-3xl font-black text-emerald-400 mt-1">{analysis.demonstratedSkills.length}</div>
                <div className="text-[11px] text-slate-400 mt-2 font-mono">Python, SQL, HTML</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-slate-400 font-mono">CRITICAL GAPS</div>
                <div className="text-3xl font-black text-rose-400 mt-1">{analysis.missingSkills.length}</div>
                <div className="text-[11px] text-slate-400 mt-2 font-mono">JavaScript, React, Node.js</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                <div className="text-slate-400 font-mono">ESTIMATED TIMELINE</div>
                <div className="text-3xl font-black text-purple-400 mt-1">{analysis.career.estimatedTimeToJob}</div>
                <div className="text-[11px] text-slate-400 mt-2 font-mono">At {learnerProfile.learningPace}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center">
                  <Target className="w-4 h-4 text-cyan-400 mr-2" /> Current vs Target Competencies
                </h3>
                <div className="space-y-3">
                  {analysis.analyzedSkills.map(s => (
                    <div key={s.name} className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-white font-medium">{s.name}</span>
                        <span className="font-mono text-slate-400">{s.currentLevel}% / {s.targetLevel}% Target</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${s.currentLevel >= s.targetLevel ? 'bg-emerald-500' : s.currentLevel > 0 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                          style={{ width: `${s.currentLevel}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center">
                    <Bot className="w-4 h-4 text-cyan-400 mr-2" /> AI Mentor Guidance
                  </h3>
                  <div className="p-3 bg-slate-950 rounded-lg border border-cyan-500/20 text-xs text-slate-300 mt-3 leading-relaxed">
                    {analysis.mentorMessage}
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">Recent Agent Collaboration Stream:</span>
                  <div className="space-y-1 font-mono text-[11px]">
                    {agentLogs.slice(0, 3).map((l, i) => (
                      <div key={i} className="p-2 bg-slate-950 rounded text-slate-300">
                        <span className="text-cyan-400 font-bold">[{l.agent}]</span> {l.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'autopsy' && (
          <div className="p-6 rounded-xl bg-slate-900/70 border border-rose-500/30 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Microscope className="w-5 h-5 text-rose-400" />
                <span className="font-bold text-white text-base">Innovation 1: Root-Cause Failure Autopsy</span>
              </div>
              <button onClick={triggerAutopsy} className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded font-medium flex items-center">
                <Play className="w-3.5 h-3.5 mr-1" /> Re-Run Error Diagnosis
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-lg border border-rose-950 space-y-2 font-mono">
                <div className="text-rose-400 font-bold">Observed Test Failures (Flask POST Handler):</div>
                <div className="text-slate-400">1. test_create_record_json_parsing: 400 Bad Request (Payload decoding failed)</div>
                <div className="text-slate-400">2. test_update_record_status: KeyError ('item_status' missing from body)</div>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-cyan-950 space-y-2">
                <div className="text-cyan-400 font-bold">AI Diagnosis Hypothesis (92% Confidence):</div>
                <p className="text-slate-300">
                  Learner confuses synchronous return values with asynchronous Promises/JSON streaming callbacks. Rather than a syntax error, this points to a mental-model gap regarding the non-blocking execution loop.
                </p>
                <div className="text-emerald-400 font-mono text-[11px] pt-1">
                  ✓ Injected targeted micro-challenge into Stage 1 roadmap.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating AI Mentor Chat */}
      <div className="fixed bottom-4 right-4 z-50">
        {chatOpen && (
          <div className="w-80 h-96 bg-slate-950 border border-cyan-500/50 rounded-2xl shadow-xl flex flex-col mb-3 overflow-hidden text-xs">
            <div className="p-3 bg-slate-900 border-b border-slate-800 flex justify-between items-center text-white font-bold">
              <span className="flex items-center"><Bot className="w-4 h-4 text-cyan-400 mr-2" /> AI Career Mentor</span>
              <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto space-y-2">
              {chatMessages.map((m, i) => (
                <div key={i} className={`p-2 rounded-lg max-w-[85%] ${m.sender === 'user' ? 'bg-cyan-600 text-white ml-auto' : 'bg-slate-900 text-slate-200'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-800 flex gap-2">
              <input 
                type="text" 
                value={chatInput} 
                onChange={e => setChatInput(e.target.value)} 
                placeholder="Ask your mentor..."
                className="flex-1 bg-slate-900 text-white rounded px-2 py-1 outline-none border border-slate-700" 
              />
              <button type="submit" className="p-1.5 bg-cyan-600 text-white rounded"><Send className="w-3.5 h-3.5" /></button>
            </form>
          </div>
        )}
        <button onClick={() => setChatOpen(!chatOpen)} className="px-4 py-2.5 rounded-full bg-cyan-600 text-white font-medium text-xs flex items-center space-x-2 shadow-lg hover:bg-cyan-500">
          <MessageSquare className="w-4 h-4" />
          <span>AI Mentor</span>
        </button>
      </div>
    </div>
  );
};

