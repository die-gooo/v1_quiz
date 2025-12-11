import React, { useState, useEffect } from 'react';

function VoteSliders({ initialRatings, onChange }) {
  const [ratings, setRatings] = useState(
    initialRatings || { cibo: 5, location: 5, prezzoQualita: 5 }
  );

  const categories = [
    { key: 'cibo', label: 'Cibo' },
    { key: 'location', label: 'Location' },
    { key: 'prezzoQualita', label: 'Prezzo/Qualità' },
  ];

  // Calculate live average
  const average = ((ratings.cibo + ratings.location + ratings.prezzoQualita) / 3).toFixed(1);

  const handleChange = (category, value) => {
    const newRatings = { ...ratings, [category]: parseInt(value) };
    setRatings(newRatings);
    if (onChange) {
      onChange(newRatings);
    }
  };

  useEffect(() => {
    if (initialRatings) {
      setRatings(initialRatings);
    }
  }, [initialRatings]);

  return (
    <div className="space-y-6">
      {categories.map(({ key, label }) => (
        <div key={key} className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-lg font-semibold">{label}</label>
            <span className="text-2xl font-bold text-blue-400">{ratings[key]}</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            value={ratings[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(ratings[key] - 1) * 11.11}%, #334155 ${(ratings[key] - 1) * 11.11}%, #334155 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>1</span>
            <span>10</span>
          </div>
        </div>
      ))}

      <div className="mt-8 p-4 bg-slate-700 rounded-lg">
        <div className="text-center">
          <div className="text-sm text-slate-400 mb-1">Media Complessiva</div>
          <div className="text-4xl font-bold text-green-400">{average}</div>
        </div>
      </div>
    </div>
  );
}

export default VoteSliders;
