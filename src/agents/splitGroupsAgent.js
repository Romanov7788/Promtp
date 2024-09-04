import { trimResponseContent } from "../utils.js";
import { createPrompt_splitWordGroups } from '../prompts/createPrompt_splitWordGroups.js';
import { openaiChat } from '../langchainService.js';


async function chunkList(list, chunkSize) {
    const chunks = [];
    for (let i = 0; i < list.length; i += chunkSize) {
        chunks.push(list.slice(i, i + chunkSize));
    }
    return chunks;
}


async function splitIntoSmallGroups(groups, maxSize = 10) {
    const smallGroups = {};
    for (const [category, items] of Object.entries(groups)) {
        smallGroups[category] = await chunkList(items, maxSize);
    }
    return smallGroups;
}


function assignGroupIndices(smallGroups) {
    const indexedGroups = {};
    for (const [category, subgroups] of Object.entries(smallGroups)) {
        subgroups.forEach((subgroup, index) => {
            const indexedGroupName = `${category}_${index + 1}`;
            indexedGroups[indexedGroupName] = subgroup;
        });
    }
    return indexedGroups;
}


async function getWordItems(chunk) {
    const prompt = createPrompt_splitWordGroups({ wordsList: chunk });
    const response = await openaiChat(prompt);
    const responseData = trimResponseContent(response.content);
    return JSON.parse(responseData).data;
}


function combineGroups(allResults) {
    const combinedGroups = {};
    for (const groupData of allResults) {
        for (const categoryData of groupData) {
            for (const [category, items] of Object.entries(categoryData)) {
                if (!combinedGroups[category]) {
                    combinedGroups[category] = [];
                }
                combinedGroups[category].push(...items);
            }
        }
    }
    return combinedGroups;
}


export async function splitGroups(state) {
    const chunks = await chunkList(state.wordSequence, 100);
    const allResults = [];

    for (const chunk of chunks) {
        const result = await getWordItems(chunk);
        allResults.push(result);
    }

    const combinedGroups = combineGroups(allResults);
    const smallGroups = await splitIntoSmallGroups(combinedGroups);
    const indexedGroups = assignGroupIndices(smallGroups);

    return {
        ...state,
        wordGroups: indexedGroups,
        steps: [...state.steps, 'splitGroups'],
    };
}
