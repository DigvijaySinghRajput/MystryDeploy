import { google } from "@ai-sdk/google";
import { streamText, UIMessage, convertToModelMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const prompt =
      "Generate exactly three short, uplifting, and slightly mysterious motivational quotes as a single, unformatted string. Each quote must be separated by '||'. INSPIRATION SOURCES: Draw specifically from the most viral, highly viewed YouTube quotes concerning: David Goggins (discipline, grind, mental toughness), workout/grind motivation (no excuses), and Lord Krishna/Bhagavad Gita (duty, devotion, inner self). STYLE: Use simple, direct language and strictly avoid all poetic, figurative, or flowery phrasing. The output must resemble an anonymous, clean note. CONSTRAINTS: Each quote must be between 7 and 12 words. The three quotes must all have different word counts.";
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
