# AI Text Toolkit ✦

A sleek, AI-powered text utility built with vanilla HTML, CSS, and JavaScript. Paste any text and choose from 6 AI modes powered by Google's Gemini API.

## 🌐 Live Demo

[ai-text-toolkit.netlify.app](https://ai-text-toolkit.netlify.app)

## 📋 Project Overview

A single-page web app that leverages Google's Gemini 2.5 Flash API to process text in multiple ways. Users paste text, select a transformation mode, and the AI handles the rest. Features include real-time character counting, one-click copy, error handling, and a modern glassmorphism UI.

## ✨ Key Features

### 6 AI Modes
- **Summarize** — Generate concise summaries with key points (bullet format for long text)
- **Fix Grammar** — Correct spelling, grammar, and punctuation (no meaning change)
- **Rewrite Formal** — Transform text to professional, business tone
- **Rewrite Casual** — Make text friendly, conversational, and relaxed
- **Translate** — Auto-detect language and translate to English (or Urdu if already English)
- **Extract Points** — Pull out key points as a numbered list

### Smart UX
- **Live Character Counter** — Shows `X / 3000` characters (3000 max)
- **Copy with One Click** — Copies output to clipboard + "Copied ✓" feedback
- **Loading States** — Shows "Thinking..." while API processes
- **Error Handling** — Clear error messages (missing text, invalid API key, API errors)
- **Help Modal** — Interactive popover with step-by-step API key setup
- **Markdown Support** — Output renders formatted text (bold, lists, links, etc.)

### Design
- **Glassmorphism UI** — Modern frosted glass effect with backdrop blur
- **Gradient Backgrounds** — Subtle purple and red gradient lights
- **Smooth Animations** — Fade-in effect for output, hover states, button effects
- **Responsive Layout** — Works on desktop, tablet, and mobile
- **Dark Theme** — Easy on the eyes with proper contrast ratios

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **AI API:** Google Gemini 2.5 Flash 
- **Markdown Parser:** Marked.js CDN
- **Hosting:** Netlify
- **API Auth:** User provides their own Google API key

---

## 📁 Project Structure

```
ai-text-toolkit/
│
├── index.html              # Main HTML
├── css/
│   └── style.css          # All styling (glassmorphism, animations, responsive)
├── js/
│   └── script.js          # API calls, event listeners, prompt building
├── assets/
│   ├── before.png         # Screenshot before using app
│   └── after.png          # Screenshot after running AI
└── README.md
```

---

## 🎯 How It Works

### User Flow
```
1. User pastes text in textarea
2. Selects a transformation mode (dropdown)
3. Enters their Gemini API key
4. Clicks "Run" button
   ├─ Validates inputs (text + API key required)
   ├─ Disables button, shows "Thinking..."
   ├─ Builds custom prompt based on mode
   ├─ Sends POST request to Gemini API
   ├─ Receives AI response
   ├─ Parses as Markdown and displays
   └─ Re-enables button
5. Clicks "Copy" to copy result to clipboard
```

### Key JavaScript Functions

| Function | Purpose |
|---|---|
| `buildPrompt(text, mode)` | Creates mode-specific prompts for Gemini |
| `runAI()` | Main function that handles API call and response |
| Event listeners | Handle modal, copy button, keyboard shortcuts (Escape) |

---

## 🔌 Gemini API Integration

### API Endpoint
```
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
```

### How It Works
```javascript
// Request structure
{
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-goog-api-key": userApiKey
  },
  body: {
    contents: [
      {
        parts: [
          { text: "Your custom prompt here" }
        ]
      }
    ]
  }
}

// Response structure
{
  candidates: [
    {
      content: {
        parts: [
          { text: "AI response here" }
        ]
      }
    }
  ]
}
```

### Why Gemini 2.5 Flash?
- ✅ **Fastest** — Sub-second response times
- ✅ **Free tier available** — Up to 15 requests per minute
- ✅ **Latest model** — Cutting-edge AI capabilities
- ✅ **Markdown support** — Output can include formatting
- ✅ **Reliable** — Google's production API

---

## 🚀 Getting Started

### Prerequisites
- Google account (free)
- Gemini API key (free from Google)

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Saqib216/ai-text-toolkit.git
   cd ai-text-toolkit
   ```

2. **Open `index.html`:**
   - Double-click the file, or
   - Use VS Code Live Server (Right-click → Open with Live Server)

3. **Get your Gemini API key:**
   - Go to [aistudio.google.com](https://aistudio.google.com)
   - Sign in with Google
   - Click "Get API Key" (left panel)
   - Click "Create API key"
   - Copy the key

4. **Paste API key in the app:**
   - Open the running app
   - Click "Need Help?" button for step-by-step instructions
   - Or manually paste your key in the API key input field

5. **Start using:**
   - Paste text
   - Pick a mode
   - Click "Run"

---

## 💡 Prompt Engineering

Each mode has a custom prompt designed for quality output:

### Summarize
```
Summarize the following text in a clear, concise way. 
Use bullet points if the text is long. 
Keep the most important ideas only.
```

### Fix Grammar
```
Fix all grammar, spelling, and punctuation errors.
Do not change the meaning, tone, or structure — only fix mistakes.
Return only the corrected text, nothing else.
```

### Rewrite Formal
```
Rewrite the following text in a professional and formal tone.
Use proper vocabulary, avoid slang or casual language.
Keep the original meaning intact.
```

### Rewrite Casual
```
Rewrite the following text in a casual, friendly, conversational tone.
Make it sound natural and relaxed, like texting a friend.
Keep the original meaning intact.
```

### Translate
```
Detect the language and translate to English.
If already in English, translate to Urdu.
Return only the translated text, nothing else.
```

### Extract Points
```
Extract the key points from the following text.
Present them as a numbered list.
Each point should be one clear, standalone sentence.
```

---

## 🎨 Design Features

### Color Scheme (CSS Variables)
```css
--accent: #7c6aff (Purple)
--accent-hover: #9b8dff (Lighter Purple)
--bg-primary: #0f1117 (Very Dark)
--bg-secondary: #1a1d27 (Dark)
--text-primary: #f0f0f0 (Light Gray)
--text-secondary: #9a9ab0 (Medium Gray)
--error: #ff5f6d (Red)
--success: #3ecf8e (Green)
```

### Key CSS Techniques
- **Glassmorphism** — `backdrop-filter: blur(12px)` + semi-transparent background
- **Gradient Lights** — `radial-gradient` with purple and red at fixed positions
- **Custom Dropdown** — SVG arrow icon, styled select element
- **Focus States** — Purple glow on input focus
- **Smooth Transitions** — All interactive elements use `--transition: all 0.35s ease`
- **Fade-in Animation** — Output text fades in when loaded
- **Custom Scrollbar** — Matches dark theme aesthetic

---

## 📱 Responsive Design

The app is fully responsive:
- **Desktop (1024px+):** Two-column layout side-by-side
- **Tablet (768px - 1023px):** Adjusted spacing and font sizes
- **Mobile (<768px):** Single-column stacked layout

---

## ✅ Error Handling

The app handles these scenarios:

| Scenario | Behavior |
|---|---|
| Empty text field | Shows: "Please enter some text" |
| Missing API key | Shows: "Please enter the API key" |
| Invalid API key | Shows: "API Error: 401" + specific error |
| Network error | Shows: "Error: Failed to fetch" |
| API rate limit | Shows: "API Error: 429" (wait a minute) |
| Malformed response | Shows: "No response from API" |

---

## 🐛 Troubleshooting

| Problem | Solution |
|---|---|
| "API Error: 401" | API key is invalid or expired. Get a fresh key from aistudio.google.com |
| "API Error: 429" | Too many requests. Wait a minute and try again (free tier: 15 req/min) |
| No output, just loading... | Check internet connection; API might be slow |
| Copy button not working | Check if there's actual output to copy (not the default message) |
| Modal won't close | Press `Escape` key or click outside the modal |

---

## 🧠 What You'll Learn

Building this project teaches you:
- ✅ **Fetch API** — POST requests with custom headers
- ✅ **Async/Await** — Handling asynchronous API calls cleanly
- ✅ **Error Handling** — Try/catch blocks and user-friendly error messages
- ✅ **DOM Manipulation** — Creating, modifying, and removing elements
- ✅ **Event Listeners** — Click, input, keyboard events
- ✅ **Prompt Engineering** — Writing effective prompts for different use cases
- ✅ **Advanced CSS** — Glassmorphism, gradients, animations, custom properties
- ✅ **Markdown Parsing** — Using external libraries (marked.js)
- ✅ **Responsive Design** — Mobile-first approach with media queries
- ✅ **UX/UI Patterns** — Loading states, modals, copy-to-clipboard feedback

---

## 🚀 Future Enhancements

- [ ] **History** — Save past conversions with localStorage
- [ ] **Custom Prompts** — Let users write their own prompt templates
- [ ] **Dark/Light Theme** — Toggle between themes
- [ ] **Keyboard Shortcuts** — Enter to run, Ctrl+C to copy
- [ ] **Export Options** — Download as TXT, PDF, or Word doc
- [ ] **Multiple Models** — Support GPT-4, Claude, or other APIs
- [ ] **Conversation Mode** — Multi-turn chat with context preservation
- [ ] **Authentication** — Backend API key storage (so users don't expose keys)

---

## 📊 Project Stats

- **Lines of HTML:** ~150
- **Lines of CSS:** ~400+
- **Lines of JavaScript:** ~250+
- **API Endpoints:** 1 (Gemini)
- **Modes:** 6
- **Max Text Length:** 3000 characters
- **Response Time:** < 3 seconds (usually < 1 second)

---

## 📧 Contact

- **GitHub:** [github.com/Saqib216](https://github.com/Saqib216)
- **Portfolio:** [saqib-portfo.netlify.app](https://saqib-portfo.netlify.app)
- **Instagram:** [@itx.saqib.hussnain](https://instagram.com/itx.saqib.hussnain)

---

## 📝 License

This project is open source and available for educational and personal use.

---

## 🙏 Credits

- **Gemini API:** [Google AI Studio](https://aistudio.google.com)
- **Markdown Parser:** [Marked.js](https://marked.js.org)
- **Icons & SVGs:** Custom inline SVGs

---

**Made with ❤️ by Saqib Hussnain**

*A project to master API integration, advanced CSS design, and building practical AI-powered applications.*