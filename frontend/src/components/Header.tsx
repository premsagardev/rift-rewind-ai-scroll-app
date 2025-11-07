import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-12 relative z-10">
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="text-9xl text-gold">⚡</div>
      </div>
      <div className="relative z-10">
        <h1 className="text-6xl font-heading font-bold bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent mb-4 animate-shimmer">
          Codex Runeterran
        </h1>
        <p className="text-parchment text-lg font-body italic opacity-90">
          The future of storytelling, written in ancient runes.
        </p>
      </div>
    </header>
  );
};

export default Header;