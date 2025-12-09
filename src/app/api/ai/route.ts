import { NextResponse } from "next/server";
import OpenAI from "openai";
import { SYSTEM_PROMPT } from "@/utils/constants";
import { checkAndConsumeQuota } from "@/lib/AiQuota";
import { auth } from "@/auth/auth";

export const runtime = "nodejs";
const MAX_USER_CHARS = 1400;
// const MAX_RESPONSE_TOKENS = 220;

export async function POST(req: Request) {
  try {
    // 1
    // TODO here have error
const session = await auth();
console.log("SESSION IN /api/ai:", session, '---end---');

if (!session?.user) {
  return NextResponse.json(
    { error: "You must be logged in to use the AI assistant." },
    { status: 401 }
  );
}

const userId =
  (session.user as any).id ??
  (session.user as any).email;

console.log("userId from session:", userId);

if (!userId) {
  return NextResponse.json(
    { error: "Could not get user identifier from session." },
    { status: 401 }
  );
}


  // 2️⃣ QUOTA / RATE LIMIT – ліміти по акаунту
    const quota = await checkAndConsumeQuota(userId);
    if (!quota.ok) {
      return NextResponse.json(
        { error: quota.message },
        { status: quota.status }
      );
    }
    console.log('quota is: ', quota);
    
      // 3️⃣ INPUT – читаємо і обрізаємо промпт
    const body = await req.json().catch(() => null);
    const prompt = body?.prompt;

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
      // max_completion_tokens: MAX_RESPONSE_TOKENS,
      messages: [
        { role: "system", content: SYSTEM_PROMPT.slice(0, 2000) },
        { role: "user", content: safePrompt },
      ],
    });
  

    const readable = new ReadableStream({
      async start(controller) {
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
