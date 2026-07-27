import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers for Vercel deployment
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-user-api-key'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { query, language = 'en', historyContext } = req.body || {};

  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Emergency description is required. Please speak or type what is happening.'
    });
  }

  const userApiKey = req.headers['x-user-api-key'] as string | undefined;
  const activeApiKey = (userApiKey && userApiKey.trim().length > 5) ? userApiKey.trim() : process.env.GEMINI_API_KEY;

  if (!activeApiKey) {
    return res.status(500).json({
      success: false,
      error: 'GEMINI_API_KEY is not configured on server and no personal key was supplied.'
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: activeApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const isUrduMode = language === 'ur';

    const systemInstruction = `You are an emergency first-aid assistant for laypeople in Pakistan with no medical training. The user is describing a real emergency happening right now.

Given their description, respond ONLY in this structure:
1. Likely Situation — one short line naming what this appears to be
2. Do This Now — 4 to 7 comprehensive, immediate, sequential action steps in clear, plain language covering all critical life-saving actions required for this specific emergency
3. Do NOT — a short list of common dangerous mistakes to avoid in this situation
4. Call 1122 Now? — Yes or No, with a one-line reason

Rules:
- Never suggest medication names or dosages
- Never claim certainty about a diagnosis — describe only the likely situation
- Make sure EVERY immediate step required for safety is included (do not skip vital first-aid steps)
- Keep each step clear, direct, and speakable aloud in one breath
- Always assume the user is panicked; use calm, direct, simple language
- If the description is unclear or not a medical emergency, ask one short clarifying question instead of guessing
- End every response with: "This is first-aid guidance only. Get professional medical help as soon as possible."
- BILINGUAL REQUIREMENT: You MUST ALWAYS populate BOTH the top-level fields AND the "urdu" nested object.
- CRITICAL LANGUAGE DIRECTIVE: ${
      isUrduMode
        ? 'The user interface language is URDU. You MUST write ALL top-level fields (situation, steps, doNots, urgencyReason, disclaimer) AND all nested "urdu" fields in clear, authentic, natural URDU SCRIPT (اردو). Do NOT return English text in any field when language is "ur".'
        : 'Provide top-level fields in English and all "urdu" nested fields in clear, authentic URDU SCRIPT (اردو).'
    }`;

    const promptText = `User Emergency Description: "${query.trim()}"
${historyContext ? `Previous context: ${historyContext}` : ''}
Preferred user interface language: ${language}`;

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('AI response timed out after 10 seconds. Please check connection or call 1122 immediately.')), 10000)
    );

    const apiCallPromise = ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            situation: { type: Type.STRING, description: 'Likely Situation (one short line in English)' },
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '4 to 6 short, numbered action steps in plain English'
            },
            doNots: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Common mistakes to avoid in plain English'
            },
            urgent: { type: Type.BOOLEAN, description: 'true if Rescue 1122 should be called immediately' },
            urgencyReason: { type: Type.STRING, description: 'One-line reason for 1122 urgency decision' },
            disclaimer: { type: Type.STRING, description: 'Mandatory disclaimer statement' },
            urdu: {
              type: Type.OBJECT,
              description: 'Urdu (اردو) language translation',
              properties: {
                situation: { type: Type.STRING, description: 'Likely situation in Urdu script' },
                steps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Action steps in Urdu script'
                },
                doNots: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Do Nots in Urdu script'
                },
                urgencyReason: { type: Type.STRING, description: '1122 reason in Urdu script' },
                disclaimer: { type: Type.STRING, description: 'Disclaimer in Urdu script' }
              },
              required: ['situation', 'steps', 'doNots', 'urgencyReason', 'disclaimer']
            }
          },
          required: ['situation', 'steps', 'doNots', 'urgent', 'urgencyReason', 'disclaimer', 'urdu']
        }
      }
    });

    const response: any = await Promise.race([apiCallPromise, timeoutPromise]);
    const rawText = response.text?.trim() || '';
    const parsedData = JSON.parse(rawText);

    return res.status(200).json({
      success: true,
      data: parsedData,
      sourceKey: userApiKey ? 'personal' : 'default'
    });
  } catch (error: any) {
    console.error('Vercel Gemini guidance error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'An unexpected error occurred while processing first-aid guidance. If this is a severe emergency, dial 1122 immediately.'
    });
  }
}
