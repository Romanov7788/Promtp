import { START, END, StateGraph } from "@langchain/langgraph";
import fs from "fs";

import { getTopicSequence } from "./test/agents/getTopicSequenceAgent.js"
import { averageTopics } from "../src/tools/averagedTopicSequence.js";
import { getEduProgram } from "../src/test/agents/getEduProgramAgent.js";
import { getDependsOnTopics } from "../src/test/agents/getDependsOnTopicsAgent.js"


const runWorkflow = async () => {
    const stateStructure = {
        spezialists: [
            "expert in early childhood development",
            "early education expert",
            "developmental pediatrician",
            "speech-language pathologist",
            "early childhood educator",
            "child development researcher",
            "social worker specializing in child welfare",
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
            'encourages repetition for mastery'
        ],
        sequenceLegth: 40,
        topicSequence: [],
        averageTopics: [],
        eduProgram: [],
        dependsOnTopics: [],
        steps: [],
    };

    const workflow = new StateGraph({
        channels: stateStructure,
    });

    workflow.addNode("getTopicSequence", getTopicSequence);
    workflow.addNode("avarageTopics", averageTopics);
    workflow.addNode("getEduProgram", getEduProgram);
    workflow.addNode("getDependsOnTopics", getDependsOnTopics);

    workflow.addEdge(START, "getTopicSequence");
    workflow.addEdge("getTopicSequence", "avarageTopics");
    workflow.addEdge("avarageTopics", "getEduProgram");
    workflow.addEdge("getEduProgram", "getDependsOnTopics");
    workflow.addEdge("getDependsOnTopics", END);

    const app = workflow.compile();

    const workflowRes = await app.invoke(stateStructure);

    console.log('workflowRes', workflowRes);

    fs.writeFileSync('../src/output/test.json', JSON.stringify(workflowRes, null, 2));
}

runWorkflow().catch(console.error);