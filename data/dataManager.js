// 🧩 dataManager.js → ETL Controller

// Goal:
// Control the data pipeline end-to-end (fetch → extract → process → store).

// Hints:

// Acts as a controller — orchestrates all other data modules.

// Typical flow:

// Use fetchMatches to get IDs.

// Use dataExtractor to get details.

// Send details to dataSummarizer for cleaning.

// Send cleaned data to dbService.

// ✅ You’ll call this from handlers or the main entry point (index.js).

// dataManager.js
import { getMatchIdsForSummoner } from "./fetchMatches.js";
import { extractMatchDetails } from "./dataExtractor.js";
import { summarizeMatchData } from "./dataSummarizer.js";
import { savePlayerSummary } from "./dbService.js";
import { logInfo, logError } from "../utils/logger.js";

export async function processSummonerData(summonerName, { days = 90, forceRefresh = false }) {
  try {
    logInfo(`🚀 Processing summoner data for: ${summonerName}`);
    
    // 1. Fetch match IDs
    const matchIds = await getMatchIdsForSummoner(summonerName, { days, forceRefresh });
    logInfo(`🎮 Found ${matchIds.length} matches`);
    
    // 2. Fetch match details
    const matchDetails = await extractMatchDetails(matchIds);
    
    // 3. Get PUUID for summary calculation
    const { getSummonerByName } = await import("../api/riotApi.js");
    const summonerData = await getSummonerByName(summonerName);
    
    if (!summonerData || !summonerData.data || !summonerData.data.puuid) {
      throw new Error('Failed to get valid summoner data');
    }
    
    const puuid = summonerData.data.puuid;
    
    // 4. Summarize stats
    const summary = summarizeMatchData(matchDetails, puuid);
    
    // 5. Save to DB
    savePlayerSummary(summonerName, {
      playerName: summonerName,
      puuid,
      summary,
      lastUpdated: new Date().toISOString(),
      matchCount: matchDetails.length
    });
    
    logInfo(`✅ Successfully processed ${summonerName}`);
    return summary;
    
  } catch (error) {
    logError(`❌ Error processing ${summonerName}:`, error.message);
    throw error;
  }
}

export default {
  processSummonerData,
};
