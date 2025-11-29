import React, { useState } from 'react';
import { Shield, List, ArrowLeft, Terminal, LayoutGrid, FileText } from 'lucide-react';
import { AnalysisData, TabState, ViewState } from './types';
import { DEFAULT_PROJECT } from './constants';
import { analyzeProject, generateManifesto } from './services/geminiService';
import InputSection from './components/InputSection';
import LoadingScreen from './components/LoadingScreen';
import RiskView from './components/RiskView';
import TaskView from './components/TaskView';
import ManifestoView from './components/ManifestoView';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>('input');
  const [activeTab, setActiveTab] = useState<TabState>('pre-mortem');
  const [data, setData] = useState<AnalysisData>(DEFAULT_PROJECT);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingManifesto, setIsGeneratingManifesto] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (input: string) => {
    setViewState('processing');
    setIsProcessing(true);
    setError(null);

    try {
      // Minimum 2 second delay for the "experience"
      const [result] = await Promise.all([
        analyzeProject(input),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]);
      
      setData(result);
      setViewState('results');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during mission analysis.");
      setViewState('input');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleTask = (taskId: string) => {
    setData(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => 
        t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
      )
    }));
  };

  const handleToggleRiskSelection = (riskId: string) => {
    setData(prev => ({
      ...prev,
      risks: prev.risks.map(r =>
        r.id === riskId ? { ...r, selected: !r.selected } : r
      )
    }));
  };

  const handleGenerateManifesto = async () => {
    const selectedMitigations = data.risks
      .filter(r => r.selected)
      .map(r => r.mitigation);
      
    if (selectedMitigations.length === 0) return;

    setIsGeneratingManifesto(true);
    try {
      const manifesto = await generateManifesto(data.projectName, selectedMitigations);
      setData(prev => ({ ...prev, manifesto }));
      setActiveTab('manifesto');
    } catch (err) {
      console.error("Manifesto error", err);
      // Optional: Add toast notification here
    } finally {
      setIsGeneratingManifesto(false);
    }
  };

  const handleReset = () => {
    setViewState('input');
    setData(DEFAULT_PROJECT);
    setActiveTab('pre-mortem');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20"></div>

      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded flex items-center justify-center">
               <Terminal className="w-5 h-5 text-emerald-500" />
             </div>
             <span className="font-mono font-bold tracking-tight text-slate-100">
               PROJECT<span className="text-emerald-500">LAUNCHER</span>
             </span>
          </div>

          {viewState === 'results' && (
             <button 
               onClick={handleReset}
               className="text-xs font-mono text-slate-500 hover:text-emerald-400 flex items-center gap-2 transition-colors"
             >
               <ArrowLeft className="w-3 h-3" />
               NEW OPERATION
             </button>
          )}
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {viewState === 'input' && (
           <InputSection 
             onAnalyze={handleAnalyze} 
             isProcessing={isProcessing} 
             errorMessage={error}
           />
        )}

        {viewState === 'processing' && (
          <LoadingScreen />
        )}

        {viewState === 'results' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
             
             {/* Project Title Header */}
             <div className="mb-10 pb-6 border-b border-slate-800">
               <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Target Objective</h2>
               <h1 className="text-3xl font-bold text-white max-w-4xl leading-tight">
                 {data.projectName}
               </h1>
             </div>

             {/* Tab Navigation */}
             <div className="flex flex-col md:flex-row gap-8">
               
               {/* Sidebar / Tabs */}
               <div className="md:w-64 flex-shrink-0 space-y-2">
                 <button
                   onClick={() => setActiveTab('pre-mortem')}
                   className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 text-left ${
                     activeTab === 'pre-mortem'
                       ? 'bg-red-500/10 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                       : 'bg-slate-900/50 border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                   }`}
                 >
                   <Shield className="w-5 h-5" />
                   <div>
                     <div className="font-mono text-xs font-bold uppercase tracking-wider">Tab A</div>
                     <div className="font-semibold text-sm">Pre-Mortem</div>
                   </div>
                 </button>

                 <button
                   onClick={() => setActiveTab('atomizer')}
                   className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 text-left ${
                     activeTab === 'atomizer'
                       ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                       : 'bg-slate-900/50 border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                   }`}
                 >
                   <List className="w-5 h-5" />
                   <div>
                     <div className="font-mono text-xs font-bold uppercase tracking-wider">Tab B</div>
                     <div className="font-semibold text-sm">Atomizer</div>
                   </div>
                 </button>

                 {data.manifesto && (
                   <button
                     onClick={() => setActiveTab('manifesto')}
                     className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 text-left animate-in fade-in slide-in-from-left-2 ${
                       activeTab === 'manifesto'
                         ? 'bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                         : 'bg-slate-900/50 border-transparent text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                     }`}
                   >
                     <FileText className="w-5 h-5" />
                     <div>
                       <div className="font-mono text-xs font-bold uppercase tracking-wider">Tab C</div>
                       <div className="font-semibold text-sm">Manifesto</div>
                     </div>
                   </button>
                 )}
                 
                 {/* Quick summary box */}
                 <div className="mt-8 p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                    <div className="flex items-center gap-2 mb-2 text-slate-400">
                      <LayoutGrid className="w-4 h-4" />
                      <span className="text-xs font-mono uppercase">Mission Stats</span>
                    </div>
                    <div className="space-y-2 text-sm text-slate-500">
                       <div className="flex justify-between">
                         <span>Risks Identified:</span>
                         <span className="text-slate-300">{data.risks.length}</span>
                       </div>
                       <div className="flex justify-between">
                         <span>Pending Actions:</span>
                         <span className="text-slate-300">
                           {data.tasks.filter(t => !t.isCompleted).length}
                         </span>
                       </div>
                    </div>
                 </div>
               </div>

               {/* Main Content Area */}
               <div className="flex-1 min-h-[500px]">
                 {activeTab === 'pre-mortem' && (
                   <RiskView 
                     risks={data.risks} 
                     onToggleSelection={handleToggleRiskSelection}
                     onGenerateManifesto={handleGenerateManifesto}
                     isGeneratingManifesto={isGeneratingManifesto}
                   />
                 )}
                 {activeTab === 'atomizer' && (
                   <TaskView tasks={data.tasks} onToggleTask={handleToggleTask} />
                 )}
                 {activeTab === 'manifesto' && data.manifesto && (
                   <ManifestoView manifesto={data.manifesto} />
                 )}
               </div>

             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;