// 3️⃣ ai/storyGenerator.js → Full Storytelling Orchestrator

import { buildStoryPrompt } from "./promptBuilder.js";
import { generateStory } from "../api/bedrockApi.js";
import { logInfo, logError } from "../utils/logger.js";

export async function createPlayerStory(playerData) {
  try {
    logInfo("📖 Starting story generation process...");
    
    // Step 1: Build narrative prompt
    logInfo("1. Building narrative prompt...");
    const promptText = buildStoryPrompt(playerData);
    
    // Step 2: Send to Bedrock AI
    logInfo("2. Generating AI story...");
    const generatedStory = await generateStory(promptText);
    
    // Step 3: Return complete story package
    const storyPackage = {
      playerName: playerData.playerName,
      generatedAt: new Date().toISOString(),
      prompt: promptText,
      story: generatedStory,
      stats: playerData.summary
    };
    
    logInfo("✅ Story generation completed successfully");
    return storyPackage;
    
  } catch (error) {
    logError(`❌ Story generation failed: ${error.message}`);
    throw error;
  }
}

export default {
  createPlayerStory,
};