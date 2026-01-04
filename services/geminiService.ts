import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const refineJobDescription = async (jobDescription: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      You are an elite technical recruiter for "All Well Talent", a boutique agency specializing in connecting top-tier Latin American software engineers with high-growth US startups.

      Your goal is to take a raw job description or requirement list provided by a US client and "Remix" it to attract the best LatAm talent.

      Focus on:
      1. Emphasizing remote culture and autonomy.
      2. Highlighting USD compensation competitiveness (if mentioned, otherwise imply competitive US rates).
      3. Clarifying technical challenges that would appeal to senior engineers.
      4. Keep the tone modern, bold, and professional—matching an "Awwwards" agency vibe.
      5. Output structure: A punchy 3-sentence "Hook", followed by 3 key "Why Apply" bullet points.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: `Here is the raw job requirement: "${jobDescription}". Refine this to attract top LatAm talent.`,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "Unable to generate refinement. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
