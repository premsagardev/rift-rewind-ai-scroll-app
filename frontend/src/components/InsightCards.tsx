import React from 'react';

interface InsightCardsProps {
  insights: string[];
}

const InsightCards: React.FC<InsightCardsProps> = ({ insights }) => {
  const runes = ['✦', '⚡', '✧'];
  
  return (
    <div className="mb-12">
      <h3 className="text-3xl font-heading font-bold text-center text-parchment mb-8">
        Strategic Essence
      </h3>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {insights.slice(0, 3).map((insight, index) => (
          <div
            key={index}
            className="codex-card bg-navy/90 border-2 border-gold/40 rounded-xl p-6 relative overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
          >
            {/* Corner runes */}
            <div className="absolute top-3 left-3 text-gold/60 text-lg">{runes[index]}</div>
            <div className="absolute top-3 right-3 text-purple/60 text-lg">{runes[index]}</div>
            <div className="absolute bottom-3 left-3 text-purple/60 text-lg">{runes[index]}</div>
            <div className="absolute bottom-3 right-3 text-gold/60 text-lg">{runes[index]}</div>
            
            {/* Filigree border effect */}
            <div className="absolute inset-0 border border-gold/20 rounded-xl m-2"></div>
            
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-purple/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Content */}
            <div className="relative z-10 text-center">
              <div className="text-parchment font-body leading-relaxed">
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