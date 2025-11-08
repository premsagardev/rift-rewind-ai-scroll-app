import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateSummonerStory } from './handlers/storyHandler.js';
import { logInfo, logError } from './utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GET /api/story?summoner=<summonerName>&platform=<platform>&mode=<light|full>
app.get('/api/story', async (req, res) => {
  try {
    const { summoner, platform = 'na1', mode = 'light' } = req.query;
    
    if (!summoner) {
      return res.status(400).json({
        success: false,
        error: 'Summoner name is required as query parameter'
      });
    }

    // Validate platform
    const { isValidPlatform, getRegionName } = await import('./data/regionResolver.js');
    if (!isValidPlatform(platform)) {
      return res.status(400).json({
        success: false,
        error: `Invalid platform: ${platform}. Supported platforms: na1, euw1, eun1, kr, jp1, br1, la1, la2, tr1, ru`
      });
    }

    logInfo(`📡 API request for summoner: ${summoner} on ${getRegionName(platform)} (${mode} mode)`);
    
    const options = { mode, platform, forceRefresh: false };
    const result = await generateSummonerStory(summoner, options);
    
    res.json(result);
    
  } catch (error) {
    logError(`❌ API error: ${error.message}`);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

app.listen(PORT, () => {
  logInfo(`🚀 Rift Rewind API server running on port ${PORT}`);
  logInfo(`📖 Usage: GET /api/story?summoner=<summonerName>`);
});
