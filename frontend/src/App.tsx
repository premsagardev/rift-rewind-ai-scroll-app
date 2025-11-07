import React, { useState } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import Loader from './components/Loader';
import ScrollStory from './components/ScrollStory';
import Footer from './components/Footer';
import BackgroundRunes from './components/BackgroundRunes';

interface StoryData {
  success: boolean;
  summonerName: string;
  story: string;
  stats?: any;
  generatedAt?: string;
  error?: string;
}

const App: React.FC = () => {
  const [summonerName, setSummonerName] = useState('');
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (name: string) => {
    setIsLoading(true);
    setError(null);
    setSummonerName(name);
    
    try {
      const response = await fetch(`http://localhost:3000/api/story?summoner=${encodeURIComponent(name)}`);
      const data = await response.json();
      
      if (data.success) {
        setStoryData(data);
      } else {
        setError(data.error || 'Failed to generate story');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  const parseStoryContent = (story: string) => {
    const parts = story.split('Story:');
    const insights = parts[0].replace('Player Strategy Insights:', '').trim();
    const storyText = parts[1]?.trim() || '';
    return { insights, story: storyText };
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundRunes />
      <div className="container mx-auto px-6 relative z-10">
        <Header />
        
        <InputSection onSubmit={handleSubmit} isLoading={isLoading} />
        
        {isLoading && <Loader />}
        
        {error && (
          <div className="max-w-md mx-auto mb-8 p-6 bg-red-900/80 border-2 border-red-500/50 rounded-xl text-red-200 font-body backdrop-blur-sm relative z-10 animate-fadeIn">
            <div className="flex items-center">
              <span className="text-red-400 mr-2">⚠</span>
              {error}
            </div>
          </div>
        )}
        
        {storyData && storyData.success && (
          <div className="animate-fadeIn">
            {(() => {
              const { insights, story } = parseStoryContent(storyData.story);
              return (
                <ScrollStory 
                  summonerName={storyData.summonerName}
                  insights={insights}
                  story={story}
                />
              );
            })()}
          </div>
        )}
        
        <Footer />
      </div>
    </div>
  );
};

export default App;