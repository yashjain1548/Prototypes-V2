import React from 'react';
import { AlertTriangle, ShieldAlert, AlertOctagon, AlertCircle, Info, ArrowRight, Sparkles } from 'lucide-react';
import { Risk, Severity } from '../types';

interface RiskViewProps {
  risks: Risk[];
  onToggleSelection: (riskId: string) => void;
  onGenerateManifesto: () => void;
  isGeneratingManifesto: boolean;
}

const severityConfig: Record<Severity, { color: string; border: string; bg: string; icon: React.ElementType; label: string }> = {
  critical: { 
    color: 'text-rose-500', 
    border: 'border-rose-500', 
    bg: 'bg-rose-500/10', 
    icon: AlertOctagon,
    label: 'CRITICAL'
  },
  high: { 
    color: 'text-orange-500', 
    border: 'border-orange-500', 
    bg: 'bg-orange-500/10', 
    icon: AlertTriangle,
    label: 'HIGH'
  },
  medium: { 
    color: 'text-amber-400', 
    border: 'border-amber-400', 
    bg: 'bg-amber-400/10', 
    icon: AlertCircle,
    label: 'MEDIUM'
  },
  low: { 
    color: 'text-blue-400', 
    border: 'border-blue-400', 
    bg: 'bg-blue-400/10', 
    icon: Info,
    label: 'LOW'
  }
};

const RiskView: React.FC<RiskViewProps> = ({ risks, onToggleSelection, onGenerateManifesto, isGeneratingManifesto }) => {
  const selectedCount = risks.filter(r => r.selected).length;

  return (
    <div className="space-y-4 animate-in slide-in-from-right-4 duration-500 pb-20 md:pb-0">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-slate-400" />
          <h3 className="font-mono text-sm text-slate-400 uppercase tracking-wider">
            Threat Assessment Logs
          </h3>
        </div>
        <div className="text-xs font-mono text-slate-500">
          SELECT MITIGATIONS TO UPDATE PLAN
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {risks.map((risk, index) => {
          const style = severityConfig[risk.severity] || severityConfig.medium;
          const Icon = style.icon;
          const isSelected = risk.selected;

          return (
            <div 
              key={risk.id}
              className={`
                group relative backdrop-blur-md border rounded-lg p-5 transition-all duration-300 overflow-hidden
                ${isSelected 
                  ? 'bg-slate-900/95 border-emerald-500 ring-1 ring-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]' 
                  : `bg-slate-900/80 border-slate-800 hover:${style.border}`
                }
              `}
            >
              {/* Numbering Watermark */}
              <div className="absolute -top-4 -right-2 text-[80px] font-mono font-bold text-slate-800/20 select-none pointer-events-none">
                #{String(index + 1).padStart(2, '0')}
              </div>

              {/* Ambient Glow on Hover */}
              <div className={`absolute inset-0 ${style.bg} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>

              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-2 rounded-md border ${style.border} ${style.bg} ${style.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-right">
                   <div className={`text-2xl font-bold font-mono ${style.color} tabular-nums`}>
                     {risk.probability}%
                   </div>
                   <div className="flex items-center justify-end gap-2 mt-1">
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${style.border} ${style.color} opacity-80 uppercase`}>
                        {style.label}
                      </span>
                   </div>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-slate-200 mb-3 leading-snug relative z-10 pr-12">
                <span className="font-mono text-slate-500 mr-2">#{index + 1}</span>
                {risk.threat}
              </h4>

              <div className={`
                p-3 rounded border relative z-10 mb-4 transition-colors duration-300
                ${isSelected ? 'bg-emerald-950/30 border-emerald-500/30' : 'bg-slate-950/50 border-slate-800'}
              `}>
                <span className={`block text-[10px] font-mono uppercase mb-1 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`}>
                  Suggested Mitigation
                </span>
                <p className={`text-sm leading-relaxed ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {risk.mitigation}
                </p>
              </div>

              {/* Selection Toggle */}
              <div className="relative z-10 border-t border-slate-800/50 pt-3 flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer group/label">
                  <div className={`
                    w-5 h-5 rounded border flex items-center justify-center transition-all duration-300
                    ${isSelected 
                      ? 'bg-emerald-500 border-emerald-500 scale-110 shadow-[0_0_10px_rgba(16,185,129,0.4)]' 
                      : 'border-slate-600 bg-slate-900 group-hover/label:border-emerald-400'
                    }
                  `}>
                    {isSelected && <Sparkles className="w-3 h-3 text-slate-900" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={!!isSelected}
                    onChange={() => onToggleSelection(risk.id)}
                  />
                  <span className={`
                    text-xs font-mono font-bold uppercase tracking-wide transition-colors 
                    ${isSelected ? 'text-emerald-400 shadow-emerald-500/20' : 'text-slate-500 group-hover/label:text-slate-300'}
                  `}>
                    {isSelected ? 'Strategy Active' : 'Implement Strategy'}
                  </span>
                </label>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Bar */}
      <div className={`
        fixed bottom-6 left-1/2 transform -translate-x-1/2 md:relative md:bottom-auto md:left-auto md:transform-none md:mt-8
        transition-all duration-500 z-50
        ${selectedCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}
      `}>
        <button
          onClick={onGenerateManifesto}
          disabled={isGeneratingManifesto}
          className="bg-emerald-500 text-slate-900 px-8 py-4 rounded-full md:rounded-lg shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:bg-emerald-400 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 font-mono font-bold uppercase tracking-wider text-sm mx-auto"
        >
          {isGeneratingManifesto ? (
            <>
              <span className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"/>
              Re-calibrating Strategy...
            </>
          ) : (
            <>
              Update Business Plan
              <span className="bg-slate-900/20 px-2 py-0.5 rounded text-xs">
                {selectedCount} Selected
              </span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RiskView;