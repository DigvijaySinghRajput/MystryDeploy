import { google } from "@ai-sdk/google";
import { streamText, UIMessage, convertToModelMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const prompt =
      "Generate exactly three short, uplifting, and slightly mysterious motivational quotes as a single string. Each quote should be separated by '||'. Draw inspiration from Premanand Ji Maharaj (devotion, meditation, inner strength), David Goggins (grit, discipline, mental toughness), and other motivational figures. The quotes should feel like anonymous notes that spark curiosity, resilience, and encouragement without requiring a reply. Each quote must be between 7 and 12 words, with each of the three quotes having a different length. Focus on themes such as devotion, discipline, grinding, pushing limits, meditation, or workout motivation.";
    const result = streamText({
      model: google("gemini-2.5-flash"),
      prompt: prompt,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.log("An unexpected error happend");
    throw error;
  }
}
