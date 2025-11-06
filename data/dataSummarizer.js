// 📊 4. dataSummarizer.js → Insights Generator

// Goal:
// Extract and simplify key information (kills, assists, win rate, role frequency).

// Hints:

// Read from match details.

// Calculate high-level summaries like:

// Average KDA.

// Favorite champions.

// Win % by lane or role.

// Preferred playstyle.

// Output: A summarized JSON object (ready for AI use or DB storage).

// ✅ AI input source later.

// dataSummarizer.js
import { logInfo, logError } from "../utils/logger.js";

export function summarizeMatchData(matches, puuid) {
  try {
    if (!matches || matches.length === 0) return null;
    if (!puuid) throw new Error('PUUID is required for match summarization');
    
    let totalKills = 0, totalDeaths = 0, totalAssists = 0, wins = 0;
    const championCounts = {};
    
    matches.forEach(match => {
      const participant = match.info.participants.find(p => p.puuid === puuid);
      if (participant) {
        totalKills += participant.kills;
        totalDeaths += participant.deaths;
        totalAssists += participant.assists;
        if (participant.win) wins++;
        
        const champion = participant.championName;
        championCounts[champion] = (championCounts[champion] || 0) + 1;
      }
    });
    
    const totalMatches = matches.length;
    const avgKDA = totalDeaths > 0 ? ((totalKills + totalAssists) / totalDeaths).toFixed(2) : "Perfect";
    const topChampions = Object.entries(championCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([champion]) => champion);
    
    return {
      totalMatches,
      winRate: (wins / totalMatches).toFixed(2),
      avgKDA,
      avgKills: (totalKills / totalMatches).toFixed(1),
      avgDeaths: (totalDeaths / totalMatches).toFixed(1),
      avgAssists: (totalAssists / totalMatches).toFixed(1),
      topChampions
    };
  } catch (error) {
    logError('Failed to summarize match data:', error.message);
    throw error;
  }
}

export default {
  summarizeMatchData,
};
