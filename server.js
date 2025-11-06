import express from 'express';
import dotenv from 'dotenv';
import { generateSummonerStory } from './handlers/storyHandler.js';
import { logInfo, logError } from './utils/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET /api/story?summoner=<summonerName>
app.get('/api/story', async (req, res) => {
  try {
    const { summoner } = req.query;
    
    if (!summoner) {
      return res.status(400).json({
        success: false,
        error: 'Summoner name is required as query parameter'
      });
    }

    logInfo(`📡 API request for summoner: ${summoner}`);
    
    const options = { days: 30, forceRefresh: false };
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