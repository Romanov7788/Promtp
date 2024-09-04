import { trimResponseContent } from "../../utils.js";
import { createPrompt_dependsOnGroup } from "../prompts/createPrompt_dependsOnTopics.js";
import { openaiChat } from "../../langchainService.js";


export async function getDependsOnTopics(state) {
    console.log('getDependsOnTopics state', state);

    const prompt = createPrompt_dependsOnGroup({
        eduProgram: state.eduProgram,
    });

    const response = await openaiChat(prompt);
    const responseData = trimResponseContent(response.content);

    console.log('dependsOnTopics', responseData);

    return {
        ...state,
        dependsOnTopics: responseData,
        steps: [...state.steps, 'dependsOnTopics'],
    };
}