import OpenAI from 'openai';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { HttpsProxyAgent } from 'https-proxy-agent';

const openai = new OpenAI({
    baseURL: 'https://api.gptsapi.net/v1',
    apiKey: process.env.OPENAI_API_KEY,
    httpAgent: new HttpsProxyAgent(process.env.HTTPS_PROXY as string),
});

const instructionMessage = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
}

export async function POST(request: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await request.json();
        const { messages } = body;

        if (!messages) {
            return new NextResponse("Missing messages", { status: 400 });
        }

        const response: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [instructionMessage, ...messages],
        });
        return NextResponse.json(response.choices[0]?.message, { status: 200 });
    } catch (error) {
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


