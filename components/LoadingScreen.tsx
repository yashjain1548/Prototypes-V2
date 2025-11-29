import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] w-full animate-in fade-in duration-500">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-slate-700/30 rounded-full animate-spin-slow" style={{ animationDuration: '10s' }}></div>
        <div className="absolute inset-2 border-2 border-emerald-500/10 rounded-full"></div>
        
        {/* Scanning Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 animate-scan"></div>
        
        {/* Core */}
        <div className="relative z-10 text-center space-y-4">
          <div className="flex items-center justify-center gap-1">
            <span className="block w-1.5 h-12 bg-emerald-500/80 animate-pulse delay-75 rounded-sm"></span>
            <span className="block w-1.5 h-16 bg-emerald-500/80 animate-pulse delay-150 rounded-sm"></span>
            <span className="block w-1.5 h-10 bg-emerald-500/80 animate-pulse delay-0 rounded-sm"></span>
            <span className="block w-1.5 h-14 bg-emerald-500/80 animate-pulse delay-300 rounded-sm"></span>
          </div>
          <p className="font-mono text-emerald-500 text-xs tracking-[0.2em] animate-pulse">
            PROCESSING STRATEGY
          </p>
        </div>
      </div>
      
      <div className="mt-8 font-mono text-xs text-slate-500">
        Accessing neural modules...
      </div>
    </div>
  );
};

export default LoadingScreen;
