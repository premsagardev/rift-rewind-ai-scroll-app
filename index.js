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

// GET /api/story?summoner=<summonerName>&mode=<light|full>
app.get('/api/story', async (req, res) => {
  try {
    const { summoner, mode = 'light' } = req.query;
    
    if (!summoner) {
      return res.status(400).json({
        success: false,
        error: 'Summoner name is required as query parameter'
      });
    }

    logInfo(`📡 API request for summoner: ${summoner} (${mode} mode)`);
    
    const options = { mode, forceRefresh: false };
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
