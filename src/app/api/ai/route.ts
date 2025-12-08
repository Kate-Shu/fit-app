import { NextResponse } from "next/server";
import OpenAI from "openai";
import { SYSTEM_PROMPT } from "@/utils/constants";
import { requireUserId } from "@/utils/helpers";

export const runtime = "nodejs";
const MAX_USER_CHARS = 1400;
const MAX_RESPONSE_TOKENS = 220;

export async function POST(req: Request) {
  try {
const userId = await requireUserId();
if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    
    const { prompt } = await req.json();
    console.log('promt is: ', prompt);
    
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Missing 'prompt'" }, { status: 400 });
    }
 // limit input
    const safePrompt = prompt.trim().slice(0, MAX_USER_CHARS);
    if (!safePrompt) {
      return NextResponse.json(
        { error: "Empty prompt after trimming" },
        { status: 400 }
      );
    }
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const stream = await client.chat.completions.stream({
      model: "gpt-5-nano",
      // gpt-5-nano model suppotr only temperature: 1
      // temperature: 0.2,
      max_tokens: MAX_RESPONSE_TOKENS,
      messages: [
        { role: "system", content: SYSTEM_PROMPT.slice(0, 2000) },
        { role: "user", content: safePrompt },
      ],
    });
    console.log('stream: ', stream);
    

    const readable = new ReadableStream({
      async start(controller) {
      console.log('stream: ', stream);
        try {
          for await (const chunk of stream) {
            const content = chunk.choices?.[0]?.delta?.content;
            if (content) controller.enqueue(content);
          }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.log('stream: ', stream);
          console.error("OpenAI error:", err?.message || err);
          const msg =
          typeof err?.message === "string"
            ? `\n\n(⚠️ OpenAI error: ${err.message})`
            : "\n\n(⚠️ stream error)";
          controller.enqueue(msg);
          controller.enqueue("\n\n(⚠️ stream error)");
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("OpenAI error:", err?.message || err);
    return NextResponse.json({ error: "OpenAI request failed" }, { status: 500 });
  }
}
