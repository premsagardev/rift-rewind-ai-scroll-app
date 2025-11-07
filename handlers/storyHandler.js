// 4️⃣ handlers/storyHandler.js → Frontend API Gateway

import { processSummonerData } from "../data/dataManager.js";
import { createPlayerStory } from "../ai/storyGenerator.js";
import { logInfo, logError } from "../utils/logger.js";

export async function generateSummonerStory(summonerName, options = {}) {
  try {
    // Determine mode and set days accordingly
    const mode = options.mode || 'light';
    const days = mode === 'full' ? 365 : 90;
    const enhancedOptions = { ...options, days };
    
    logInfo(`🎬 Starting story generation for: ${summonerName} (${mode} mode - ${days} days)`);
    
    // Step 1: Process summoner data (fetch → extract → summarize)
    logInfo("1. Processing summoner data...");
    const summary = await processSummonerData(summonerName, enhancedOptions);
    
    // Step 2: Prepare data for AI story generation
    const playerData = {
      playerName: summonerName,
      summary: summary,
      lastUpdated: new Date().toISOString()
    };
    
    // Step 3: Generate AI story
    logInfo("2. Generating AI story...");
    const storyResult = await createPlayerStory(playerData);
    
    // Step 4: Return complete story response
    const response = {
      success: true,
      summonerName,
      story: storyResult.story,
      stats: summary, // Include the summary stats
      generatedAt: storyResult.generatedAt,
      mode,
      timeframe: summary.timeframe
    };
    
    logInfo(`✅ Story generated successfully for: ${summonerName}`);
    return response;
    
  } catch (error) {
    logError(`❌ Story handler failed for ${summonerName}: ${error.message}`);
    return {
      success: false,
      error: error.message,
      summonerName
    };
  }
}

export default {
  generateSummonerStory,
};