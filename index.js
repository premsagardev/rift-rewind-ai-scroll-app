import { generateSummonerStory } from "./handlers/storyHandler.js";
import { logInfo, logError } from "./utils/logger.js";

async function runRiftRewind() {
  try {
    logInfo("🎆 Welcome to Rift Rewind - AI Story Generator!");
    
    const summonerName = "Faker";
    const options = { days: 30, forceRefresh: false };
    
    // Generate complete story using AI layer
    const result = await generateSummonerStory(summonerName, options);
    
    if (result.success) {
      logInfo("✅ Rift Rewind completed successfully!");
      console.log("\n" + "=".repeat(50));
      console.log("GENERATED STORY:");
      console.log("=".repeat(50));
      console.log(result.story);
      console.log("=".repeat(50));
    } else {
      logError(`❌ Story generation failed: ${result.error}`);
    }
    
  } catch (error) {
    logError("❌ Rift Rewind failed:", error.message);
  }
}

runRiftRewind();
