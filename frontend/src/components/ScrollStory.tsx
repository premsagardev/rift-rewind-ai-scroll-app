import React from 'react';

interface ScrollStoryProps {
  summonerName: string;
  insights: string;
  story: string;
}

const ScrollStory: React.FC<ScrollStoryProps> = ({ summonerName, insights, story }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="bg-gradient-to-b from-amber-50 to-amber-100 p-8 rounded-lg shadow-2xl border-4 border-amber-600 relative">
        <div className="absolute inset-0 bg-parchment opacity-20 rounded-lg"></div>
        
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-6">
            {summonerName}'s Legend
          </h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-amber-800 mb-3">Strategy Insights:</h3>
            <div className="text-amber-700 whitespace-pre-line bg-amber-50 p-4 rounded border-l-4 border-amber-600">
              {insights}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-amber-800 mb-3">The Chronicle:</h3>
            <div className="text-amber-900 leading-relaxed whitespace-pre-line">
              {story}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollStory;