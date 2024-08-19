import {NextResponse} from "next/server";

require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const systeminstruction = "You will take the topic that the user inputs and create 5 flashcards with a question and an answer that pertains to the topic"

export async function POST(request) {
    const { message } = await request.json();
    console.log(" Received text: ", message);

    const model =  genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: systeminstruction
      });

    const chatSession = model.startChat()
    const result = await chatSession.sendMessage(message);
    const reply = result.response.text();

    return NextResponse.json({ reply })
}