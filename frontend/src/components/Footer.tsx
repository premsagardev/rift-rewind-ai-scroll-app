import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-16 mt-20 relative z-10">
      {/* Golden gradient top border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-8"></div>
      
      {/* Ambient rune pulse beneath */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-gold/10 animate-pulse-slow">
        ⚡
      </div>
      
      <p className="text-parchment/90 font-body text-lg relative z-10">
        Forged with AWS Bedrock × Amazon Q Developer
      </p>
    </footer>
  );
};

export default Footer;