
import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    // In a real app, you'd handle this more gracefully, but for this context, an error is fine.
    // The environment is expected to have the API key.
    console.warn("API_KEY environment variable not set. Gemini features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY as string });

export const suggestCocktail = async (vibe: string, menu: Product[]): Promise<string> => {
    if (!API_KEY) {
        return "API Key not configured. Please ask your manager for assistance.";
    }
    
    try {
        const menuString = menu
            .filter(item => ['Beer', 'Wine', 'Spirits'].includes(item.category))
            .map(item => `${item.name} (${item.category})`)
            .join(', ');
            
        const prompt = `You are an expert mixologist at a high-end, trendy nightclub with a neon aesthetic. A customer is looking for a drink recommendation based on this vibe: "${vibe}".
        
        Based on the following menu, suggest ONE drink. If a menu item is a good fit, recommend it. If not, invent a simple but cool-sounding cocktail recipe using common bar ingredients (like vodka, gin, rum, tequila, whiskey, simple syrup, citrus, common liqueurs).
        
        Your response must be short, punchy, and exciting. Format it as: "**DRINK NAME** - *A one-sentence, enticing description.*". Do not add any extra text or pleasantries.
        
        Menu: ${menuString}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "**Error** - Couldn't get a suggestion right now. How about a classic Old Fashioned?";
    }
};
