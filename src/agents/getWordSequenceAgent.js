import { trimResponseContent } from "../utils.js";
import { createPrompt_getWordSequence } from '../prompts/createPrompt_getWordSequence.js';
import { openaiChat } from '../langchainService.js';


export async function getWordSequences(state) {
    console.log('getWordSequences state', state);

    const persons = state.spezialists;
    const wordSequences = [];

    for (const person of persons) {
        const prompt = createPrompt_getWordSequence({
            person,
            wordSequenceTypes: state.wordSequenceTypes,
            sequenceLength: state.sequenceLength,
        });

        const response = await openaiChat(prompt);
        const responseData = trimResponseContent(response.content);
        wordSequences.push(JSON.parse(responseData));
    }

    return {
        ...state,
        wordSequences: wordSequences,
        steps: [...state.steps, 'getWordSequences'],
    };
}
