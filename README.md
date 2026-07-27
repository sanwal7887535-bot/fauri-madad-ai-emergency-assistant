# Fauri Madad (فوری امداد) — Voice-First Emergency First-Aid Website for Pakistan

**Fauri Madad** is a production-grade, fast, responsive web application designed for untrained bystanders in Pakistan to respond correctly in critical first-aid medical emergencies. The user describes an emergency by voice or text in English or Urdu; an AI model returns safety-constrained, structured first-aid guidance, which is read aloud via text-to-speech.

---

## 🌟 Key Features

1. **Voice-First Input**: Powered by Web Speech API with real-time audio wave animation and transcript streaming, with instant manual text fallback.
2. **Google AI Studio Gemini 2.5 Flash**: Server-side AI model generates structured action steps, do-not cautions, and Rescue 1122 urgency advice.
3. **Bilingual Guidance (Urdu & English)**: Seamless language toggling between English and Urdu (اردو script).
4. **Text-To-Speech (TTS) Voice Readout**: Hands-free voice playback with pause, resume, replay, and speed controls.
5. **Rescue 1122 One-Click Call Modal**: Prominent, pinned direct emergency dialer (`tel:1122`) with Pakistan emergency directory (Rescue 1122, Edhi 115, Chhipa 1020, Police 15, Fire 16) and location dispatch tips.
6. **Offline First-Aid Library**: Zero-API-call offline reference for common Pakistan emergencies (Snake bite, Electric shock, Heatstroke, Heavy bleeding, Choking, Burns).
7. **Local Session History**: Automatic offline saving to browser `localStorage` with JSON export and clear history options.
8. **Optional Personal Gemini API Key**: Users can optionally supply their own Google AI Studio Gemini key stored safely in browser `localStorage`.
9. **Dark & Light Themes**: Accessible color system with Deep Indigo, Coral Red (reserved strictly for emergency actions), and Warm Amber.

---

## 🤖 AI Provider & System Prompt

The application uses **Google Gemini 2.5 Flash** via the modern `@google/genai` TypeScript SDK on the server side (`server.ts`).

### Exact Server System Prompt
```
You are an emergency first-aid assistant for laypeople in Pakistan with no
medical training. The user is describing a real emergency happening right now.

Given their description, respond ONLY in this structure:
1. Likely Situation — one short line naming what this appears to be
2. Do This Now — 4 to 6 short, numbered, simple action steps in plain language
3. Do NOT — a short list of common mistakes to avoid in this situation
4. Call 1122 Now? — Yes or No, with a one-line reason

Rules:
- Never suggest medication names or dosages
- Never claim certainty about a diagnosis — describe only the likely situation
- Keep every step short enough to read aloud in one breath
- Always assume the user is panicked; use calm, direct, simple language
- If the description is unclear or not a medical emergency, ask one short
  clarifying question instead of guessing
- End every response with: "This is first-aid guidance only. Get professional
  medical help as soon as possible."
```

---

## 🔑 How to Get a Free Google AI Studio Key

1. Visit [Google AI Studio](https://aistudio.google.com).
2. Sign in with any Google account.
3. Click **Get API Key** and select **Create API Key**.
4. Copy your API key.
5. Set it in your environment as `GEMINI_API_KEY` or paste it into the **Settings** page inside Fauri Madad.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 19 + Vite + Express TypeScript (Full-stack architecture)
- **AI SDK**: `@google/genai` (Google GenAI SDK)
- **Styling**: Tailwind CSS v4 + Motion
- **Icons**: Lucide React
- **Voice I/O**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)

---

## 🚀 Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/fauri-madad.git
   cd fauri-madad
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file at the root:
   ```env
   GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 📜 Medical & Legal Safety Disclaimer

Fauri Madad is an AI-powered emergency first-aid informational tool. It does not provide medical diagnoses or replace emergency professional response. In any severe, life-threatening situation, dial Rescue 1122 immediately in Pakistan.
