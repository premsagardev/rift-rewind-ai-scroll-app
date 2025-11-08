// 2. dataExtractor.js → Raw Data Fetcher

// Goal:
// Fetch match details for a given list of match IDs.

// Hints:

// Input: array of match IDs.

// For each match ID:

// Check cache (readCache(matchId, "matchDetail")).

// If not cached → call Riot API → cache result (writeCache).

// Return an array of full match details.

// ✅ Think of this as your “data miner.”

// dataExtractor.js
import { getMatchDetails } from "../api/riotApi.js";
import { readCache, writeCache } from "./cacheService.js";
import { logInfo } from "../utils/logger.js";

export async function extractMatchDetails(matchIds, platform = 'na1') {
  const matchDetails = [];
  
  for (const matchId of matchIds) {
    try {
      let matchDetail = readCache(matchId, "matchDetail");
      
      if (!matchDetail) {
        logInfo(`🔍 Fetching match details for ${matchId}`);
        const response = await getMatchDetails(matchId, platform);
        matchDetail = response.data;
        writeCache(matchId, "matchDetail", matchDetail);
      } else {
        logInfo(`📂 Cache hit for match ${matchId}`);
      }
      
      matchDetails.push(matchDetail);
    } catch (error) {
      logInfo(`❌ Failed to fetch match ${matchId}: ${error.message}`);
    }
  }
  
  return matchDetails;
}

export default {
  extractMatchDetails,
};
