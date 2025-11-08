import { getSummonerByName } from "./api/riotApi.js";
import { logInfo, logError } from "./utils/logger.js";

async function testSummoner() {
  try {
    logInfo("🧪 Testing summoner lookup...");
    
    // Test a known summoner
    const result = await getSummonerByName("Faker", "kr");
    
    if (result && result.success) {
      logInfo(`✅ Found Faker: ${result.data.puuid}`);
    } else {
      logError("❌ Failed to find Faker");
    }
    
  } catch (error) {
    logError("❌ Test failed:", error.message);
  }
}

testSummoner();