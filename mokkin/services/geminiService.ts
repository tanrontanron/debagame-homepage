import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedSong } from "../types";

export const generateMelody = async (promptText: string): Promise<GeneratedSong> => {
  if (!process.env.API_KEY) {
    throw new Error("APIキーが見つかりません");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemPrompt = `
    あなたは音楽作曲アシスタントです。
    あなたのタスクは、C4からC6までの音域の木琴で演奏できるシンプルなメロディを作成することです。
    ユーザーが特定の曲名を挙げた場合は、その曲を木琴向けにアレンジしてください。
    抽象的なリクエスト（例：「楽しい曲」）の場合は、オリジナル曲を作ってください。
    
    レスポンスはJSON形式で、タイトル、説明、音符の配列を含めてください。
    各音符には 'note'（例: 'C4', 'F#5'）と 'duration'（ミリ秒単位）が必要です。
    メロディは10〜30音程度のシンプルで演奏しやすいものにしてください。
    
    使用可能な音: C4, C#4, D4, D#4, E4, F4, F#4, G4, G#4, A4, A#4, B4, C5, C#5, D5, D#5, E5, F5, F#5, G5, G#5, A5, A#5, B5, C6.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            notes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  note: { type: Type.STRING },
                  duration: { type: Type.NUMBER },
                },
                required: ["note", "duration"],
              },
            },
          },
          required: ["title", "description", "notes"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("AIからの応答がありません");
    
    return JSON.parse(text) as GeneratedSong;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};