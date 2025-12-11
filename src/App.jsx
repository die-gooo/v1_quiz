import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import AvatarSelection from './pages/AvatarSelection';
import Dashboard from './pages/Dashboard';
import VoteForm from './pages/VoteForm';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-slate-900 text-slate-100">
          <Routes>
            <Route path="/" element={<AvatarSelection />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vote/:eveningId" element={<VoteForm />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
