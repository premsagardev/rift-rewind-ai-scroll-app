import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-dark-bg/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-navy/20 to-dark-bg/60"></div>
      
      <div className="relative flex flex-col items-center">
        {/* Glowing Codex Animation */}
        <div className="relative mb-8">
          <div className="w-32 h-40 bg-gradient-to-br from-parchment to-yellow-200 rounded-lg shadow-2xl transform perspective-1000 animate-codex-open">
            <div className="absolute inset-2 bg-navy/10 rounded border border-gold/30">
              {/* Shimmering pages */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent animate-shimmer-pages"></div>
              
              {/* Appearing runes */}
              <div className="absolute top-4 left-4 text-purple/60 text-lg animate-rune-appear">✦</div>
              <div className="absolute top-8 right-4 text-gold/60 text-lg animate-rune-appear" style={{animationDelay: '0.5s'}}>⚡</div>
              <div className="absolute bottom-8 left-6 text-purple/60 text-lg animate-rune-appear" style={{animationDelay: '1s'}}>✧</div>
              <div className="absolute bottom-4 right-6 text-gold/60 text-lg animate-rune-appear" style={{animationDelay: '1.5s'}}>◆</div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-navy/40 text-2xl animate-rune-appear" style={{animationDelay: '2s'}}>⚡</div>
            </div>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 w-32 h-40 bg-gradient-to-br from-gold/20 to-purple/20 rounded-lg blur-xl animate-pulse"></div>
        </div>
        
        <p className="text-parchment font-body text-lg text-center animate-pulse max-w-md">
          Inscribing your Codex entry in ancient runes…
        </p>
        
        <div className="flex space-x-2 mt-6">
          <div className="w-2 h-2 bg-gold rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;