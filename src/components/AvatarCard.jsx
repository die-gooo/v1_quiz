import React from 'react';

function AvatarCard({ user, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        p-6 rounded-lg transition-all duration-200
        flex flex-col items-center gap-3
        ${isSelected 
          ? 'bg-blue-600 ring-4 ring-blue-400 scale-105' 
          : 'bg-slate-800 hover:bg-slate-700 active:scale-95'
        }
      `}
    >
      <div className="text-5xl">{user.avatar}</div>
      <div className="font-semibold text-lg">{user.name}</div>
    </button>
  );
}

export default AvatarCard;
