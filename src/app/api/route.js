import { NextResponse } from "next/server";

const defaultSettings = {
  role: "system",
  content: "you are a cook right?"
}


export async function POST(request, response) {
  const ctx = await request.json();
  const data = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [{ ...ctx, ...defaultSettings }],
    }),
  });
  const responses = await data.json();
  const { finish_reason, message } = responses.choices[0];
  if (finish_reason !== "stop") return NextResponse.json({ status: 500, message: "internal error" });
  return NextResponse.json({ statusCode: 200, message: message.content });
}
