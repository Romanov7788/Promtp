import { trimResponseContent } from "../utils.js";
import { openaiChat } from "../langchainService.js";
import { createPrompt_populateWordGroups } from "../prompts/createPrompt_populateWordGroups.js"


async function splitIntoChunks(wordSequence, chunkSize = 100) {
    const chunks = [];
    for (let i = 0; i < wordSequence.length; i += chunkSize) {
        chunks.push(wordSequence.slice(i, i + chunkSize));
    }
    return chunks;
}


async function processChunk(chunk) {
    const prompt = createPrompt_populateWordGroups({
        wordList: chunk
    });
    const response = await openaiChat(prompt);
    const responseData = trimResponseContent(response.content);
    return JSON.parse(responseData).data;
}


function checkAndNumberWords(allResponses) {
    const wordsSet = new Set();
    const numberedData = [];

    allResponses.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
            const word = item.word || 'Unknown';
            if (wordsSet.has(word)) {
                console.log(`Неунікальне слово: ${word}`);
            } else {
                wordsSet.add(word);
            }

            const newItem = { ...item, place: index + 1 };
            numberedData.push(newItem);
        } else {
            console.log('Unexpected item format:', item);
        }
    });

    return numberedData;
}


export async function checkWordsGroup(state) {
    console.log('checkWordsGroup state', state);

    const wordSequence = state.wordSequence;
    const allResponses = [];

    const chunks = await splitIntoChunks(wordSequence);
    for (const chunk of chunks) {
        const response = await processChunk(chunk);
        allResponses.push(...response);
    }

    const numberedData = checkAndNumberWords(allResponses);

    return {
        ...state,
        wordSequence: numberedData,
        steps: [...state.steps, 'checkWordsGroup'],
    };
}
