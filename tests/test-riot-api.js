import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

//Load API key from .env
const API_KEY = process.env.RIOT_API_KEY;
// create a summoner
const SUMMONER_NAME = "Faker";
const REGION = process.env.REGION;

if (!API_KEY || !REGION) {
    console.error('Missing required environment variables: RIOT_API_KEY or REGION');
    process.exit(1);
}

async function getSummonerData(){
    try {
        const url = `https://${REGION}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${SUMMONER_NAME}/KR1`;
        const response = await axios.get(url, {
            headers: {
                "X-Riot-Token": API_KEY,
            },
        });
        console.log("Summoner Data:", response.data);
    } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
    }
}

getSummonerData();