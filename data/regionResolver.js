// Region resolver for Riot API routing
import { logInfo } from "../utils/logger.js";

const regionMap = {
  na1: "americas", 
  br1: "americas", 
  la1: "americas", 
  la2: "americas",
  euw1: "europe", 
  eun1: "europe", 
  tr1: "europe", 
  ru: "europe",
  kr: "asia", 
  jp1: "asia"
};

const regionNames = {
  na1: "North America",
  euw1: "Europe West", 
  eun1: "Europe Nordic & East",
  kr: "Korea",
  jp1: "Japan",
  br1: "Brazil",
  la1: "Latin America North",
  la2: "Latin America South",
  tr1: "Turkey",
  ru: "Russia"
};

export function getRoutingRegion(platform) {
  const routingRegion = regionMap[platform] || "americas";
  logInfo(`🌍 Platform: ${platform} → Routing Region: ${routingRegion}`);
  return routingRegion;
}

export function getRegionName(platform) {
  return regionNames[platform] || platform.toUpperCase();
}

export function isValidPlatform(platform) {
  return Object.keys(regionMap).includes(platform);
}

export default {
  getRoutingRegion,
  getRegionName,
  isValidPlatform
};