import { getSummonerByName, getMatchIdsByPuiid, getMatchDetails } from "./api/riotApi.js";
import { getMatchIdsForSummoner } from "./data/fetchMatches.js";
import { extractMatchDetails } from "./data/dataExtractor.js";
import { summarizeMatchData } from "./data/dataSummarizer.js";
import { savePlayerSummary, readPlayerSummary } from "./data/dbService.js";
import { readCache, writeCache, clearCache } from "./data/cacheService.js";
import { logInfo, logError } from "./utils/logger.js";

async function testApiAndCaching() {
  try {
    logInfo("🚀 Testing API and caching system...");
    
    const summonerName = "Faker";
    
    // Test 1: API calls
    logInfo("1. Testing Riot API calls...");
    const summonerData = await getSummonerByName(summonerName);
    logInfo(`✅ Summoner data: ${summonerData.data.puuid}`);
    
    // Test 2: Cache system
    logInfo("2. Testing cache system...");
    writeCache("test", "data", { message: "Hello Cache" });
    const cachedData = readCache("test", "data");
    logInfo(`✅ Cache test: ${cachedData.message}`);
    
    // Test 3: Match data pipeline
    logInfo("3. Testing match data pipeline...");
    const matchIds = await getMatchIdsForSummoner(summonerName, { days: 7 });
    logInfo(`✅ Found ${matchIds.length} matches`);
    
    const matchDetails = await extractMatchDetails(matchIds.slice(0, 3));
    logInfo(`✅ Extracted ${matchDetails.length} match details`);
    
    const summary = summarizeMatchData(matchDetails, summonerData.data.puuid);
    logInfo(`✅ Generated summary: ${summary.totalMatches} matches, ${summary.winRate} win rate`);
    
    // Test 4: Database operations
    logInfo("4. Testing database operations...");
    savePlayerSummary(summonerName, summary);
    const savedSummary = readPlayerSummary(summonerName);
    logInfo(`✅ Database test: ${savedSummary.totalMatches} matches saved`);
    
    // Cleanup
    clearCache("test", "data");
    
    logInfo("✅ All tests completed successfully!");
    
  } catch (error) {
    logError("❌ Test failed:", error.message);
  }
}

testApiAndCaching();