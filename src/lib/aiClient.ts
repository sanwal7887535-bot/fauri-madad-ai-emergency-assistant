import { GoogleGenAI, Type } from '@google/genai';
import { EmergencyGuidance, Language } from '../types';

export async function generateClientSideGuidance(
  query: string,
  language: Language,
  apiKey: string,
  historyContext?: string
): Promise<EmergencyGuidance> {
  const ai = new GoogleGenAI({ apiKey });
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

  const response: any = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: promptText,
    config: {
      systemInstruction,
      temperature: 0.2,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          situation: { type: Type.STRING },
          steps: { type: Type.ARRAY, items: { type: Type.STRING } },
          doNots: { type: Type.ARRAY, items: { type: Type.STRING } },
          urgent: { type: Type.BOOLEAN },
          urgencyReason: { type: Type.STRING },
          disclaimer: { type: Type.STRING },
          urdu: {
            type: Type.OBJECT,
            properties: {
              situation: { type: Type.STRING },
              steps: { type: Type.ARRAY, items: { type: Type.STRING } },
              doNots: { type: Type.ARRAY, items: { type: Type.STRING } },
              urgencyReason: { type: Type.STRING },
              disclaimer: { type: Type.STRING }
            },
            required: ['situation', 'steps', 'doNots', 'urgencyReason', 'disclaimer']
          }
        },
        required: ['situation', 'steps', 'doNots', 'urgent', 'urgencyReason', 'disclaimer', 'urdu']
      }
    }
  });

  const rawText = response.text?.trim() || '';
  return JSON.parse(rawText);
}
