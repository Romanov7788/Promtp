import { START, END, StateGraph } from "@langchain/langgraph";
import readline from 'readline';
import { promises as fs } from 'fs';

// Імпортуємо функції для обробки даних
import { analyzeData } from "./mvp/agents/analyzeDataAgent.js";
import { analyzeVerbs } from "./mvp/agents/analyzeVerbs.js";
import { getWordSequence } from "./mvp/agents/getWodsSequenceAgent.js";
import { getEduProgram } from "./mvp/agents/eduProgramAgent.js";
import { analyzeNouns } from "./mvp/agents/analyzeNounsAgent.js";

// Створюємо інтерфейс для введення даних користувачем
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Функція для отримання вводу від користувачем
const getUserInput = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

// Основна функція для виконання робочого процесу
const runWorkflow = async () => {
    // Отримуємо дані від користувача
    const data = await getUserInput('Please enter your data: ');

    // Оголошуємо структуру стану для графа станів
    const stateStructure = {
        spezialists: [
            "expert in early childhood development",
            "highly qualified linguist",
        ],
        groupCreteria: [
            'good to learn together',
            'simple and clear language',
            'relevant to daily life',
            'supports early vocabulary',
            'encourages sensory exploration',
            'introduces basic concepts',
            'aligned with developmental milestones',
            'promotes early communication',
            'age-appropriate play themes',
            'enhances early motor skills',
            'supports early social skills',
            'relatable to family and home',
            'stimulates curiosity',
            'builds foundational knowledge',
            'encourages repetition for mastery',
        ],
        data: data,
        analyzedData: [],
        wordsSequence: [],
        eduProgram: [],
        newNouns: [],
        steps: [],
    };

    // Створюємо новий граф станів
    const workflow = new StateGraph({
        channels: stateStructure,
    });

    // Додаємо вузли (функції) до графа станів
    workflow.addNode("analyzeData", analyzeData);
    workflow.addNode("analyzeVerbs", analyzeVerbs);
    workflow.addNode("getWordSequence", getWordSequence);
    workflow.addNode("analyzeNouns", analyzeNouns);
    workflow.addNode("getEduProgram", getEduProgram);

    // Визначаємо зв’язки між вузлами графа
    workflow.addEdge(START, "analyzeData");
    workflow.addEdge("analyzeData", "analyzeVerbs");
    workflow.addEdge("analyzeVerbs", "getWordSequence");
    workflow.addEdge("getWordSequence", "analyzeNouns");
    workflow.addEdge("analyzeNouns", "getEduProgram");
    workflow.addEdge("getEduProgram", END);

    // Компілюємо граф станів
    const app = workflow.compile();

    // Виконуємо граф станів з даними
    const workflowRes = await app.invoke(stateStructure);

    // Виводимо результат у консоль
    console.log('workflowRes', workflowRes);

    // Зберігаємо результати у файли
    await fs.writeFile('./output/analyzed.json', JSON.stringify(workflowRes.analyzedData, null, 2));
    await fs.writeFile('./output/eduProgram.json', JSON.stringify(workflowRes.eduProgram, null, 2));
    await fs.writeFile('./output/wordsSequence.json', JSON.stringify(workflowRes.wordsSequence, null, 2));

    // Закриваємо інтерфейс введення
    rl.close();
};

// Запускаємо основну функцію та обробляємо можливі помилки
runWorkflow().catch(console.error);
