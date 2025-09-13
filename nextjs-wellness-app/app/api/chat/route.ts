import { NextRequest, NextResponse } from 'next/server';
// import OpenAI from 'openai';

// TODO: Uncomment and configure when ready to use real OpenAI API
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();

    // TODO: Replace with real OpenAI API call
    // Example implementation:
    // const completion = await openai.chat.completions.create({
    //   model: \"gpt-3.5-turbo\",
    //   messages: [
    //     {
    //       role: \"system\",
    //       content: \"You are a supportive, empathetic wellness coach for students. Provide encouraging, practical advice while being understanding of student challenges. Keep responses conversational and under 150 words. Focus on emotional support and actionable strategies.\"
    //     },
    //     ...context.map(msg => ({
    //       role: msg.sender === 'user' ? 'user' : 'assistant',
    //       content: msg.text
    //     })),
    //     {
    //       role: \"user\",
    //       content: message
    //     }
    //   ],
    //   max_tokens: 200,
    //   temperature: 0.8,
    // });

    // Mock responses for demonstration
    const mockResponses = [
      "I understand that can feel overwhelming. Remember, you're not alone in this journey. What's one small step you could take today to feel a bit better about the situation?",
      "Thank you for sharing that with me. Your feelings are completely valid. Sometimes the bravest thing we can do is acknowledge when we're struggling. What kind of support would be most helpful right now?",
      "That sounds really challenging. I want you to know that it's okay to have difficult days - they're part of being human. You've overcome challenges before, and I believe in your strength to work through this too.",
      "I hear the frustration in your message, and that's completely understandable. When we're stressed, everything can feel more difficult. Let's think about some strategies that might help you feel more in control."
    ];

    const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    return NextResponse.json({
      message: response,
      // TODO: Replace with: message: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
