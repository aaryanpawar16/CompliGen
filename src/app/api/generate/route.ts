import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// "Nano Banana" Model (High-speed Simulation)
// Now accepts the 'prompt' to make decisions
const getMockResponse = async (prompt: string) => {
  // Simulate network delay for realism (lighter/faster than real AI)
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  let imageUrl = "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=1000&auto=format&fit=crop"; // Default (Abstract/Studio)

  // CONDITIONAL LOGIC: Check if the user asked for iced coffee
  if (prompt.toLowerCase().includes('iced coffee')) {
    // I replaced your Drive Folder link with a direct image URL so it renders correctly.
    // Drive Folder links cannot be used as image sources.
    imageUrl = "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1000&auto=format&fit=crop";
  }

  return NextResponse.json({
    success: true,
    imageUrl: imageUrl,
    isMock: true,
    model: "nano-banana-v1"
  });
};

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // 1. FAST PATH: If no API key is set, go straight to Nano Banana (Mock)
    if (!process.env.OPENAI_API_KEY) {
      console.log(`No OpenAI API Key found. Using Nano Banana model for: "${prompt}"`);
      // Pass the prompt to the mock function
      return getMockResponse(prompt);
    }

    // 2. ATTEMPT REAL GENERATION
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: `Professional retail advertising background product photography: ${prompt}. Minimalist, high quality, studio lighting, 8k resolution.`,
        n: 1,
        size: "1024x1024",
        quality: "standard",
      });

      const imageUrl = response.data[0].url;

      return NextResponse.json({
        success: true,
        imageUrl: imageUrl,
        isMock: false
      });

    } catch (apiError: any) {
      // 3. FAIL-SAFE: If Billing/Network fails, fallback to Nano Banana
      console.error('Primary AI Failed (Billing/Network):', apiError.message);
      console.log('Switching to Nano Banana model (Simulation)...');
      // Pass the prompt to the mock function here as well
      return getMockResponse(prompt);
    }

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}