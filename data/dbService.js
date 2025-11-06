// dbService.js → Persistence Layer

// Goal:
// Store structured summaries into DynamoDB.

// Hints:

// Use AWS SDK for JS v3 (or local JSON for testing).

// Handle:

// Batch inserts

// Update-if-exists logic

// Store: { playerId, season, summaryData }

// ✅ You’ll replace local caching with persistent DB here later.

// dbService.js
import fs from "fs";
import path from "path";
import { logInfo, logError } from "../utils/logger.js";

const DB_PATH = "./data/db";

export function savePlayerSummary(playerName, data) {
  try {
    if (!fs.existsSync(DB_PATH)) {
      fs.mkdirSync(DB_PATH, { recursive: true });
    }
    
    const sanitizedName = path.basename(playerName).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filePath = path.join(DB_PATH, `${sanitizedName}-summary.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    logInfo(`💾 Player summary saved: ${filePath}`);
  } catch (error) {
    logError(`Failed to save player summary for ${playerName}:`, error.message);
    throw error;
  }
}

export function readPlayerSummary(playerName) {
  try {
    const sanitizedName = path.basename(playerName).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filePath = path.join(DB_PATH, `${sanitizedName}-summary.json`);
    
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    
    return null;
  } catch (error) {
    logError(`Failed to read player summary for ${playerName}:`, error.message);
    return null;
  }
}

export default {
  savePlayerSummary,
  readPlayerSummary,
};
