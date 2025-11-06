// this is our API connector, only for connections
import axios from "axios";
import dotenv from "dotenv";
//import fs from "fs";
import { logInfo, logError } from "../utils/logger.js";

try {
  dotenv.config();
} catch (error) {
  logError('Failed to load environment variables:', error.message);
}

let API_KEY, REGION;
try {
  API_KEY = process.env.RIOT_API_KEY;
  REGION = process.env.REGION;
  
  if (!API_KEY || !REGION) {
    throw new Error('Missing required environment variables: RIOT_API_KEY or REGION');
  }
} catch (error) {
  logError('Environment variable error:', error.message);
  throw error;
}

const base = `https://${REGION}.api.riotgames.com`;

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
export async function getSummonerByName(name){
    try {
        const url = `${base}/riot/account/v1/accounts/by-riot-id/${name}/KR1`
        const data = await riotRequest(url);
        return data;
    } catch (error) {
        logError(`Failed to get summoner ${name}:`, error.message);
        throw error;
    }
}

export async function getMatchIdsByPuiid (puiid ,count = 5 ){
    try {
        const url = `${base}/lol/match/v5/matches/by-puuid/${puiid}/ids`;
        const data = await riotRequest(url);
        return data;
    } catch (error) {
        logError(`Failed to get match IDs for ${puiid}:`, error.message);
        throw error;
    }
}

export async function getMatchDetails(matchId) {
    try {
        const url = `${base}/lol/match/v5/matches/${matchId}`;
        const data = await riotRequest(url);
        return data;
    } catch (error) {
        logError(`Failed to get match details for ${matchId}:`, error.message);
        throw error;
    }
}

//export all
export default {
    getSummonerByName,
    getMatchIdsByPuiid,
    getMatchDetails
}