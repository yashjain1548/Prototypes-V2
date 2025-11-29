export type Severity = 'critical' | 'high' | 'medium' | 'low';

export interface Risk {
  id: string;
  threat: string;
  probability: number;
  mitigation: string;
  severity: Severity;
  selected?: boolean; // User has chosen to implement this mitigation
}

export interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
}

export interface AnalysisData {
  projectName: string;
  risks: Risk[];
  tasks: Task[];
  manifesto?: string; // The generated strategic manifesto
  logoUrl?: string; // The generated mission patch URL
}

export type ViewState = 'input' | 'processing' | 'results';
export type TabState = 'pre-mortem' | 'atomizer' | 'manifesto';