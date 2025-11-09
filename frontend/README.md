# 🎮 Rift Rewind Frontend

React + TypeScript frontend for the Rift Rewind AI story generator.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Create environment file
echo "REACT_APP_API_BASE_URL=https://yl83u7foa9.execute-api.us-east-1.amazonaws.com/prod" > .env
```

### Development
```bash
# Start development server
npm start
```
Open [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
# Build for production
npm run build

# Serve production build
npm install -g serve
serve -s build
```

## 🔧 Environment Configuration

Create `.env` file with:
```bash
REACT_APP_API_BASE_URL=https://yl83u7foa9.execute-api.us-east-1.amazonaws.com/prod
```

**Important:** Delete any `.env.local` or `.env.production` files to avoid conflicts.

## 🏗️ Tech Stack
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Hooks** for state management

## 📁 Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── BackgroundRunes.tsx
│   ├── Header.tsx
│   ├── InputSection.tsx
│   ├── InsightCards.tsx
│   ├── Loader.tsx
│   ├── RegionSelector.tsx
│   └── ScrollStory.tsx
├── config.ts           # API configuration
├── App.tsx             # Main app component
└── index.tsx           # App entry point
```

## 🎨 Features
- ✨ Animated background with League of Legends runes
- 🎯 Region selection for different servers
- 📊 Player insights display
- 📜 Cinematic story presentation
- 📱 Responsive design

## 🔍 Available Scripts

- `npm start` - Development server
- `npm run build` - Production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App