import React from 'react';
import { FileText, Award, Quote } from 'lucide-react';

interface ManifestoViewProps {
  manifesto: string;
}

const ManifestoView: React.FC<ManifestoViewProps> = ({ manifesto }) => {
  return (
    <div className="animate-in slide-in-from-bottom-8 duration-700 space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Award className="w-6 h-6 text-emerald-500" />
        <h2 className="text-xl md:text-2xl font-mono font-bold text-emerald-500 uppercase tracking-[0.2em]">
          Strategic Manifesto
        </h2>
        <Award className="w-6 h-6 text-emerald-500" />
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-emerald-500/20 rounded-xl blur opacity-50"></div>
        <div className="relative bg-slate-900/90 border border-slate-700 p-8 md:p-12 rounded-xl shadow-2xl">
          <Quote className="absolute top-6 left-6 w-8 h-8 text-slate-700 opacity-50" />
          
          <div className="prose prose-invert prose-emerald max-w-none font-sans leading-loose text-slate-300">
             {/* Simple Markdown Rendering */}
             {manifesto.split('\n').map((line, i) => {
               // Headers
               if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-emerald-400 mt-8 mb-4 font-mono uppercase">{line.replace('### ', '')}</h3>;
               if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-6 border-b border-slate-800 pb-2">{line.replace('## ', '')}</h2>;
               if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-bold text-white mb-6 text-center">{line.replace('# ', '')}</h1>;
               
               // List items
               if (line.trim().startsWith('- ')) return <li key={i} className="ml-4 mb-2 list-disc marker:text-emerald-500">{line.replace('- ', '')}</li>;
               
               // Bold text replacement for simple markdown
               const parts = line.split('**');
               if (parts.length > 1) {
                 return (
                   <p key={i} className="mb-4">
                     {parts.map((part, index) => 
                       index % 2 === 1 
                         ? <strong key={index} className="text-emerald-200 font-semibold">{part}</strong> 
                         : part
                     )}
                   </p>
                 );
               }

               // Empty lines
               if (!line.trim()) return <div key={i} className="h-4"></div>;

               return <p key={i} className="mb-4">{line}</p>;
             })}
          </div>

          <Quote className="absolute bottom-6 right-6 w-8 h-8 text-slate-700 opacity-50 transform rotate-180" />
        </div>
      </div>

      <div className="text-center font-mono text-xs text-slate-500 uppercase tracking-widest mt-8">
        End of Transmission
      </div>
    </div>
  );
};

export default ManifestoView;