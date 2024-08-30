import { NextResponse } from "next/server";

require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const systeminstruction =  `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 5 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
      // More flashcards...
  ]
}
`

export async function POST(request) {
  const { text } = await request.json();
  console.log(" Received text: ", text);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systeminstruction,
    generationConfig: { responseMimeType: "application/json" }
  });

    const result = await model.generateContent(text);
    const flashcardContent = result.response.candidates[0].content.parts[0].text;
    try {
      const parsedFlashcards = JSON.parse(flashcardContent);
      return NextResponse.json(parsedFlashcards); 
  } catch (error) {
      console.error("Error parsing flashcard content:", error);
      return NextResponse.json({ error: 'Failed to process flashcards' }, { status: 500 });
  }
 
}
