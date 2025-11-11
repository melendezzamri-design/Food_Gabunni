<<<<<<< HEAD
# Gabunni Eats

A modern restaurant website built with Next.js 15, TypeScript, and Tailwind CSS, featuring AI-powered menu recommendations and an intelligent chatbot using Google's Gemini AI.

## Features

- 🍔 Interactive menu showcase
- 🤖 AI-powered meal recommendations
- 💬 **Intelligent Chatbot (Gabby)** - 24/7 AI assistant specialized in Gabunni Eats
- 🌍 **Bilingual Support** - Full Spanish and English translations with auto-detection
- 🎛️ **Language Switcher** - Easy toggle between languages
- 📱 Responsive design
- 🎨 Modern UI with shadcn/ui components
- ⚡ Built with Next.js 15 and React 19

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## AI Features

### Chatbot - Gabby 🤖

Gabby is your friendly AI assistant powered by Google's Gemini 1.5 Flash model. Features include:

- **Specialized Knowledge**: Trained specifically on Gabunni Eats menu, location, and services
- **Bilingual**: Automatically detects and responds in Spanish or English
- **Floating Interface**: Non-intrusive chat widget in the bottom-left corner
- **Contextual Conversations**: Remembers conversation history for natural interactions
- **Instant Answers**: Quick responses about menu items, prices, location, and hours

### Menu Recommendations

To use the AI recommendation features, you'll need to set up Google AI:

1. Create a `.env.local` file in the root directory
2. Add your Google AI API key:
   ```
   GOOGLE_GENAI_API_KEY=your_api_key_here
   ```

**Get a FREE API key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey) to get your free Gemini API key.

To run the Genkit dev UI:

```bash
npm run genkit
```

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI / shadcn/ui
- **AI:** Google Gemini AI (Generative AI SDK)
- **Internationalization:** next-intl
- **Icons:** Lucide React

## Project Structure

```
src/
├── app/
│   ├── [locale]/         # Localized routes
│   │   ├── layout.tsx   # Locale-specific layout
│   │   ├── page.tsx     # Home page
│   │   ├── actions.ts   # Server actions for AI
│   │   └── chatbot-actions.ts  # Chatbot server actions
│   └── globals.css      # Global styles
├── components/
│   ├── layout/          # Header, Footer
│   ├── sections/        # Page sections
│   ├── ui/              # shadcn/ui components
│   ├── floating-chatbot.tsx  # AI Chatbot widget
│   ├── language-switcher.tsx # Language selector
│   └── order-sheet.tsx  # Shopping cart
├── lib/                 # Utilities and data
├── hooks/               # Custom React hooks
├── i18n/               # Internationalization config
│   ├── routing.ts      # Route configuration
│   └── request.ts      # Request handler
└── ai/                  # Genkit AI flows (legacy)
messages/                # Translation files
├── es.json             # Spanish translations
└── en.json             # English translations
prompts/                 # AI system prompts
├── chatbot-system.txt  # English chatbot prompt
└── chatbot-system-es.txt  # Spanish chatbot prompt
```

## License

MIT
=======
# Food_Gabunni
Gabunni food
>>>>>>> 8b1b6adc472aa9f075248378d84d2101d32bbc2d
