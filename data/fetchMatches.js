//Our Orchestration code to get the match data using our connector riotApi.js
// the core function is call the API to fetch match ID using the summonr name
// The Flow: Summonr name > PUIID > Match ID's

// Here we orchestrate the process of getting latest MatchID's

// Goal:
// Fetch all match IDs for a player and cache them for reuse.

// Hints:

// Import helper functions from riotApi.js and cache utilities from cacheService.js.

// Flow:

// Receive summonerName.

// Get puuid from Riot API.

// Check cache using readCache(puuid, "matchIds").

// If cache is fresh → return cached IDs.

// Else → fetch match IDs, write to cache, return the array.

// ✅ This will be the entry point for most backend workflows.
// fetchMatches.js
import { getSummonerByName, getMatchIdsByPuiid } from "../api/riotApi.js";
import { readCache, writeCache } from "./cacheService.js";
import { logInfo, logError } from "../utils/logger.js";

export async function getMatchIdsForSummoner(summonerName, { days = 90, forceRefresh = false }) {
  try {
    // 1. Normalize input and calculate start/end time
    const normalizedSummonerName = summonerName.toLowerCase().trim();
    // 2. Get PUUID from riotApi
    const summonerResponse = await getSummonerByName(normalizedSummonerName);
    const puuid = summonerResponse.data.puuid;
    // 3. Read from cache
    // 4. If cache hit and not force refresh → return cached
    
    if (!forceRefresh) {
      const cachedMatchIds = readCache(puuid, "matchIds");
      if (cachedMatchIds) {
        logInfo(`📂 Cache hit for ${puuid} (matchIds)`);
        return cachedMatchIds;
      }else{
        logInfo(`📂 Cache miss for ${puuid} (matchIds)`);
      }
    }else{
      logInfo(`📂 Cache miss for ${puuid} (matchIds)`);
    }

    
    // 5. Else fetch from riotApi
    const matchIdsResponse = await getMatchIdsByPuiid(puuid, days);
    const matchIds = matchIdsResponse.data;
    // 6. Merge + deduplicate with cached
    const mergedMatchIds = mergeAndDeduplicate(matchIds, readCache(puuid, "matchIds") || []);
    // 7. Write to cache
    writeCache(puuid, "matchIds", mergedMatchIds);
    // 8. Return list of IDs
    return mergedMatchIds;
  } catch (error) {
    logError(`Failed to get match IDs for ${summonerName}:`, error.message);
    throw error;
  }
}

function mergeAndDeduplicate(arrA, arrB) {
  // Use Set or Map to remove duplicates
  const uniqueIds = new Set([...arrA, ...arrB]);
  // Return combined array
  return Array.from(uniqueIds);
}

export default {
  getMatchIdsForSummoner,
};
