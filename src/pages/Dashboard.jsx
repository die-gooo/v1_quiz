import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import EveningCard from '../components/EveningCard';
import Modal from '../components/Modal';
import { Plus, Trophy, LogOut, Calendar } from 'lucide-react';

function Dashboard() {
  const navigate = useNavigate();
  const { activeUser, evenings, addEvening, getUserVote, logout } = useGame();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEveningName, setNewEveningName] = useState('');
  const [newEveningDate, setNewEveningDate] = useState('');

  useEffect(() => {
    if (!activeUser) {
      navigate('/');
    }
  }, [activeUser, navigate]);

  const handleAddEvening = (e) => {
    e.preventDefault();
    if (newEveningName.trim() && newEveningDate) {
      addEvening(newEveningName.trim(), newEveningDate);
      setNewEveningName('');
      setNewEveningDate('');
      setIsModalOpen(false);
    }
  };

  const handleVoteClick = (eveningId) => {
    navigate(`/vote/${eveningId}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!activeUser) return null;

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{activeUser.avatar}</div>
              <div>
                <div className="font-semibold">{activeUser.name}</div>
                <div className="text-sm text-slate-400">Dashboard</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/leaderboard')}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
                title="Classifica"
              >
                <Trophy size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Serate Disponibili</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-4 py-2 rounded-lg font-semibold transition"
          >
            <Plus size={20} />
            Aggiungi
          </button>
        </div>

        {evenings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg mb-4">
              Nessuna serata ancora.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Aggiungi la prima serata
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {evenings
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map(evening => {
                const userVote = getUserVote(evening.id);
                return (
                  <EveningCard
                    key={evening.id}
                    evening={evening}
                    onVoteClick={() => handleVoteClick(evening.id)}
                    hasVoted={!!userVote}
                  />
                );
              })}
          </div>
        )}
      </div>

      {/* Add Evening Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Aggiungi Serata"
      >
        <form onSubmit={handleAddEvening} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Nome Ristorante
            </label>
            <input
              type="text"
              value={newEveningName}
              onChange={(e) => setNewEveningName(e.target.value)}
              placeholder="Es. Trattoria da Mario"
              className="w-full px-4 py-3 bg-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Data
            </label>
            <input
              type="date"
              value={newEveningDate}
              onChange={(e) => setNewEveningDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
            >
              Aggiungi
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Dashboard;
