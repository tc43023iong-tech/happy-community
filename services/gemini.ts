import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const explainTerm = async (term: string): Promise<string> => {
  if (!apiKey) return "請先設定 API Key 喔！🔑";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Explain what "${term}" is to a 4th-grade student in Traditional Chinese. 
      Use a cute, friendly, and encouraging tone. 
      Use emojis to make it fun. 
      Keep it short (under 80 words).`,
    });
    return response.text || "哎呀，我想不出來了...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "連線有一點點問題，請稍後再試！📡";
  }
};

export const chatWithMentor = async (userMessage: string, context: string): Promise<string> => {
  if (!apiKey) return "請先設定 API Key 喔！🔑";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Context: ${context}
      
      User Input: ${userMessage}
      
      Role: You are a friendly, wise owl mentor talking to a 4th grader.
      Task: Respond to the student's thought about the story or scenario.
      Tone: Encouraging, gentle, educational, retro cute style. Use Traditional Chinese.
      Length: Keep it under 60 words.`,
    });
    return response.text || "嗯... 讓我想想...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "老師現在有點忙，等一下喔！";
  }
};