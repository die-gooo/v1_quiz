import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import VoteSliders from '../components/VoteSliders';
import { ArrowLeft, Save } from 'lucide-react';

function VoteForm() {
  const navigate = useNavigate();
  const { eveningId } = useParams();
  const { activeUser, evenings, getUserVote, submitVote } = useGame();
  
  const evening = evenings.find(e => e.id === parseFloat(eveningId));
  const existingVote = getUserVote(parseFloat(eveningId));
  
  const [ratings, setRatings] = useState(
    existingVote?.ratings || { cibo: 5, location: 5, prezzoQualita: 5 }
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!activeUser) {
      navigate('/');
    }
    if (!evening) {
      navigate('/dashboard');
    }
  }, [activeUser, evening, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    submitVote(parseFloat(eveningId), ratings);
    
    setTimeout(() => {
      setIsSaving(false);
      navigate('/dashboard');
    }, 500);
  };

  if (!activeUser || !evening) return null;

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
            <div>
              <div className="font-semibold">{evening.name}</div>
              <div className="text-sm text-slate-400">
                {existingVote ? 'Modifica Voto' : 'Nuovo Voto'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-2xl">{activeUser.avatar}</div>
            <div>
              <div className="text-sm text-slate-400">Votando come</div>
              <div className="font-semibold">{activeUser.name}</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-slate-800 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Valuta la Serata</h2>
            <VoteSliders
              initialRatings={ratings}
              onChange={setRatings}
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className={`
              w-full py-4 rounded-lg font-bold text-lg
              flex items-center justify-center gap-3
              transition-all
              ${isSaving
                ? 'bg-green-700 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
              }
            `}
          >
            <Save size={24} />
            {isSaving ? 'Salvando...' : existingVote ? 'Aggiorna Voto' : 'Salva Voto'}
          </button>

          {existingVote && (
            <p className="text-center text-sm text-slate-400 mt-4">
              Stai modificando un voto esistente
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default VoteForm;
