'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating menu recommendations based on user dietary preferences and order history.
 *
 * The flow takes user preferences and order history as input and returns a list of recommended menu items.
 *
 * @interface GenerateMenuRecommendationsInput - The input type for the generateMenuRecommendations function.
 * @interface GenerateMenuRecommendationsOutput - The output type for the generateMenuRecommendations function.
 * @function generateMenuRecommendations - A function that generates menu recommendations based on user preferences and order history.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMenuRecommendationsInputSchema = z.object({
  dietaryPreferences: z
    .string()
    .describe('The dietary preferences of the user (e.g., vegetarian, vegan, gluten-free).'),
  orderHistory: z.string().describe('The past order history of the user.'),
  locale: z.string().optional().describe('The language locale (es or en). Defaults to es.'),
});

export type GenerateMenuRecommendationsInput = z.infer<
  typeof GenerateMenuRecommendationsInputSchema
>;

const GenerateMenuRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A list of recommended menu items based on the user preferences and order history.'),
});

export type GenerateMenuRecommendationsOutput = z.infer<
  typeof GenerateMenuRecommendationsOutputSchema
>;

export async function generateMenuRecommendations(
  input: GenerateMenuRecommendationsInput
): Promise<GenerateMenuRecommendationsOutput> {
  return generateMenuRecommendationsFlow(input);
}

const generateMenuRecommendationsPrompt = ai.definePrompt({
  name: 'generateMenuRecommendationsPrompt',
  input: {schema: GenerateMenuRecommendationsInputSchema},
  output: {schema: GenerateMenuRecommendationsOutputSchema},
  prompt: `You are an AI assistant designed to provide menu recommendations for a user.

  Based on the user's dietary preferences: {{{dietaryPreferences}}} and their order history: {{{orderHistory}}},
  recommend menu items that they might enjoy. The available menu categories are Chapatas, Bebidas, and Jugos.
  Consider their preferences when composing your output, and if there is nothing that matches, then say so.

  IMPORTANT: You must respond in {{#if locale}}{{#equals locale "en"}}English{{else}}Spanish{{/equals}}{{else}}Spanish{{/if}}.
  
  Recommendations:`,
});

const generateMenuRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateMenuRecommendationsFlow',
    inputSchema: GenerateMenuRecommendationsInputSchema,
    outputSchema: GenerateMenuRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await generateMenuRecommendationsPrompt(input);
    return output!;
  }
);
