import React from 'react';
import { Trophy, Medal, Award, Users, TrendingDown } from 'lucide-react';
import { useGame } from '../context/GameContext';

function LeaderboardList() {
  const { getLeaderboard, getStrictestVoter } = useGame();
  const leaderboard = getLeaderboard();

  const getMedalIcon = (index) => {
    switch (index) {
      case 0:
        return <Trophy className="text-yellow-400" size={32} />;
      case 1:
        return <Medal className="text-gray-400" size={28} />;
      case 2:
        return <Award className="text-amber-600" size={24} />;
      default:
        return null;
    }
  };

  const getMedalStyle = (index) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-br from-yellow-600 to-yellow-800 ring-4 ring-yellow-400/50';
      case 1:
        return 'bg-gradient-to-br from-gray-600 to-gray-800 ring-4 ring-gray-400/50';
      case 2:
        return 'bg-gradient-to-br from-amber-700 to-amber-900 ring-4 ring-amber-600/50';
      default:
        return 'bg-slate-800';
    }
  };

  return (
    <div className="space-y-4">
      {leaderboard.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p className="text-lg">Nessuna serata votata ancora.</p>
          <p className="text-sm mt-2">Aggiungi delle serate e inizia a votare!</p>
        </div>
      ) : (
        leaderboard.map((evening, index) => {
          const strictest = getStrictestVoter(evening.id);
          
          return (
            <div
              key={evening.id}
              className={`rounded-lg p-5 ${getMedalStyle(index)} transition-all`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12">
                  {getMedalIcon(index) || (
                    <div className="text-2xl font-bold text-slate-500">#{index + 1}</div>
                  )}
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">{evening.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="text-3xl font-bold text-green-400">
                      {evening.averageScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-slate-400">/ 10</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-slate-400" />
                      <span className="text-slate-300">
                        {evening.voteCount} {evening.voteCount === 1 ? 'voto' : 'voti'}
                      </span>
                    </div>
                    
                    {strictest && (
                      <div className="flex items-center gap-2">
                        <TrendingDown size={16} className="text-slate-400" />
                        <span className="text-slate-300">
                          Più critico: {strictest.user.avatar} {strictest.user.name}
                        </span>
                      </div>
                    )}
                  </div>

                  {evening.voteCount > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-700/50">
                      <div className="text-xs text-slate-400 mb-2">Medie per categoria:</div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <div className="text-slate-500 text-xs">Cibo</div>
                          <div className="font-semibold text-blue-400">
                            {evening.categoryAverages.cibo.toFixed(1)}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-xs">Location</div>
                          <div className="font-semibold text-blue-400">
                            {evening.categoryAverages.location.toFixed(1)}
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-xs">Prezzo/Qualità</div>
                          <div className="font-semibold text-blue-400">
                            {evening.categoryAverages.prezzoQualita.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default LeaderboardList;
