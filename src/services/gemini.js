import { GoogleGenAI } from "@google/genai";
import { TWEET_PROMPT } from "../constants/commands";

export async function generateTweet(env) {
  const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: TWEET_PROMPT,
  });

  return response.text;
}
