import { openaiChat } from "../../langchainService.js";
import { trimResponseContent } from "../../utils.js";
import { createPrompt_verb } from "../prompts/createPrompt_verb.js";

export async function analyzeVerbs(state) {
    const prompt = createPrompt_verb({
        person: state.spezialists[1],
        data: state.verbs,
        nounList: state.nouns,
        groupCreteria: state.groupCreteria,
        language: state.language,
    });

    try {
        const response = await openaiChat(prompt);
        const responseData = trimResponseContent(response.content);
        const parsedData = JSON.parse(responseData);

        console.log('parsedData', parsedData);
        console.log('response', response);
        console.log('responseData', responseData);

        return {
            ...state,
            verbAntonyms: parsedData,
            steps: [...state.steps, 'verbAntonyms'],
        };
    } catch (error) {
        console.error("Ошибка обработки", error);
        throw new Error("нет антонимав");
    }
}
