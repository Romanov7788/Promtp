import { trimResponseContent } from "../../utils.js";
import { createPrompt_getMJImage } from "../prompts/createPrompt_getMJImage.js";
import { openaiChat } from "../../langchainService.js";


export async function getMJImage(state) {
    console.log('getMJImage state', state);

    const prompt = createPrompt_getMJImage({
        consept: state.consept,
    });

    const response = await openaiChat(prompt);
    const responseData = trimResponseContent(response.content);

    console.log('responseData', responseData);

    return {
        ...state,
        promptForMJ: responseData,
        steps: [...state.steps, 'getMJImage'],
    }
}