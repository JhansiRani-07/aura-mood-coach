import { NextRequest, NextResponse } from 'next/server';
// import OpenAI from 'openai';

// TODO: Uncomment and configure when ready to use real OpenAI API
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export async function POST(request: NextRequest) {
  try {
    const { userId, recentMoods } = await request.json();

    // TODO: Replace with real OpenAI API call
    // Example implementation:
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "system",
    //       content: "You are a wellness coach for students. Provide personalized, actionable wellness tips based on mood patterns. Keep responses under 100 words and focus on practical strategies."
    //     },
    //     {
    //       role: "user",
    //       content: `Based on recent mood data: ${JSON.stringify(recentMoods)}, provide a personalized wellness insight for student wellness.`
    //     }
    //   ],
    //   max_tokens: 150,
    //   temperature: 0.7,
    // });

    // For now, return a mock response
    const mockInsights = [
      {
        title: "Stress Management",
        tip: "Your mood patterns suggest you might benefit from stress-reduction techniques. Try the 5-4-3-2-1 grounding exercise: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
        type: "mindfulness"
      },
      {
        title: "Energy Optimization",
        tip: "Based on your recent check-ins, consider establishing a more consistent sleep schedule. Going to bed and waking up at the same time daily can significantly improve mood stability.",
        type: "wellness"
      }
    ];

    const randomInsight = mockInsights[Math.floor(Math.random() * mockInsights.length)];

    return NextResponse.json({
      insight: randomInsight,
      // TODO: Replace with: insight: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('Error generating insight:', error);
    return NextResponse.json(
      { error: 'Failed to generate insight' },
      { status: 500 }
    );
  }
}
