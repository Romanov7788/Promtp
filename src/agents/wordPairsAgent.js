import { trimResponseContent } from "../utils.js";
import { createPrompt_wordPairs } from "../prompts/createPrompt_wordPairs.js"
import { openaiChat } from "../langchainService.js";


export async function getWordPairs(state) {
    console.log('getWordPairs state', state);

    const prompt = createPrompt_wordPairs({
        word: state.word,
        list: state.wordSequence,
    });

    const response = await openaiChat(prompt);
    const responseData = trimResponseContent(response.content);

    return {
        ...state,
        wordPairs: responseData,
        steps: [...state.steps, 'wordPairs'],
    };
}