import React, { useState } from 'react';
import { Rocket, Sparkles, AlertCircle } from 'lucide-react';

interface InputSectionProps {
  onAnalyze: (input: string) => void;
  isProcessing: boolean;
  errorMessage?: string | null;
}

const InputSection: React.FC<InputSectionProps> = ({ onAnalyze, isProcessing, errorMessage }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAnalyze(input);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-sm font-mono text-emerald-400 tracking-widest uppercase">
          New Mission Parameter
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
          Initialize Project Vector
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 to-blue-500/30 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Brief the mission (e.g., Launch a B2B podcast in Q4 aimed at CTOs)..."
            className="w-full h-40 bg-slate-900/90 text-slate-100 p-6 placeholder-slate-500 focus:outline-none focus:ring-0 resize-none font-sans text-lg leading-relaxed"
            disabled={isProcessing}
          />
          
          <div className="bg-slate-800/50 p-4 border-t border-slate-700 flex justify-between items-center backdrop-blur-sm">
            <span className="text-xs font-mono text-slate-500 flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              AI ASSISTED PROTOCOL
            </span>
            <button
              type="submit"
              disabled={!input.trim() || isProcessing}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-lg font-mono text-sm tracking-wider font-bold uppercase transition-all duration-300
                ${input.trim() && !isProcessing
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transform hover:-translate-y-0.5' 
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'}
              `}
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"/>
                  Initializing...
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  Initialize Analysis
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {errorMessage && (
        <div className="animate-in fade-in slide-in-from-top-2 p-4 rounded-lg bg-red-950/30 border border-red-500/30 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-200">
            <p className="font-bold font-mono text-xs uppercase mb-1 text-red-400">Analysis Error</p>
            {errorMessage}
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 text-center mt-8 opacity-60">
        <div className="border border-slate-800 bg-slate-900/50 p-3 rounded-lg">
          <div className="text-xs font-mono text-slate-500 mb-1">MODULE A</div>
          <div className="text-sm font-semibold text-slate-300">Risk Detection</div>
        </div>
        <div className="border border-slate-800 bg-slate-900/50 p-3 rounded-lg">
          <div className="text-xs font-mono text-slate-500 mb-1">MODULE B</div>
          <div className="text-sm font-semibold text-slate-300">Step Atomizer</div>
        </div>
        <div className="border border-slate-800 bg-slate-900/50 p-3 rounded-lg">
          <div className="text-xs font-mono text-slate-500 mb-1">STATUS</div>
          <div className="text-sm font-semibold text-emerald-400">Ready</div>
        </div>
      </div>
    </div>
  );
};

export default InputSection;