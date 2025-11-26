# 🎮 Rift Rewind: AI-Generated League of Legends Scrolls

**Rift Rewind Scrolls** transforms a player's past season of *League of Legends* gameplay into a **cinematic AI story** — combining data analytics, storytelling, and generative AI through **AWS Bedrock** and the **Riot Games API**.  

Each "scroll" reflects the player's unique strategy, performance, and growth, narrated as if written by an *ancient AI chronicler* from the Hall of Legends.

---

## 🧠 Inspiration
Every gamer has stats — but few have *stories*.  
We wanted to turn dry match data into **emotionally resonant narratives** that celebrate each player's journey, mastery, and evolution through the Rift.

Rift Rewind bridges **data** and **emotion** — turning your win rates and KDA into your own legendary scroll.

---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|--------|-------------|----------|
| **Frontend** | React + TypeScript + Tailwind | Visual "Scroll" UI for users |
| **Backend** | AWS Lambda + API Gateway | Serverless API endpoints |
| **Data Layer** | Riot Games API | Player stats and match history |
| **AI Engine** | AWS Bedrock – Claude 4 Sonnet | Narrative generation |
| **Cache Layer** | Local JSON + File System | Reduce redundant API calls |
| **Persistence** | JSON-based mini DB | Store summaries and outputs |

---

## 🧩 System Architecture

![Rift Rewind Architecture](./docs/rift_rewind_architecture_diagram.png)

---

## 🧩 Key Features

- 🎯 **Smart Data Pipeline** – Fetches match history, summaries, and caches data locally for performance.  
- 🧠 **AI-Driven Insights** – Claude 4 Sonnet derives *player strategy archetypes* ("The Fearless Initiator", "The Calculated Commander") directly from stats.  
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
> *Now as the season ends, I raise my hand and proclaim: "For the Rift, for mastery, for the legend that endures!"*

---

## ⚙️ Setup & Run Application

### 1️⃣ Clone the repo
```bash
git clone https://github.com/premsagardev/rift-rewind-ai-scroll-app.git
cd rift-rewind
```

### 2️⃣ Backend (AWS Lambda)
The backend is deployed as AWS Lambda functions with API Gateway.

**API Endpoint:** `https://yl83u7foa9.execute-api.us-east-1.amazonaws.com/prod`

**Available Endpoints:**
- `POST /generate-story` - Generate AI story for a summoner
- `GET /health` - Health check

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
```

**Environment Configuration:**
Create `.env` file in frontend directory:
```bash
REACT_APP_API_BASE_URL=https://yl83u7foa9.execute-api.us-east-1.amazonaws.com/prod
```

### 4️⃣ Run Frontend (Development)
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000)

### 5️⃣ Build for Production
```bash
npm run build
```

### 6️⃣ Serve Production Build
```bash
# Install serve globally
npm install -g serve

# Serve the build
serve -s build
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🧩 Future Roadmap
- 🗺️ Add global leaderboard & comparison scrolls  
- 🪄 Add "Season Mood" tone selector (Epic / Reflective / Funny)  
- ☁️ Migrate cache to DynamoDB for scalability  
- 🔊 Integrate background music for scrolls  
- 📱 Mobile responsive improvements

---

## 🧑💻 Team
**Prem Sagar** — Cloud Engineer, AI Developer, and Story Architect  

---

## 🔒 Security Notes
- `.env` is **not committed**.  
- API keys are loaded only via environment variables.  
- Cached match data is excluded via `.gitignore`.

---

## 🏁 License
MIT © 2025 — Rift Rewind AI Scrolls