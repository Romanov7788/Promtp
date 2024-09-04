import { trimResponseContent } from "../utils.js";
import { createPrompt_dependsOnGroups } from "../prompts/createPrompt_dependsOnGroups.js"
import { openaiChat } from "../langchainService.js";


export async function dependsOnGroups(state) {
    console.log('dependsOnGroups state', state);

    const prompt = createPrompt_dependsOnGroups({
        wordGroups: state.wordGroups,
    });

    const response = await openaiChat(prompt);
    const responseData = trimResponseContent(response.content);

    return {
        ...state,
        dependOnGroups: responseData,
        steps: [...state.steps, 'dependsOnGroups'],
    };
}