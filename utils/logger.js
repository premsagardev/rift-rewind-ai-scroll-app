//import fs from "fs";



export function logInfo(data){
const timestamp = new Date().toISOString();
const message = "[INFO] |" + timestamp + ": " + data;
console.error(message);
}

export function logError(data){
const timestamp = new Date().toISOString();
const message = "[ERROR] |" + timestamp + ": " + data;
console.error(message);
}

export default{
    logInfo,
    logError
}