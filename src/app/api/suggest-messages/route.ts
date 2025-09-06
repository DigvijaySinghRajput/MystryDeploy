import { google } from "@ai-sdk/google";
import { streamText, UIMessage, convertToModelMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const prompt =
      "Generate a list of three short, cryptic, and intriguing messages formatted as a single string. Each message should be separated by '||'. The messages should feel mysterious, poetic, or slightly unsettling — like anonymous notes that spark curiosity but dont require a reply. Avoid personal, sensitive, or offensive content. Keep each message under 15 words.";

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
