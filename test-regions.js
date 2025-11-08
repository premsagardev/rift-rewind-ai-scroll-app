import { generateSummonerStory } from "./handlers/storyHandler.js";
import { logInfo, logError } from "./utils/logger.js";

async function testRegions() {
  try {
    logInfo("🌍 Testing region functionality...");
    
    // Test different regions
    const tests = [
      { summoner: "Faker", platform: "kr", region: "Korea" },
      { summoner: "Doublelift", platform: "na1", region: "North America" }
    ];
    
    for (const test of tests) {
      logInfo(`\n=== Testing ${test.summoner} on ${test.region} (${test.platform}) ===`);
      
      try {
        const result = await generateSummonerStory(test.summoner, { 
          mode: 'light', 
          platform: test.platform 
        });
        
        if (result.success) {
          logInfo(`✅ ${test.summoner} (${test.platform}): ${result.stats?.totalMatches || 'N/A'} matches`);
          logInfo(`📍 Platform: ${result.stats?.platform}`);
        } else {
          logError(`❌ ${test.summoner} (${test.platform}): ${result.error}`);
        }
      } catch (error) {
        logError(`❌ ${test.summoner} (${test.platform}): ${error.message}`);
      }
    }
    
  } catch (error) {
    logError("❌ Region test failed:", error.message);
  }
}

testRegions();