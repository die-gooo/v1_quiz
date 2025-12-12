import React from 'react';
import { Calendar, Trash2 } from 'lucide-react';

function EveningCard({ evening, onVoteClick, onDelete, hasVoted }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-slate-800 rounded-lg p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-100">{evening.name}</h3>
          
          <div className="flex items-center gap-2 text-slate-400 text-sm mt-2">
            <Calendar size={16} />
            <span>{formatDate(evening.date)}</span>
          </div>
        </div>

        <button
          onClick={onDelete}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-slate-700 rounded-lg transition-all"
          title="Elimina serata"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <button
        onClick={onVoteClick}
        className={`
          mt-2 py-3 px-6 rounded-lg font-semibold transition-all
          ${hasVoted 
            ? 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800' 
            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }
        `}
      >
        {hasVoted ? 'Modifica' : 'Vota'}
      </button>
    </div>
  );
}

export default EveningCard;
