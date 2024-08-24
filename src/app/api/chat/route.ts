import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Convert messages to the required format
  const coreMessages = convertToCoreMessages(messages);

  // Call the language model with streaming enabled
  const result = await streamText({
    model: openai('gpt-4o'), // Replace with your desired model ID
    messages: coreMessages,
    async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
      // Implement your own logic here, e.g. for storing messages
      // or recording token usage
    },
  });

  // Respond with the stream
  return result.toDataStreamResponse();
}