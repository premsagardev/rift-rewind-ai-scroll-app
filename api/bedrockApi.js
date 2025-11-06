// AWS Bedrock API Integration using AWS SDK

import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { logInfo, logError } from "../utils/logger.js";

// AWS Configuration
const client = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const MODEL_ID = process.env.BEDROCK_MODEL_ID || "anthropic.claude-3-sonnet-20240229-v1:0";

export async function generateStory(promptText) {
  try {
    logInfo("🤖 Calling AWS Bedrock API...");
    
    const input = {
      modelId: MODEL_ID,
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        messages: [{
          role: "user",
          content: [{
            type: "text",
            text: promptText
          }]
        }],
        max_tokens: 1000,
        temperature: 0.7
      })
    };
    
    const command = new InvokeModelCommand(input);
    const response = await client.send(command);
    
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    return responseBody.content[0].text;
    
    // Fallback to mock if API fails
    // await new Promise(resolve => setTimeout(resolve, 1000));
    // const mockStory = `# The Legend of ${extractPlayerName(promptText)}\n\nIn the mystical realm of the Rift...`;
    // return mockStory.trim();
    
  } catch (error) {
    logError(`❌ Bedrock API failed: ${error.message}`);
    throw error;
  }
}

function extractPlayerName(prompt) {
  try {
    const match = prompt.match(/Player: (.+)/);
    return match ? match[1] : "Unknown Champion";
  } catch (error) {
    return "Unknown Champion";
  }
}

function extractMatches(prompt) {
  try {
    const match = prompt.match(/Matches Played: (\d+)/);
    return match ? match[1] : "countless";
  } catch (error) {
    return "countless";
  }
}

function extractChampions(prompt) {
  try {
    const match = prompt.match(/Top Champions: (.+)/);
    return match ? match[1] : "legendary champions";
  } catch (error) {
    return "legendary champions";
  }
}

export default {
  generateStory,
};