import { START, END, StateGraph } from "@langchain/langgraph";
import fs from "fs";

import { getWordSequences } from "../src/agents/getWordSequenceAgent.js";
import { getAveragedWordSequence } from "./tools/getAveragedWordSequence.js";
import { checkWordsGroup } from "../src/agents/checkWordsGroupAgent.js";
import { splitGroups } from "../src/agents/splitGroupsAgent.js";
import { dependsOnGroups } from "../src/agents/dependsOnGroupsAgent.js";
import { getEduProgram } from "../src/agents/eduProgramAgent.js";



const runWorkflow = async () => {
    const stateStructure = {
        wordSequenceTypes: [
            "Sequence of words by the sequence of learning in the process of human development early communication and pronunciation development in children under 3 years old",
        ],
        spezialists: [
            "expert in early childhood development",
            "early education expert",
        ],
        groupCreteria: ["good to learn together", "one type of word"],
        wordSequences: [],
        wordSequence: [],
        wordGroups: [],
        dependOnGroups: [],
        eduProgram: [],
        sequenceLength: 150,
        steps: [],
    };

    const workflow = new StateGraph({
        channels: stateStructure,
    });

    workflow.addNode("getWordSequences", getWordSequences);
    workflow.addNode("getAveragedWordSequence", getAveragedWordSequence)
    workflow.addNode("checkWordsGroup", checkWordsGroup);
    workflow.addNode("splitGroups", splitGroups);
    workflow.addNode("dependsOnGroups", dependsOnGroups);
    workflow.addNode("getEduProgram", getEduProgram);

    workflow.addEdge(START, "getWordSequences");
    workflow.addEdge("getWordSequences", "getAveragedWordSequence");
    workflow.addEdge("getAveragedWordSequence", "checkWordsGroup");
    workflow.addEdge("checkWordsGroup", "splitGroups");
    workflow.addEdge("splitGroups", "dependsOnGroups");
    workflow.addEdge("dependsOnGroups", "getEduProgram");
    workflow.addEdge("getEduProgram", END);

    const app = workflow.compile();

    const workflowRes = await app.invoke(stateStructure);

    console.log("workflowRes", workflowRes);

    fs.writeFileSync('../src/output/workflowRes.json', JSON.stringify(workflowRes, null, 2));
};

runWorkflow().catch(console.error);
