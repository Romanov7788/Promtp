import { openaiChat } from "../../langchainService.js";
import { trimResponseContent } from "../../utils.js";
import { createPrompt_noun } from "../../mvp/prompts/createPrompt_noun.js";
import { createPrompt_verb } from "../../mvp/prompts/createPrompt_verb.js";
import { createPrompt_adjective } from "../../mvp/prompts/createPrompt_adjective.js";
import { createPrompt_preposition } from "../../mvp/prompts/createPrompt_preposition.js";
import { createPrompt_conjunction } from "../../mvp/prompts/createPrompt_conjunction.js";

// Функція для отримання послідовності слів на основі стану
export async function getWordSequence(state) {
    const wordSequences = [];
    
    // Об'єкт для групування одиниць за типом
    const groupedUnits = {
        noun: [],
        verb: [],
        adjective: [],
        preposition: [],
        conjunction: [],
    };

    // Групуємо одиниці слів за типом
    for (const unit of state.analyzedData.units) {
        if (groupedUnits[unit.type]) {
            groupedUnits[unit.type].push(unit);
        } else {
            console.warn(`Unsupported word type: ${unit.type}`);
        }
    }

    // Проходимо по кожній групі одиниць
    for (const [type, units] of Object.entries(groupedUnits)) {
        if (units.length === 0) continue; // Пропускаємо порожні групи

        let prompt;
        const unitData = units.map(unit => unit.word); // Отримуємо список слів

        // Вибираємо відповідний промпт в залежності від типу слів
        switch (type) {
            case 'noun':
                prompt = createPrompt_noun({
                    person: state.spezialists[1], // Вибираємо спеціаліста
                    data: unitData,
                    groupCreteria: state.groupCreteria,
                    language: state.analyzedData.language,
                });
                break;

            case 'verb':
                prompt = createPrompt_verb({
                    person: state.spezialists[1],
                    data: unitData,
                    nounList: groupedUnits.noun, // Додаємо список іменників
                    groupCreteria: state.groupCreteria,
                    language: state.analyzedData.language,
                });
                break;

            case 'adjective':
                prompt = createPrompt_adjective({
                    person: state.spezialists[1],
                    data: unitData,
                    nounList: groupedUnits.noun,
                    groupCreteria: state.groupCreteria,
                    language: state.analyzedData.language,
                });
                break;

            case 'preposition':
                prompt = createPrompt_preposition({
                    person: state.spezialists[1],
                    data: unitData,
                    nounList: groupedUnits.noun,
                    groupCreteria: state.groupCreteria,
                    language: state.analyzedData.language,
                });
                break;

            case 'conjunction':
                prompt = createPrompt_conjunction({
                    person: state.spezialists[1],
                    data: unitData,
                    nounList: groupedUnits.noun,
                    groupCreteria: state.groupCreteria,
                    language: state.analyzedData.language,
                });
                break;
        }

        try {
            // Виконуємо запит до API OpenAI і обробляємо відповідь
            const response = await openaiChat(prompt);
            const responseData = trimResponseContent(response.content); // Обрізаємо зайвий контент
            const parsedData = JSON.parse(responseData); // Розбираємо JSON
            wordSequences.push(parsedData); // Додаємо результат до масиву
        } catch (error) {
            console.error("Error generating or processing prompt:", error); // Ловимо і виводимо помилки
            continue;
        }
    }

    // Повертаємо оновлений стан з новими послідовностями слів
    return {
        ...state,
        wordsSequence: wordSequences,
        steps: [...state.steps, 'wordsSequence'], // Додаємо крок до списку кроків
    };
}
