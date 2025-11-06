# 🎮 Rift Rewind: AI-Generated League of Legends Scrolls

**Rift Rewind Scrolls** transforms a player’s past season of *League of Legends* gameplay into a **cinematic AI story** — combining data analytics, storytelling, and generative AI through **AWS Bedrock** and the **Riot Games API**.  

Each “scroll” reflects the player’s unique strategy, performance, and growth, narrated as if written by an *ancient AI chronicler* from the Hall of Legends.

---

## 🧠 Inspiration
Every gamer has stats — but few have *stories*.  
We wanted to turn dry match data into **emotionally resonant narratives** that celebrate each player’s journey, mastery, and evolution through the Rift.

Rift Rewind bridges **data** and **emotion** — turning your win rates and KDA into your own legendary scroll.

---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|--------|-------------|----------|
| **Frontend** | React + Tailwind *(Planned)* | Visual “Scroll” UI for users |
| **Backend** | Node.js + Express | Orchestration & API endpoints |
| **Data Layer** | Riot Games API | Player stats and match history |
| **AI Engine** | AWS Bedrock – Claude 4 Sonnet | Narrative generation |
| **Cache Layer** | Local JSON + File System | Reduce redundant API calls |
| **Persistence** | JSON-based mini DB | Store summaries and outputs |

---

## 🧩 System Architecture

![Rift Rewind Architecture](./docs/rift_rewind_architecture_diagram.png)

---

## 🧱 Project Structure

```
rift-rewind-ai-scroll-app/
├── index.js
├── api/
│   ├── riotApi.js
│   └── bedrockApi.js
├── ai/
│   ├── promptBuilder.js
│   └── storyGenerator.js
├── data/
│   ├── cacheService.js
│   ├── dataExtractor.js
│   ├── dataManager.js
│   ├── dataSummarizer.js
│   ├── dbService.js
│   └── fetchMatches.js
├── handlers/
│   ├── matchHandler.js
│   ├── storyHandler.js
│   └── summonerHandler.js
├── utils/
│   └── logger.js
├── .gitignore
├── package.json
└── .env.example
```

---

## 🧩 Key Features

- 🎯 **Smart Data Pipeline** – Fetches match history, summaries, and caches data locally for performance.  
- 🧠 **AI-Driven Insights** – Claude 4 Sonnet derives *player strategy archetypes* (“The Fearless Initiator”, “The Calculated Commander”) directly from stats.  
- 🎭 **Storytelling Engine** – Converts gameplay data into a first-person cinematic narrative.  
- 💾 **Caching Layer** – Avoids redundant API calls, improving local test speed.  
- 🧩 **Modular Architecture** – Clear separation between data, AI, and API handlers.  

---

## 🧠 Sample Output

**Player Strategy Insights:**
- The Calculated Commander — Masters control mages with tactical precision.  
- The Rift Sculptor — Shapes fights with high KDA and low death rate.  
- The Adaptive Duelist — Shifts tempo between aggression and restraint.

**Story:**
> *I am Faker, the echo of perfection on the Rift. Each lane bends to my rhythm…*  
> *My control was my weapon — patience and precision forged in battle…*  
> *Now as the season ends, I raise my hand and proclaim: “For the Rift, for mastery, for the legend that endures!”*

---

## ⚙️ Setup & Run Locally

### 1️⃣ Clone the repo
```bash
git clone https://github.com/premsagardev/rift-rewind-ai-scroll-app.git
cd rift-rewind-ai-scroll-app
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create `.env` file
```bash
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
BEDROCK_MODEL_ID=anthropic.claude-4-sonnet-20241022-v1:0
BEDROCK_MODEL_ENDPOINT=https://bedrock-runtime.us-east-1.amazonaws.com
RIOT_API_KEY=your_riot_api_key
```

### 4️⃣ Run the backend
```bash
node index.js
```

### 5️⃣ Test story generation
```bash
node test-riot-api.js
```

---

## 🧩 Future Roadmap
- 🌐 Build React + Tailwind frontend for story visualization  
- 🗺️ Add global leaderboard & comparison scrolls  
- 🪄 Add “Season Mood” tone selector (Epic / Reflective / Funny)  
- ☁️ Migrate cache to DynamoDB for scalability  
- 🔊 Integrate background music for scrolls  

---

## 🧑‍💻 Team
**Prem Sagar** — Cloud Engineer, AI Developer, and Story Architect  

---

## 🔒 Security Notes
- `.env` is **not committed**.  
- API keys are loaded only via environment variables.  
- Cached match data is excluded via `.gitignore`.

---

## 🏁 License
MIT © 2025 — Rift Rewind AI Scrolls
