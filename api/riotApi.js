// this is our API connector, only for connections
import axios from "axios";
import dotenv from "dotenv";
import { logInfo, logError } from "../utils/logger.js";
import { getRoutingRegion } from "../data/regionResolver.js";

try {
  dotenv.config();
} catch (error) {
  logError('Failed to load environment variables:', error.message);
}

let API_KEY;
try {
  API_KEY = process.env.RIOT_API_KEY;
  
  if (!API_KEY) {
    throw new Error('Missing required environment variable: RIOT_API_KEY');
  }
} catch (error) {
  logError('Environment variable error:', error.message);
  throw error;
}

//  API request helper - we will be reusing the headers and error handeling
async function riotRequest(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                "X-Riot-Token": API_KEY,
            },
        });
        return {success: true, data: response.data};
    } catch (error) {
        logError("Error fetching data:", error.response?.data || error.message);
        throw error;
    }   
}


//Get Summoner by ID - we will get the puiid -> helpful in getting history
export async function getSummonerByName(name, platform = 'na1'){
    try {
        const routingRegion = getRoutingRegion(platform);
        // For most regions, try the summoner name with common taglines
        const commonTagLines = {
          'kr': ['KR1'],
          'jp1': ['JP1'], 
          'euw1': ['EUW', 'WEST'],
          'eun1': ['EUNE', 'NE'],
          'na1': ['NA1', 'NA'],
          'br1': ['BR1', 'BR'],
          'la1': ['LAN', 'LA1'],
          'la2': ['LAS', 'LA2'], 
          'tr1': ['TR1', 'TR'],
          'ru': ['RU', 'RUS']
        };
        
        const tagLines = commonTagLines[platform] || ['NA1'];
        let summonerData = null;
        
        // Try different taglines for the summoner
        for (const tagLine of tagLines) {
          try {
            const url = `https://${routingRegion}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tagLine}`;
            logInfo(`🔍 Trying: ${url}`);
            summonerData = await riotRequest(url);
            if (summonerData.success) {
              logInfo(`✅ Found summoner with tagline: ${tagLine}`);
              break;
            }
          } catch (error) {
            logInfo(`❌ Failed with tagline ${tagLine}: ${error.response?.status || error.message}`);
            continue;
          }
        }
        
        if (!summonerData || !summonerData.success) {
          throw new Error(`Summoner ${name} not found on platform ${platform} with any common taglines`);
        }
        
        return summonerData;

    } catch (error) {
        logError(`Failed to get summoner ${name} on ${platform}:`, error.message);
        throw error;
    }
}

export async function getMatchIdsByPuiid(puuid, { startTime, endTime, start = 0, count = 100, platform = 'na1' } = {}) {
    try {
        const routingRegion = getRoutingRegion(platform);
        let url = `https://${routingRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`;
        if (startTime) url += `&startTime=${startTime}`;
        if (endTime) url += `&endTime=${endTime}`;
        
        logInfo(`📋 Fetching match IDs: ${url}`);
        const data = await riotRequest(url);
        return data;
    } catch (error) {
        logError(`Failed to get match IDs for ${puuid} on ${platform}:`, error.message);
        throw error;
    }
}

export async function getMatchDetails(matchId, platform = 'na1') {
    try {
        const routingRegion = getRoutingRegion(platform);
        const url = `https://${routingRegion}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
        const data = await riotRequest(url);
        return data;
    } catch (error) {
        logError(`Failed to get match details for ${matchId} on ${platform}:`, error.message);
        throw error;
    }
}

//export all
export default {
    getSummonerByName,
    getMatchIdsByPuiid,
    getMatchDetails
}