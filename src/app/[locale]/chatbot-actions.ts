"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFile } from "fs/promises";
import { join } from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || "");

async function getSystemPrompt(locale: string = "es"): Promise<string> {
  try {
    const fileName = locale === "en" ? "chatbot-system.txt" : "chatbot-system-es.txt";
    const promptPath = join(process.cwd(), "prompts", fileName);
    const systemPrompt = await readFile(promptPath, "utf-8");
    return systemPrompt;
  } catch (error) {
    console.error("Error loading system prompt:", error);
    return "You are Gabby, a helpful assistant for Gabunni Eats restaurant.";
  }
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function sendChatMessage(
  message: string,
  history: ChatMessage[] = [],
  locale: string = "es"
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    if (!process.env.GOOGLE_GENAI_API_KEY) {
      return {
        success: false,
        error: "API key not configured. Please add GOOGLE_GENAI_API_KEY to your environment variables.",
      };
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: await getSystemPrompt(locale),
    });

    // Convertir el historial al formato de Gemini
    // Solo incluir mensajes del historial si no está vacío y empieza con 'user'
    let chatHistory = history.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Asegurarse de que el historial empiece con 'user'
    if (chatHistory.length > 0 && chatHistory[0].role !== "user") {
      chatHistory = chatHistory.slice(1);
    }

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return {
      success: true,
      message: response,
    };
  } catch (error: any) {
    console.error("Chat error:", error);
    return {
      success: false,
      error: error.message || "An error occurred while processing your message.",
    };
  }
}
