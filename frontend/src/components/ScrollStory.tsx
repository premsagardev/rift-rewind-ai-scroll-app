import React, { useState, useEffect } from 'react';
import InsightCards from './InsightCards';

interface ScrollStoryProps {
  summonerName: string;
  insights: string;
  story: string;
}

const ScrollStory: React.FC<ScrollStoryProps> = ({ summonerName, insights, story }) => {
  const [visibleText, setVisibleText] = useState('');
  const [showWatermark, setShowWatermark] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  
  const insightLines = insights.split('\n').filter(line => line.trim().startsWith('-')).map(line => line.replace(/^-\s*/, ''));

  useEffect(() => {
    setTimeout(() => setShowInsights(true), 500);
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < story.length) {
        setVisibleText(story.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowWatermark(true), 1000);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [story]);

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn relative z-10 space-y-12">
      {/* Insight Cards */}
      {showInsights && (
        <div className="animate-fadeIn">
          <InsightCards insights={insightLines} />
        </div>
      )}
      
      {/* Chronicle Book */}
      <div className="relative">
        <div className="bg-gradient-to-br from-parchment via-yellow-100 to-parchment p-12 rounded-3xl shadow-2xl border-4 border-gold/60 relative overflow-hidden book-glow">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-purple/5 rounded-3xl"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-navy/20 to-transparent transform -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-heading font-bold text-navy mb-4">
                The Chronicle of {summonerName}
              </h2>
              <div className="w-48 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
            </div>
            
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-2xl font-heading font-bold text-navy mb-6 flex items-center justify-center">
                <span className="text-gold mr-2">⚡</span>
                The Sacred Chronicle
                <span className="text-gold ml-2">⚡</span>
              </h3>
              <div className="text-navy font-body leading-relaxed whitespace-pre-line typewriter-text text-lg">
                {visibleText}
              </div>
            </div>
            
            {showWatermark && (
              <div className="absolute bottom-8 right-8 text-6xl text-gold/20 animate-pulse-slow">
                ⚡
              </div>
            )}
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-purple/10 rounded-3xl blur-xl animate-glow-border"></div>
      </div>
    </div>
  );
};

export default ScrollStory;