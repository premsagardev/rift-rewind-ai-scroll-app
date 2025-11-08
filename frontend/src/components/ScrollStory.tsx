import React, { useState, useEffect } from 'react';
import InsightCards from './InsightCards';

interface ScrollStoryProps {
  summonerName: string;
  insights: string;
  story: string;
  region?: string;
}

const ScrollStory: React.FC<ScrollStoryProps> = ({ summonerName, insights, story, region }) => {
  
  const regionNames: { [key: string]: string } = {
    na1: 'North America (NA)',
    euw1: 'Europe West (EUW)',
    eun1: 'Europe Nordic & East (EUNE)',
    kr: 'Korea (KR)',
    jp1: 'Japan (JP)',
    br1: 'Brazil (BR)',
    la1: 'Latin America North (LAN)',
    la2: 'Latin America South (LAS)',
    tr1: 'Turkey (TR)',
    ru: 'Russia (RU)'
  };
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
    <div className="w-full max-w-screen-lg mx-auto animate-fadeIn relative z-10 space-y-8 sm:space-y-10 md:space-y-12 px-4">
      {/* Insight Cards */}
      {showInsights && (
        <div className="animate-fadeIn">
          <InsightCards insights={insightLines} />
        </div>
      )}
      
      {/* Chronicle Book */}
      <div className="relative">
        <div className="w-full bg-gradient-to-br from-parchment via-yellow-100 to-parchment p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-gold/60 relative overflow-hidden book-glow max-h-[80vh] sm:max-h-none overflow-y-auto sm:overflow-visible">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-purple/5 rounded-2xl sm:rounded-3xl"></div>
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-navy/20 to-transparent transform -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-navy mb-2 sm:mb-4 leading-tight">
                The Chronicle of {summonerName}
              </h2>
              {region && (
                <p className="text-navy/70 font-body text-sm sm:text-base mb-3">
                  Region: {regionNames[region] || region.toUpperCase()}
                </p>
              )}
              <div className="w-32 sm:w-48 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
            </div>
            
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-navy mb-4 sm:mb-6 flex items-center justify-center flex-wrap">
                <span className="text-gold mr-2">⚡</span>
                <span>The Sacred Chronicle</span>
                <span className="text-gold ml-2">⚡</span>
              </h3>
              <div className="text-navy font-body leading-relaxed whitespace-pre-line typewriter-text text-sm sm:text-base md:text-lg">
                {visibleText}
              </div>
            </div>
            
            {showWatermark && (
              <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 text-4xl sm:text-6xl text-gold/20 animate-pulse-slow">
                ⚡
              </div>
            )}
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-purple/10 rounded-2xl sm:rounded-3xl blur-xl animate-glow-border"></div>
      </div>
    </div>
  );
};

export default ScrollStory;