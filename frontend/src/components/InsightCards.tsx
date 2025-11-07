import React from 'react';

interface InsightCardsProps {
  insights: string[];
}

const InsightCards: React.FC<InsightCardsProps> = ({ insights }) => {
  const runes = ['✦', '⚡', '✧'];
  
  return (
    <div className="mb-8 sm:mb-10 md:mb-12 px-4">
      <h3 className="text-2xl sm:text-3xl font-heading font-bold text-center text-parchment mb-6 sm:mb-8">
        Strategic Essence
      </h3>
      
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {insights.slice(0, 3).map((insight, index) => (
          <div
            key={index}
            className="codex-card bg-navy/90 border-2 border-gold/40 rounded-xl p-4 sm:p-6 relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            {/* Corner runes - smaller on mobile */}
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 text-gold/60 text-sm sm:text-lg">{runes[index]}</div>
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3 text-purple/60 text-sm sm:text-lg">{runes[index]}</div>
            <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-purple/60 text-sm sm:text-lg">{runes[index]}</div>
            <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-gold/60 text-sm sm:text-lg">{runes[index]}</div>
            
            {/* Filigree border effect */}
            <div className="absolute inset-0 border border-gold/20 rounded-xl m-1 sm:m-2"></div>
            
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-purple/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <div className="text-parchment font-body leading-relaxed text-sm sm:text-base">
                {insight.trim()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightCards;