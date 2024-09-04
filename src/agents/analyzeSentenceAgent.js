import { trimResponseContent } from "../utils.js";
import { createPrompt_analyzeSentence } from "../prompts/createPrompt_analyzeSentence.js"
import { openaiChat } from "../langchainService.js";


export async function analyzeSentence(state) {
    console.log('analyzeSentence state', state);

    const prompt = createPrompt_analyzeSentence({
        sentence: state.sentence,
    });

    const response = await openaiChat(prompt);
    const responseData = trimResponseContent(response.content);

    return {
        ...state,
        analyzeSentence: responseData,
        steps: [...state.steps, 'analyzeSentence'],
    };
}