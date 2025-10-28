"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || "");

export async function getAiRecommendations(input: {
  dietaryPreferences: string;
  orderHistory: string;
  locale?: string;
}) {
  try {
    if (!process.env.GOOGLE_GENAI_API_KEY) {
      return {
        success: false,
        error: "API key not configured.",
      };
    }

    const locale = input.locale || "es";
    const language = locale === "en" ? "English" : "Spanish";

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are an AI assistant designed to provide menu recommendations for Gabunni Eats restaurant.

Based on the user's dietary preferences: ${input.dietaryPreferences} and their order history: ${input.orderHistory || "None"},
recommend menu items that they might enjoy. The available menu categories are:
- Chapatas (sandwiches with chicken, ham & cheese, vegetarian, cold cuts)
- Bebidas (drinks like fresh water, sodas, coffee)
- Jugos (juices like orange, green juice, carrot)

Consider their preferences when composing your output, and if there is nothing that matches, then say so.

IMPORTANT: You must respond in ${language}.

Recommendations:`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return {
      success: true,
      recommendations: response,
    };
  } catch (error: any) {
    console.error("Recommendations error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
