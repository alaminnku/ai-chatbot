import { OpenAI } from "langchain/llms";

// Configure OpenAI
export const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });
