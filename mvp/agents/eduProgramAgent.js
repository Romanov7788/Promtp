import { openaiChat } from "../../langchainService.js";
import { trimResponseContent } from "../../utils.js";
import { createPrompt_eduProgram } from "../../mvp/prompts/createPrompt_eduProgram.js"



export async function getEduProgram(state) {
    const prompt = createPrompt_eduProgram({
        person: state.spezialists[0],
        data: state.wordsSequence,
        nounList: state.newNouns,
        groupCreteria: state.groupCreteria,
    });

    const response = await openaiChat(prompt);
    const responseData = trimResponseContent(response.content);

    return {
        ...state, 
        eduProgram: JSON.parse(responseData),
        steps: [...state.steps, 'eduProgram'],
    };
}