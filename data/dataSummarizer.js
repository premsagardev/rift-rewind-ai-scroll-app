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

export function summarizeMatchData(matches, puuid, options = {}) {
  try {
    if (!matches || matches.length === 0) return null;
    if (!puuid) throw new Error('PUUID is required for match summarization');
    
    let totalKills = 0, totalDeaths = 0, totalAssists = 0, wins = 0;
    const championCounts = {};
    const monthlyData = {};
    let currentStreak = 0, longestWinStreak = 0, longestLossStreak = 0;
    let lastResult = null;
    
    // Sort matches by game creation time for streak calculation
    const sortedMatches = matches.sort((a, b) => a.info.gameCreation - b.info.gameCreation);
    
    sortedMatches.forEach(match => {
      const participant = match.info.participants.find(p => p.puuid === puuid);
      if (participant) {
        totalKills += participant.kills;
        totalDeaths += participant.deaths;
        totalAssists += participant.assists;
        
        const isWin = participant.win;
        if (isWin) wins++;
        
        // Streak calculation
        if (lastResult === null || lastResult === isWin) {
          currentStreak++;
        } else {
          if (lastResult) longestWinStreak = Math.max(longestWinStreak, currentStreak);
          else longestLossStreak = Math.max(longestLossStreak, currentStreak);
          currentStreak = 1;
        }
        lastResult = isWin;
        
        const champion = participant.championName;
        championCounts[champion] = (championCounts[champion] || 0) + 1;
        
        // Monthly breakdown for yearly data
        if (options.includeMonthly) {
          const date = new Date(match.info.gameCreation);
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          if (!monthlyData[monthKey]) monthlyData[monthKey] = { matches: 0, wins: 0 };
          monthlyData[monthKey].matches++;
          if (isWin) monthlyData[monthKey].wins++;
        }
      }
    });
    
    // Final streak update
    if (lastResult) longestWinStreak = Math.max(longestWinStreak, currentStreak);
    else longestLossStreak = Math.max(longestLossStreak, currentStreak);
    
    const totalMatches = matches.length;
    const winRate = wins / totalMatches;
    const avgKDA = totalDeaths > 0 ? ((totalKills + totalAssists) / totalDeaths) : 99;
    
    const topChampions = Object.entries(championCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([champion]) => champion);
    
    const summary = {
      totalMatches,
      totalMatchesLastYear: totalMatches,
      winRate: parseFloat(winRate.toFixed(3)),
      averageWinRate: parseFloat(winRate.toFixed(3)),
      avgKDA: parseFloat(avgKDA.toFixed(2)),
      avgKills: parseFloat((totalKills / totalMatches).toFixed(1)),
      avgDeaths: parseFloat((totalDeaths / totalMatches).toFixed(1)),
      avgAssists: parseFloat((totalAssists / totalMatches).toFixed(1)),
      topChampions,
      mostPlayedChampions: topChampions,
      longestWinStreak,
      longestLossStreak
    };
    
    if (options.includeMonthly) {
      summary.monthlyBreakdown = monthlyData;
    }
    
    // Add timeframe info
    if (matches.length > 0) {
      const oldestMatch = new Date(Math.min(...matches.map(m => m.info.gameCreation)));
      const newestMatch = new Date(Math.max(...matches.map(m => m.info.gameCreation)));
      summary.timeframe = `${oldestMatch.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} – ${newestMatch.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
    }
    
    return summary;
  } catch (error) {
    logError('Failed to summarize match data:', error.message);
    throw error;
  }
}

export default {
  summarizeMatchData,
};
