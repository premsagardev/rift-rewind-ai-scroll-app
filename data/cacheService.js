import {logInfo, logError} from "../utils/logger.js";
import path from "path";
import fs from "fs";


// Export a small API (functions) you’ll implement:

// ensureCacheDir()
export function ensureCacheDir(){
    try {
        const cacheDir = './data/cache';
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, {recursive: true});
        }
    } catch (error) {
        logError('Failed to create cache directory:', error.message);
        throw error;
    }
}
// getCachePath(key, type)
export function getCachePath(key, type){
    ensureCacheDir();
    const sanitizedKey = path.basename(key).replace(/[^a-zA-Z0-9_-]/g, '_');
    const sanitizedType = path.basename(type).replace(/[^a-zA-Z0-9_-]/g, '_');
    return path.join('./data/cache', `${sanitizedKey}-${sanitizedType}.json`);
}
// isCacheFresh(filePath)
export function isCacheFresh(filePath){
    try {
        const stats = fs.statSync(filePath);
        const now = new Date().getTime(); // to get latest time
        const age = now - stats.mtime.getTime();
        return age < 1000 * 60 * 60 * 24 * 7; // 7 days
    } catch (error) {
        return false;
    }
}

// readCache(key, type)
export function readCache(key, type){
    try {
        const filePath = getCachePath(key, type);
        if (fs.existsSync(filePath) && isCacheFresh(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            try {
                return JSON.parse(data);    
            } catch (error) {
                logInfo(`⚠️ Cache corrupted, clearing: ${filePath}`);
                fs.unlinkSync(filePath);
                return null;
            }
            
        }
        return null;
    } catch (error) {
        logInfo(`Error reading cache: ${error.message}`);
        return null;
    }
}

// writeCache(key, type, data)

export function writeCache(key, type, data){
    try {
        const filePath = getCachePath(key, type);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        logInfo(`💾 Data cached: ${filePath}`);
    } catch (error) {
        logError(`Failed to write cache: ${error.message}`);
        throw error;
    }
}

// clearCache(key?, type?)
export function clearCache(key, type){
    try {
        const filePath = getCachePath(key, type);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            logInfo(`🗑️ Cache cleared: ${filePath}`);
        }
    } catch (error) {
        logError(`Failed to clear cache: ${error.message}`);
        throw error;
    }
}

// (Think of key = summoner name or puuid; type = "matchIds" | "matchDetail" | "summary".)

export default {
    ensureCacheDir,
    getCachePath,
    isCacheFresh,
    readCache,
    writeCache,
    clearCache
}