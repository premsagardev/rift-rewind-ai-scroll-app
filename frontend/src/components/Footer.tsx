import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-8 sm:py-12 md:py-16 mt-12 sm:mt-16 md:mt-20 relative z-10 px-4">
      {/* Golden gradient top border */}
      <div className="w-full max-w-md sm:max-w-lg mx-auto h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-6 sm:mb-8"></div>
      
      {/* Ambient rune pulse beneath */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl sm:text-5xl md:text-6xl text-gold/10 animate-pulse-slow">
        ⚡
      </div>
      
      <p className="text-parchment/90 font-body text-sm sm:text-base md:text-lg relative z-10 leading-snug max-w-md mx-auto">
        Forged with AWS Bedrock × Amazon Q Developer
      </p>
    </footer>
  );
};

export default Footer;