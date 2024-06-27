import OpenAI from 'openai';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { HttpsProxyAgent } from 'https-proxy-agent';

const openai = new OpenAI({
    baseURL: 'https://api.gptsapi.net/v1',
    apiKey: process.env.OPENAI_API_KEY,
    httpAgent: new HttpsProxyAgent(process.env.HTTPS_PROXY as string),
});

export async function POST(request: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse('未授权', { status: 401 });
        }

        const body = await request.json();
        const { messages } = body;

        if (!messages) {
            return new NextResponse('缺少消息', { status: 400 });
        }

        const response: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages,
        });
        console.log('%c [ response ]-27', 'font-size:13px; background:pink; color:#bf2c9f;', response.choices[0]?.message);
        return NextResponse.json(response.choices[0]?.message, { status: 200 });
    } catch (error) {
        console.error('错误:', error);
        return new NextResponse('内部服务器错误', { status: 500 });
    }
}



// export async function POST(
//     req: Request,
//     res: Response
// ) {

//     const { userId } = auth();
//     if (!userId) {
//         return new NextResponse('未授权', { status: 401 });
//     }

//     const params = await req.json();
//     const { messages } = params;
//     if (!messages) {
//         return new NextResponse('缺少消息', { status: 400 });
//     }
//     console.log('%c [ messages ]-61', 'font-size:13px; background:pink; color:#bf2c9f;', messages)
//     const apiKey = process.env.OPENAI_API_KEY
//     const url = 'https://api.openai.com/v1/chat/completions'

//     const body = JSON.stringify({
//         messages,
//         model: 'gpt-3.5-turbo',
//         stream: false,
//     })

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${apiKey}`,
//             },
//             body,
//         })
//         const data = await response.json()
//         console.log('%c [ data ]-90', 'font-size:13px; background:pink; color:#bf2c9f;', data)
//         return new NextResponse(JSON.stringify(data), { status: 200 });
//     } catch (error) {
//         console.log('%c [ error ]-93', 'font-size:13px; background:pink; color:#bf2c9f;', error)
//         return new NextResponse('内部服务器错误', { status: 500 });
//     }
// }
