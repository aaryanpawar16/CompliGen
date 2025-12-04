CompliGen: Retail Media, Without the Rejection.

CompliGen is the first AI creative suite that builds compliance into the design process. It doesn't just generate images; it understands retail guidelines, safe zones, and brand constraints to create assets that get approved instantly.

🚀 The Problem

Retail media is exploding, but 65% of creative assets are rejected on the first submission.

Invisible Rules: Every retailer (Amazon, Tesco, TikTok) has different safe zones and UI overlays.

Wasted Budget: Brands lose millions in delays and redesign costs.

Generic AI Fails: Tools like Midjourney generate beautiful images that are unusable because they ignore text placement rules.

✨ The Solution

CompliGen is an intelligent creative engine that combines Generative AI with a deterministic Compliance Layer.

Key Features

🛡️ Contextual Compliance Engine: Automatically detects the product category (e.g., Alcohol, Toys) and enforces specific legal disclaimers.

📐 Smart Safe Zones: Visualizes "Danger Zones" for UI elements (like TikTok buttons) and prevents critical content from being placed there.

🎨 Adaptive Layouts: Generates one master creative and instantly adapts it for Story (9:16), Feed (4:5), and Banner (16:9) formats.

⚡ "Nano Banana" Simulation Mode: A robust demo mode that allows users to experience the full workflow without needing an active GPU or API key.

🏗️ Architecture

CompliGen is built on a modern, serverless stack designed for speed and interactivity.

Frontend: Next.js 14 (App Router), React, Tailwind CSS, Framer Motion.

Visuals: Custom WebGL shaders (Vortex), HTML-to-Image generation.

AI Orchestration:

Router: Intelligent traffic routing between Real AI (OpenAI DALL-E 3) and Simulation Engine.

Simulation: Deterministic keyword mapping for high-fidelity, zero-cost demos.

🛠️ Getting Started

Prerequisites

Node.js 18+

npm or yarn

Installation

Clone the repository

git clone [https://github.com/aaryanpawar16/CompliGen.git](https://github.com/aaryanpawar16/CompliGen.git)
cd compligen


Install dependencies

npm install
# This installs Next.js, React, Framer Motion, Lucide Icons, and Simplex Noise


Configure Environment
Create a .env.local file in the root directory.

# Optional: Add OpenAI Key for real generation. 
# Leave empty to use the free "Nano Banana" simulation mode.
OPENAI_API_KEY=


Run the Development Server

npm run dev


Open the App
Navigate to http://localhost:3000 in your browser.

🎮 How to Demo

This project is optimized for live presentations. Follow this flow:

The Hook (Pain Simulator): Scroll down to the "Why is retail compliance so hard?" section. Hover over the phone to show the red rejection zones.

The Magic (Hero Studio): Scroll up. Type "gold watch" and click Generate. Watch the AI build a luxury ad with the "HELLO, SUCCESS" overlay.

The Versatility: Click "New Ad". Type "nike" or "shoe". Watch it adapt to a sport style.

The Scale (Solution Hub): Scroll to the Bento Grid. Click "Instagram Story" then "Amazon Banner" to show instant resizing.

The Export: Click the Download button on the generated ad to save the final asset.

🏆 Hackathon Checklist

[x] Innovation: Solves a B2B pain point, not just a wrapper.

[x] UX: High-end animations (Vortex, Beams) and interactive states.

[x] Tech: Next.js 14 Server Actions + Client Composition.

[x] Scalability: "Nano Banana" mode ensures zero downtime during judging.

Built with ❤️ by the CompliGen Team.
