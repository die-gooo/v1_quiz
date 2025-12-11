import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import AvatarCard from '../components/AvatarCard';
import { Users } from 'lucide-react';

function AvatarSelection() {
  const navigate = useNavigate();
  const { users, login } = useGame();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
    login(userId);
    // Navigate after a short delay for visual feedback
    setTimeout(() => {
      navigate('/dashboard');
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users size={40} className="text-blue-400" />
            <h1 className="text-4xl font-bold">V1 Quiz</h1>
          </div>
          <p className="text-slate-400 text-lg">
            Seleziona il tuo avatar per iniziare
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {users.map(user => (
            <AvatarCard
              key={user.id}
              user={user}
              isSelected={selectedUserId === user.id}
              onClick={() => handleSelectUser(user.id)}
            />
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          Vota le tue serate preferite e scopri la classifica!
        </div>
      </div>
    </div>
  );
}

export default AvatarSelection;
