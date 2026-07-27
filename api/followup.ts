import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

  const { previousSituation, question } = req.body || {};

  if (!question || typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ success: false, error: 'Question is required.' });
  }

  const userApiKey = req.headers['x-user-api-key'] as string | undefined;
  const activeApiKey = (userApiKey && userApiKey.trim().length > 5) ? userApiKey.trim() : process.env.GEMINI_API_KEY;

  if (!activeApiKey) {
    return res.status(500).json({ success: false, error: 'API key is missing.' });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: activeApiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });

    const systemInstruction = `You are an emergency first-aid assistant for laypeople in Pakistan.
The user is asking a follow-up question regarding a current emergency situation: "${previousSituation || 'Emergency'}".
Answer calmly in 2-3 short, bullet points or simple sentences.
Rules:
- Never prescribe medicines or dosages.
- Remind the user to call 1122 if condition worsens.
- Keep responses clear and straightforward. Provide Urdu translation if possible.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Follow-up question: "${question}"`,
      config: {
        systemInstruction,
        temperature: 0.3,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: { type: Type.STRING, description: 'Clear short answer in English' },
            urduAnswer: { type: Type.STRING, description: 'Clear short answer in Urdu script' }
          },
          required: ['answer', 'urduAnswer']
        }
      }
    });

    const parsedData = JSON.parse(response.text?.trim() || '{}');
    return res.status(200).json({ success: true, data: parsedData });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message || 'Failed to answer follow-up question.' });
  }
}
