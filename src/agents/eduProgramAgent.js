import { trimResponseContent } from "../utils.js";
import { createPrompt_eduProgram } from "../prompts/createPrompt_eduProgram.js"
import { openaiChat } from "../langchainService.js";


export async function getEduProgram(state) {
    console.log('getEduProgram state', state);

    const prompt = createPrompt_eduProgram({
        groupsList: state.dependOnGroups,
    });

    const response = await openaiChat(prompt);
    const responseData = trimResponseContent(response.content);

    return {
        ...state,
        eduProgram: responseData,
        steps: [...state.steps, 'getEduProgram'],
    };
}