import { openaiChat } from "../../langchainService.js";
import { trimResponseContent } from "../../utils.js";
import { createPrompt_analyzeNouns } from "../prompts/createPrompt_analyzeNouns.js"


export async function analyzeNouns(state) {
    console.log(state.wordsSequence);
    const prompt = createPrompt_analyzeNouns({
        person: state.spezialists[0],
        data: state.wordsSequence,
    });

    const response = await openaiChat(prompt);
    const responseData = trimResponseContent(response.content);

    return {
        ...state, 
        newNouns: JSON.parse(responseData),
        steps: [...state.steps, 'analyzedNouns'],
    };
}
