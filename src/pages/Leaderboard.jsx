import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import LeaderboardList from '../components/LeaderboardList';
import { ArrowLeft, Trophy } from 'lucide-react';

function Leaderboard() {
  const navigate = useNavigate();
  const { activeUser } = useGame();

  useEffect(() => {
    if (!activeUser) {
      navigate('/');
    }
  }, [activeUser, navigate]);

  if (!activeUser) return null;

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
            >
              <ArrowLeft size={20} />
            </button>
            <Trophy size={24} className="text-yellow-400" />
            <div>
              <div className="font-semibold">Classifica</div>
              <div className="text-sm text-slate-400">Migliori Ristoranti</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <LeaderboardList />
      </div>
    </div>
  );
}

export default Leaderboard;
