import { openaiChat } from "../../langchainService.js";
import { trimResponseContent } from "../../utils.js";
import { createPrompt_analyzeData } from "../prompts/createPrompt_analyzeData.js";


export async function analyzeData(state) {
    const prompt = createPrompt_analyzeData({
        person: state.spezialists[1],
        data: state.data,
    });

    const response = await openaiChat(prompt);
    const responseData = trimResponseContent(response.content);

    return {
        ...state, 
        analyzedData: JSON.parse(responseData),
        steps: [...state.steps, 'analyzedData'],
    };
}