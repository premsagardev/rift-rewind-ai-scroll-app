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

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function getMatchIdsForSummoner(summonerName, { days = 365, forceRefresh = false }) {
  try {
    const normalizedSummonerName = summonerName.toLowerCase().trim();
    const summonerResponse = await getSummonerByName(normalizedSummonerName);
    const puuid = summonerResponse.data.puuid;
    
    // Calculate time range
    const endTime = Math.floor(Date.now() / 1000);
    const startTime = endTime - (days * 24 * 60 * 60);
    
    // Determine cache key based on timeframe
    const cacheKey = days >= 365 ? "yearlyMatchIds" : "matchIds";
    const cacheFreshness = days >= 365 ? 30 : 7; // 30 days for yearly, 7 for others
    
    if (!forceRefresh) {
      const cachedData = readCache(puuid, cacheKey);
      if (cachedData && isCacheFresh(cachedData.timestamp, cacheFreshness)) {
        logInfo(`📂 Cache hit for ${puuid} (${cacheKey})`);
        return cachedData.matchIds;
      }
      logInfo(`📂 Cache miss for ${puuid} (${cacheKey})`);
    }
    
    // Fetch with pagination
    const allMatchIds = [];
    let start = 0;
    const batchSize = 100;
    let batchCount = 0;
    
    logInfo(`🔄 Fetching match history for ${days} days...`);
    
    while (true) {
      try {
        const response = await getMatchIdsByPuiid(puuid, {
          startTime,
          endTime,
          start,
          count: batchSize
        });
        
        const batchIds = response.data;
        if (!batchIds || batchIds.length === 0) break;
        
        allMatchIds.push(...batchIds);
        batchCount++;
        
        logInfo(`📦 Batch ${batchCount}: ${batchIds.length} matches (Total: ${allMatchIds.length})`);
        
        if (batchIds.length < batchSize) break;
        
        start += batchSize;
        await sleep(400); // Rate limit protection
        
      } catch (error) {
        logError(`Failed batch ${batchCount + 1}:`, error.message);
        if (batchCount === 0) throw error; // Fail if no data fetched
        break; // Continue with partial data
      }
    }
    
    const uniqueMatchIds = [...new Set(allMatchIds)];
    logInfo(`✅ Fetched ${uniqueMatchIds.length} matches for ${summonerName} (${days} days window)`);
    
    // Cache with timestamp
    const cacheData = {
      matchIds: uniqueMatchIds,
      timestamp: Date.now(),
      timeframe: { startTime, endTime, days }
    };
    writeCache(puuid, cacheKey, cacheData);
    
    return uniqueMatchIds;
    
  } catch (error) {
    logError(`Failed to get match IDs for ${summonerName}:`, error.message);
    throw error;
  }
}

function isCacheFresh(timestamp, maxAgeDays) {
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
  return (Date.now() - timestamp) < maxAgeMs;
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
