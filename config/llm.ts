import { OpenAI } from "langchain/llms";

// Configure OpenAI
export const llm = new OpenAI({
  maxTokens: 15,
  concurrency: 10,
  openAIApiKey: process.env.OPENAI_API_KEY,
});
