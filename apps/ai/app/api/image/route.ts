import OpenAI from 'openai';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { HttpsProxyAgent } from 'https-proxy-agent';

const openai = new OpenAI({
    baseURL: 'https://api.gptsapi.net/v1',
    apiKey: process.env.OPENAI_API_KEY,
    httpAgent: new HttpsProxyAgent(process.env.HTTPS_PROXY as string),
});

const SUPPORTED_SIZES = ["1024x1024", "1024x1792", "1792x1024"];

export async function POST(request: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const body = await request.json();
        const { prompt, amount = 1, resolution = "1024x1024" } = body;

        if (!prompt) {
            return new NextResponse('Missing prompt', { status: 400 });
        }

        if (!amount) {
            return new NextResponse("Missing amount", { status: 400 });
        }

        if (!resolution) {
            return new NextResponse("Missing resolution", { status: 400 });
        }

        if (!SUPPORTED_SIZES.includes(resolution)) {
            return new NextResponse(`Invalid resolution. Supported sizes are: ${SUPPORTED_SIZES.join(", ")}`, { status: 400 });
        }

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            // n: parseInt(amount),
            size: resolution,
            n: 1,
            // size: "1024x1024",
        });
        // console.log('%c [ image ]-40', 'font-size:13px; background:pink; color:#bf2c9f;', response)
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('IMAGE_ERROR:', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


