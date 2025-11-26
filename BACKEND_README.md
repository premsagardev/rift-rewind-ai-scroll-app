# 🎮 Rift Rewind Backend

AWS Lambda-based serverless backend for generating AI-powered League of Legends stories.

## 🏗️ Architecture
- **AWS Lambda** - Serverless compute
- **API Gateway** - REST API endpoints
- **AWS Bedrock** - Claude 4 Sonnet for AI generation
- **Riot Games API** - Player data and match history

## 🌐 Deployed Endpoints

**Base URL:** `https://yl83u7foa9.execute-api.us-east-1.amazonaws.com/prod`

### Available Endpoints:
- `POST /generate-story` - Generate AI story for a summoner
- `GET /health` - Health check

## 📡 API Usage

### Generate Story
```bash
POST /generate-story
Content-Type: application/json

{
  "summonerName": "Faker",
  "region": "kr"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "insights": [
      {
        "title": "The Calculated Commander",
        "description": "Masters control mages with tactical precision"
      }
    ],
    "story": "I am Faker, the echo of perfection on the Rift..."
  }
}
```

### Health Check
```bash
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-27T10:30:00Z"
}
```

## 🔧 Environment Variables

The Lambda functions use these environment variables:
- `AWS_REGION` - AWS region (us-east-1)
- `BEDROCK_MODEL_ID` - Claude model ID
- `RIOT_API_KEY` - Riot Games API key

## 📁 Project Structure
```
rift-rewind/
├── ai/                    # AI story generation
│   ├── promptBuilder.js
│   └── storyGenerator.js
├── api/                   # External API integrations
│   ├── bedrockApi.js
│   └── riotApi.js
├── data/                  # Data processing
│   ├── cacheService.js
│   ├── dataExtractor.js
│   ├── dataManager.js
│   └── dataSummarizer.js
├── handlers/              # Lambda handlers
│   ├── matchHandler.js
│   ├── storyHandler.js
│   └── summonerHandler.js
└── utils/                 # Utilities
    ├── errorHandler.js
    └── logger.js
```

## 🚀 Deployment

The backend is deployed using AWS SAM (Serverless Application Model):

```bash
# Build
sam build

# Deploy
sam deploy --guided
```

## 🔍 Supported Regions
- `na1` - North America
- `euw1` - Europe West
- `eune1` - Europe Nordic & East
- `kr` - Korea
- `br1` - Brazil
- `la1` - Latin America North
- `la2` - Latin America South
- `oc1` - Oceania
- `ru` - Russia
- `tr1` - Turkey
- `jp1` - Japan

## 🛡️ Error Handling
- Invalid summoner names return 404
- Rate limiting handled with exponential backoff
- AWS service errors logged and returned as 500