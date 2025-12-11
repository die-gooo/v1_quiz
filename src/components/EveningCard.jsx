import React from 'react';
import { Calendar } from 'lucide-react';

function EveningCard({ evening, onVoteClick, hasVoted }) {
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
      <h3 className="text-xl font-bold text-slate-100">{evening.name}</h3>
      
      <div className="flex items-center gap-2 text-slate-400 text-sm">
        <Calendar size={16} />
        <span>{formatDate(evening.date)}</span>
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
