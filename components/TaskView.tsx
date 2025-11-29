import React, { useMemo } from 'react';
import { Check, Circle, ListTodo, Activity } from 'lucide-react';
import { Task } from '../types';

interface TaskViewProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

const TaskView: React.FC<TaskViewProps> = ({ tasks, onToggleTask }) => {
  const progress = useMemo(() => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.isCompleted).length;
    return Math.round((completed / tasks.length) * 100);
  }, [tasks]);

  return (
    <div className="space-y-6 animate-in slide-in-from-left-4 duration-500">
      
      {/* Header Stats */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <ListTodo className="w-5 h-5 text-emerald-500" />
          <h3 className="font-mono text-sm text-slate-400 uppercase tracking-wider">
            Execution Protocol
          </h3>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-1 md:flex-none text-right">
             <div className="text-xs font-mono text-emerald-500/70 mb-1">COMPLETION STATUS</div>
             <div className="flex items-center justify-end gap-2 text-emerald-400 font-mono font-bold">
               <Activity className="w-4 h-4" />
               {progress}%
             </div>
          </div>
          <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <button
            key={task.id}
            onClick={() => onToggleTask(task.id)}
            className={`
              w-full group flex items-start gap-4 p-4 rounded-lg border text-left transition-all duration-200
              ${task.isCompleted 
                ? 'bg-slate-900/30 border-slate-800 opacity-50' 
                : 'bg-slate-800/40 border-slate-700 hover:bg-slate-800 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]'
              }
            `}
          >
            <div className="mt-0.5 flex-shrink-0">
               {task.isCompleted ? (
                 <div className="w-5 h-5 rounded bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-500">
                   <Check className="w-3.5 h-3.5" />
                 </div>
               ) : (
                 <div className="w-5 h-5 rounded border border-slate-600 group-hover:border-emerald-500/50 flex items-center justify-center">
                   <Circle className="w-3 h-3 text-transparent group-hover:text-emerald-500/20" />
                 </div>
               )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-baseline justify-between mb-1">
                 <span className={`font-mono text-xs ${task.isCompleted ? 'text-slate-600' : 'text-emerald-500/70'}`}>
                   SEQ_{String(index + 1).padStart(2, '0')}
                 </span>
              </div>
              <p className={`text-sm md:text-base leading-relaxed ${task.isCompleted ? 'text-slate-500 line-through decoration-slate-600' : 'text-slate-200'}`}>
                {task.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskView;
