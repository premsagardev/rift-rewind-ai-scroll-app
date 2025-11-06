// 1️⃣ ai/promptBuilder.js → Storytelling Seed Generator

import { logInfo } from "../utils/logger.js";

export function buildStoryPrompt(playerData) {
  try {
    logInfo("🎭 Building story prompt...");
    
    if (!playerData || !playerData.summary) {
      throw new Error('Invalid player data provided');
    }
    
    const { playerName, summary } = playerData;
    
  const promptTemplate = `
You are an advanced AI chronicler from the League of Legends Hall of Legends.
Your task is to analyze a player's past season performance and compose their "Rift Rewind Scroll" — 
a narrative reflection of their journey, strategy, and growth.

------------------------------
PLAYER DATA
Name: ${playerName}
Matches Played: ${summary.totalMatches}
Win Rate: ${(summary.winRate * 100).toFixed(0)}%
Average KDA: ${summary.avgKDA}
Top Champions: ${summary.topChampions.join(", ")}
Average Kills: ${summary.avgKills}
Average Deaths: ${summary.avgDeaths}
Average Assists: ${summary.avgAssists}
------------------------------

🎯 TASK 1: Derive Player Strategy Insights
Based on the data above, derive 2–3 short "Player Strategy Insights" that describe this player's overall approach and mindset in the Rift.
Focus on gameplay psychology, decision-making, and champion preference.

Use creative, descriptive phrases that sound like archetypes (e.g., “The Calculated Commander”, “Fearless Initiator”, “Adaptive Trickster”).
Include short reasoning behind each insight.

Here is an example of what good insights look like:
---
Example Insights:
- The Calculated Commander – Prefers control mages and rarely overextends; plays with precision and consistency.
- The Rift Sculptor – Shapes the map flow through intelligent rotations and high KDA efficiency.
- The Unbreakable Duelist – Trades death for dominance, turning every fight into a calculated risk.
---

🎭 TASK 2: Write the Story
Now, using the player data and the derived strategy insights, write a first-person story titled:
“${playerName}’s Rift Rewind Scroll”

Story Structure:
- **Act I (Origin):** Introduce the player's spirit and connection to their top champions.
- **Act II (Ascent):** Reflect on their playstyle, achievements, and evolution through the season.
- **Act III (Legacy):** Conclude with a reflective tone and a powerful battlecry that captures their essence.

Tone & Style:
- Cinematic, reflective, and emotionally resonant.
- Use metaphors drawn from League lore — magic, battle, and legacy.
- 3 short paragraphs (200–300 words total).
- Keep realism — do not fabricate champions or statistics.

🎬 OUTPUT FORMAT:
Return your response in this structure exactly:
---
Player Strategy Insights:
[derived bullet points]

Story:
[3-paragraph story]
---
`;

    logInfo("✅ Story prompt built successfully");
    return promptTemplate.trim();
    
  } catch (error) {
    logError(`❌ Failed to build prompt: ${error.message}`);
    throw error;
  }
}

export default {
  buildStoryPrompt,
};