import OpenAI from 'openai';

export const dynamic = 'force-dynamic';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
    try {
        // Extract the `messages` from the body of the request
        const { messages } = await req.json();

        // Request the OpenAI API for the response based on the prompt
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: messages,
        });

        // Create a readable stream from the OpenAI response
        const readableStream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of response) {
                        controller.enqueue(chunk);
                    }
                    controller.close();
                } catch (error) {
                    controller.error(error);
                }
            },
        });

        // Wrap the readable stream in a Response object
        return new Response(readableStream, {
            status: 200,
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*',
            },
        });
    } catch (error) {
        console.error("Error in POST /api/chat:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}