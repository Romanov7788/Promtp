import { ChatOpenAI } from "@langchain/openai";
import 'dotenv/config';

const openai = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: "gpt-4o"
})

function openaiChat(message) {
    return openai.invoke(message);
}

export { openai, openaiChat }