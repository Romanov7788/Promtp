import { trimResponseContent } from "../../utils.js";
import { createPrompt_getTopicSequence } from "../prompts/createPrompt_getTopicSequence.js";
import { openaiChat } from "../../langchainService.js";

export async function getTopicSequence(state) {
    console.log('getTopicSequence state', state);

    const persons = state.spezialists;
    const topics = [];

    for (const person of persons) {
        const prompt = createPrompt_getTopicSequence({
            person,
            groupCreteria: state.groupCreteria,
            sequenceLegth: state.sequenceLegth,
        });

        const response = await openaiChat(prompt);
        const responseData = trimResponseContent(response.content);
        topics.push(responseData);
    }

    console.log('getTopicSequence', topics);

    return {
        ...state,
        topicSequence: topics,
        steps: [...state.steps, 'getTopicSequnce'],
    };
}
