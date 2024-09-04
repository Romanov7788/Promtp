import { START, END, StateGraph } from "@langchain/langgraph";
import { getMJImage } from "../src/test/agents/getMJAgent.js";


const runWorkflow = async () => {
    const stateStructure = {
        consept: [
            "there were",
        ],
        promptForMJ: [],
        steps: [],
    };

    const workflow = new StateGraph({
        channels: stateStructure,
    });

    
    workflow.addNode("getMJImage", getMJImage);

    workflow.addEdge(START, "getMJImage");
    workflow.addEdge("getMJImage", END);

    const app = workflow.compile();

    const workflowRes = await app.invoke(stateStructure);

    console.log('workflowRes', workflowRes);
}

runWorkflow().catch(console.error);