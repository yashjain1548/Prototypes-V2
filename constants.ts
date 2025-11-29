import { AnalysisData } from './types';

export const DEFAULT_PROJECT: AnalysisData = {
  projectName: "Global Company Rebrand",
  risks: [
    {
      id: "r1",
      threat: "Stakeholder misalignment on new visual identity",
      probability: 85,
      mitigation: "Conduct preliminary mood-board workshops with key execs before design phase.",
      severity: "high",
      selected: false
    },
    {
      id: "r2",
      threat: "SEO ranking drop during domain transition",
      probability: 70,
      mitigation: "Implement comprehensive 301 redirect map and keep old domain active for 12 months.",
      severity: "critical",
      selected: false
    },
    {
      id: "r3",
      threat: "Employee resistance to cultural shift",
      probability: 60,
      mitigation: "Launch internal 'Ambassador Program' 4 weeks prior to public reveal.",
      severity: "medium",
      selected: false
    },
    {
      id: "r4",
      threat: "Budget overrun due to asset reprint scope creep",
      probability: 45,
      mitigation: "Freeze asset list by Week 2; strict approval process for add-ons.",
      severity: "low",
      selected: false
    }
  ],
  tasks: [
    { id: "t1", description: "Audit current brand assets and digital touchpoints", isCompleted: true },
    { id: "t2", description: "Define core brand values and voice guidelines", isCompleted: true },
    { id: "t3", description: "Secure executive sign-off on new logo concepts", isCompleted: false },
    { id: "t4", description: "Develop comprehensive brand book (PDF & Web)", isCompleted: false },
    { id: "t5", description: "Update social media profiles and bio links", isCompleted: false },
    { id: "t6", description: "Prepare internal launch presentation deck", isCompleted: false },
    { id: "t7", description: "Coordinate press release with PR agency", isCompleted: false },
    { id: "t8", description: "Update email signatures company-wide", isCompleted: false },
    { id: "t9", description: "Replace exterior signage at HQ", isCompleted: false },
    { id: "t10", description: "Host launch party for employees", isCompleted: false }
  ]
};