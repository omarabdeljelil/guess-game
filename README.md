# Emoji Guessing Game

A fun and interactive game where players try to guess the correct order of emojis. Built with React, TypeScript, and Material-UI.

## 🎮 Game Features

- Select 3-7 emojis to play with
- Drag and drop interface for arranging emojis
- Feedback on each guess showing number of correct positions
- "Solution" button to reveal the answer
- Modern and responsive UI
- Visual feedback and notifications

## 🛠️ Technologies Used

- React 19
- TypeScript 4
- Material-UI (MUI) 6
- Emotion for styling
- Notistack for notifications

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/guess-game.git
   cd guess-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to play the game

## 🎯 How to Play

1. **Setup**: Choose between 3 to 7 emojis from the available selection
2. **Start**: Click "Start Game" to begin
3. **Play**: 
   - Arrange the emojis by dragging and dropping them
   - Click "Submit Guess" to check your answer
   - The game will tell you how many emojis are in the correct position
4. **Solution**: Click the "Solution" button if you want to see the correct answer
5. **New Game**: Start a new game at any time by clicking "New Game"

## 📦 Building for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build` folder, ready for deployment.

## 🌐 Deployment

The game is deployed using GitHub Pages. To deploy your own version:

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Run the deployment command:
   ```bash
   npm run deploy
   ```

## 📝 License

This project is open source and available under the MIT License.
