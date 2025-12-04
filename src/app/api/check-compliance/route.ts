import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// This route handles the Compliance Checking logic
export async function POST(req: Request) {
  try {
    const { imageUrl, platform = 'general' } = await req.json();

    // 1. CHECK FOR API KEY
    if (!process.env.OPENAI_API_KEY) {
      console.log('No OpenAI API Key found. Returning mock compliance report.');
      
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return NextResponse.json({
        score: 95,
        status: 'passed',
        checks: [
          { name: 'Safe Zones', status: 'pass', message: 'Text is within safe areas.' },
          { name: 'Contrast', status: 'pass', message: 'Text is legible against background.' },
          { name: 'Prohibited Claims', status: 'pass', message: 'No restricted medical claims found.' },
          { name: 'Image Quality', status: 'pass', message: 'Resolution meets minimum requirements.' }
        ],
        isMock: true
      });
    }

    // 2. REAL COMPLIANCE CHECK (Using GPT-4 Vision)
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // We send the image to GPT-4o to analyze against retail rules
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a strict retail compliance officer for advertising. 
          Analyze the image for:
          1. Text legibility and contrast.
          2. Safe zones (is text too close to edges?).
          3. Prohibited content (adult, medical claims, violence).
          
          Return a JSON object with: score (0-100), status ('passed'|'failed'|'warning'), and an array of checks.`
        },
        {
          role: "user",
          content: [
            { type: "text", text: `Check this ad for ${platform} platform compliance.` },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json({
      ...result,
      isMock: false
    });

  } catch (error) {
    console.error('Compliance Check Error:', error);
    return NextResponse.json({ error: 'Failed to check compliance' }, { status: 500 });
  }
}