import { generateSummonerStory } from "./handlers/storyHandler.js";
import { logInfo, logError } from "./utils/logger.js";

async function testYearlyData() {
  try {
    logInfo("🧪 Testing yearly data fetch...");
    
    const summonerName = "Faker";
    
    // Test light mode (90 days)
    logInfo("\n=== TESTING LIGHT MODE (90 days) ===");
    const lightResult = await generateSummonerStory(summonerName, { mode: 'light' });
    
    if (lightResult.success) {
      logInfo(`✅ Light mode: ${lightResult.stats?.totalMatches || 'N/A'} matches`);
    }
    
    // Test full mode (365 days)
    logInfo("\n=== TESTING FULL MODE (365 days) ===");
    const fullResult = await generateSummonerStory(summonerName, { mode: 'full' });
    
    if (fullResult.success) {
      logInfo(`✅ Full mode: ${fullResult.stats?.totalMatches || 'N/A'} matches`);
      logInfo(`📊 Win Rate: ${(fullResult.stats?.winRate * 100).toFixed(1)}%`);
      logInfo(`🏆 Longest Win Streak: ${fullResult.stats?.longestWinStreak || 'N/A'}`);
      logInfo(`🎯 Top Champions: ${fullResult.stats?.topChampions?.join(', ') || 'N/A'}`);
      if (fullResult.stats?.timeframe) {
        logInfo(`📅 Timeframe: ${fullResult.stats.timeframe}`);
      }
    }
    
  } catch (error) {
    logError("❌ Test failed:", error.message);
  }
}

testYearlyData();