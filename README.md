# Adaptive Math Quiz

A personalized math learning application that adapts to your skill level.

## Overview

Adaptive Math Quiz is an interactive web application that provides a personalized math learning experience. The app first assesses your math skills through an initial assessment and then generates tailored questions based on your performance level (beginner, intermediate, or advanced).

## Features

- **Skill Assessment**: Initial quiz to determine your math proficiency level
- **Adaptive Learning**: Personalized questions based on your assessed skill level
- **Multiple Difficulty Levels**: Beginner, intermediate, and advanced question sets
- **Topic Variety**: Questions covering arithmetic, algebra, geometry, calculus, and more
- **Performance Tracking**: Score tracking and time spent metrics
- **AI-Powered**: Uses OpenRouter API to generate dynamic math questions
- **Flexible Configuration**: Support for both OpenRouter and Ollama AI providers

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- OpenRouter API integration
- Ollama integration (optional)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenRouter API key (optional, for dynamic question generation)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/adaptive-math-quiz-vtf.git
   cd adaptive-math-quiz-vtf
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenRouter API key (optional)
   ```
   VITE_OPENROUTER_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Start Assessment**: Begin with an initial assessment to determine your math skill level
2. **Answer Questions**: Select answers from multiple choice options
3. **View Level Result**: After the assessment, see your determined skill level
4. **Take Tailored Quiz**: Continue with questions tailored to your skill level
5. **View Final Results**: See your overall performance and statistics

## Configuration

You can configure the AI provider by clicking the settings icon in the app header:

- **OpenRouter**: Use OpenRouter API (requires API key)
  - Various models available including Meta's Llama models
- **Ollama**: Use locally hosted Ollama (requires Ollama running locally)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## License

MIT

## Acknowledgments

- Powered by OpenRouter AI
- Built with React and Vite
