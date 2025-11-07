import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-6 sm:py-8 md:py-12 relative z-10 px-4">
      <div className="absolute inset-0 flex items-center justify-center opacity-10 sm:opacity-20">
        <div className="text-6xl sm:text-8xl md:text-9xl text-gold">⚡</div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4 animate-shimmer transition-responsive">
          Codex Runeterran
        </h1>
        <p className="text-parchment text-sm sm:text-base md:text-lg font-body italic opacity-90 leading-snug sm:leading-normal">
          The future of storytelling, written in ancient runes.
        </p>
      </div>
    </header>
  );
};

export default Header;