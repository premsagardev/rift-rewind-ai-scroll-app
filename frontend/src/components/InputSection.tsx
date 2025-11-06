import React, { useState } from 'react';

interface InputSectionProps {
  onSubmit: (summonerName: string) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onSubmit, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter summoner name..."
          className="flex-1 px-4 py-2 bg-gray-800 border border-amber-600 rounded text-amber-100 placeholder-amber-400 focus:outline-none focus:border-amber-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="px-6 py-2 bg-amber-600 text-gray-900 font-semibold rounded hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Generate
        </button>
      </div>
    </form>
  );
};

export default InputSection;