export function createPrompt_conjunction(params) {
    return `
    You are ${JSON.stringify(params.person)}.
    Your task is to analyze the conjunction provided and pair it with appropriate nouns or related words, ensuring the resulting phrase is realistic and contextually accurate in ${JSON.stringify(params.language)}.

    - For each conjunction, select nouns from the provided list that logically fit with the conjunction. Avoid combinations that are implausible in real life.
    - Create three valid pairs for each preposition.
    - Ensure that the conjunction and noun form a natural, everyday phrase (e.g., "apple and potato", "apple or potato").
    - If not enough suitable nouns are available, you may add additional nouns, but ensure they are contextually appropriate.
    - The 'group' field should reflect the logical relationship between the conjunction and nouns used.

    Example input data:
    {
        "word": "and",
        "type": "conjunction"
    }

    Example nouns list: ["apple", "bag", "potato", "boy"]

    Example response in JSON:
    {
        "unit": [
            {
                "mainKnowledge": "and",
                "knowledges": ["and", "table", "chair"],
                "text": "table and chair",
                "group": "and"
            },
            {
                "mainKnowledge": "and",
                "knowledges": ["and", "apple", "potato"],
                "text": "apple and potato",
                "group": "and"
            },
            {
                "mainKnowledge": "and",
                "knowledges": ["and", "apple", "bag"],
                "text": "apple and bag",
                "group": "and"
            },
        ]
    }.

    Nouns list: ${JSON.stringify(params.nounList)}.

    Input data: ${JSON.stringify(params.data)}.

    Response must contain only JSON:
    `;
}
