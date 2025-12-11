import React, { createContext, useState, useEffect, useContext } from 'react';

const GameContext = createContext();

// Fixed 6 participants with emojis
const INITIAL_USERS = [
  { id: 1, name: 'Marco', avatar: '🍕' },
  { id: 2, name: 'Sofia', avatar: '🍷' },
  { id: 3, name: 'Luca', avatar: '🍝' },
  { id: 4, name: 'Giulia', avatar: '🥘' },
  { id: 5, name: 'Andrea', avatar: '🍰' },
  { id: 6, name: 'Chiara', avatar: '☕' },
];

const STORAGE_KEY = 'v1_quiz_state';

export function GameProvider({ children }) {
  const [activeUser, setActiveUser] = useState(null);
  const [evenings, setEvenings] = useState([]);
  const [votes, setVotes] = useState([]);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.activeUser) setActiveUser(parsed.activeUser);
        if (parsed.evenings) setEvenings(parsed.evenings);
        if (parsed.votes) setVotes(parsed.votes);
      } catch (e) {
        console.error('Failed to load state from localStorage', e);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const state = {
      activeUser,
      evenings,
      votes,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [activeUser, evenings, votes]);

  // Login as a specific user
  const login = (userId) => {
    const user = INITIAL_USERS.find(u => u.id === userId);
    if (user) {
      setActiveUser(user);
    }
  };

  // Logout
  const logout = () => {
    setActiveUser(null);
  };

  // Add a new evening
  const addEvening = (name, date) => {
    const newEvening = {
      id: Date.now() + Math.random(), // Prevent collisions
      name,
      date,
      createdAt: new Date().toISOString(),
    };
    setEvenings([...evenings, newEvening]);
  };

  // Submit or update a vote
  const submitVote = (eveningId, ratings) => {
    if (!activeUser) return;

    const existingVoteIndex = votes.findIndex(
      v => v.eveningId === eveningId && v.userId === activeUser.id
    );

    const newVote = {
      id: existingVoteIndex >= 0 ? votes[existingVoteIndex].id : Date.now() + Math.random(),
      eveningId,
      userId: activeUser.id,
      ratings, // { cibo: 8, location: 7, prezzoQualita: 9 }
      submittedAt: new Date().toISOString(),
    };

    if (existingVoteIndex >= 0) {
      // Update existing vote
      const updatedVotes = [...votes];
      updatedVotes[existingVoteIndex] = newVote;
      setVotes(updatedVotes);
    } else {
      // Add new vote
      setVotes([...votes, newVote]);
    }
  };

  // Get vote for a specific evening by current user
  const getUserVote = (eveningId) => {
    if (!activeUser) return null;
    return votes.find(v => v.eveningId === eveningId && v.userId === activeUser.id);
  };

  // Get all votes for a specific evening
  const getEveningVotes = (eveningId) => {
    return votes.filter(v => v.eveningId === eveningId);
  };

  // Calculate average score for an evening
  const calculateEveningAverage = (eveningId) => {
    const eveningVotes = getEveningVotes(eveningId);
    if (eveningVotes.length === 0) return 0;

    let totalScore = 0;
    eveningVotes.forEach(vote => {
      const avg = (vote.ratings.cibo + vote.ratings.location + vote.ratings.prezzoQualita) / 3;
      totalScore += avg;
    });

    return totalScore / eveningVotes.length;
  };

  // Calculate category averages for an evening
  const calculateCategoryAverages = (eveningId) => {
    const eveningVotes = getEveningVotes(eveningId);
    if (eveningVotes.length === 0) return { cibo: 0, location: 0, prezzoQualita: 0 };

    const totals = { cibo: 0, location: 0, prezzoQualita: 0 };
    eveningVotes.forEach(vote => {
      totals.cibo += vote.ratings.cibo;
      totals.location += vote.ratings.location;
      totals.prezzoQualita += vote.ratings.prezzoQualita;
    });

    return {
      cibo: totals.cibo / eveningVotes.length,
      location: totals.location / eveningVotes.length,
      prezzoQualita: totals.prezzoQualita / eveningVotes.length,
    };
  };

  // Get leaderboard sorted by average score
  const getLeaderboard = () => {
    return evenings
      .map(evening => ({
        ...evening,
        averageScore: calculateEveningAverage(evening.id),
        voteCount: getEveningVotes(evening.id).length,
        categoryAverages: calculateCategoryAverages(evening.id),
      }))
      .sort((a, b) => b.averageScore - a.averageScore);
  };

  // Find strictest voter (user with lowest average given)
  const getStrictestVoter = (eveningId) => {
    const eveningVotes = getEveningVotes(eveningId);
    if (eveningVotes.length === 0) return null;

    const userAverages = eveningVotes.map(vote => {
      const avg = (vote.ratings.cibo + vote.ratings.location + vote.ratings.prezzoQualita) / 3;
      const user = INITIAL_USERS.find(u => u.id === vote.userId);
      return { user, average: avg };
    });

    userAverages.sort((a, b) => a.average - b.average);
    return userAverages[0];
  };

  const value = {
    users: INITIAL_USERS,
    activeUser,
    evenings,
    votes,
    login,
    logout,
    addEvening,
    submitVote,
    getUserVote,
    getEveningVotes,
    calculateEveningAverage,
    calculateCategoryAverages,
    getLeaderboard,
    getStrictestVoter,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
