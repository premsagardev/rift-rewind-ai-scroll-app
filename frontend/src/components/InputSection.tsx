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
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12 relative z-10 px-4">
      <div className="relative">
        {/* Glowing runes around input - hidden on very small screens */}
        <div className="hidden sm:block absolute -top-4 sm:-top-6 -left-4 sm:-left-6 text-purple/40 text-lg sm:text-2xl animate-pulse">✦</div>
        <div className="hidden sm:block absolute -top-4 sm:-top-6 -right-4 sm:-right-6 text-gold/40 text-lg sm:text-2xl animate-pulse" style={{animationDelay: '0.5s'}}>⚡</div>
        <div className="hidden sm:block absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 text-gold/40 text-lg sm:text-2xl animate-pulse" style={{animationDelay: '1s'}}>✧</div>
        <div className="hidden sm:block absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 text-purple/40 text-lg sm:text-2xl animate-pulse" style={{animationDelay: '1.5s'}}>◆</div>
        
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Whisper thy Summoner Name into the Codex…"
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-navy/90 border-2 border-purple/30 rounded-xl text-parchment placeholder-parchment/50 focus:outline-none focus:border-gold transition-all duration-500 font-body backdrop-blur-sm text-center ceremonial-input shadow-lg text-sm sm:text-base"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-purple to-gold text-dark-bg font-heading font-bold rounded-xl hover:from-gold hover:to-purple disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 animate-glow shadow-xl transform hover:scale-105 text-sm sm:text-base"
            >
              Open My Chronicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputSection;