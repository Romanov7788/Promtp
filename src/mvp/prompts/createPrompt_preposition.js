export function createPrompt_preposition(params) {
    return `
    You are ${JSON.stringify(params.person)}.
    Your task is to analyze the preposition provided and pair it with an appropriate noun or related word, ensuring the resulting phrase is realistic and contextually accurate in ${JSON.stringify(params.language)}.

    - For each preposition, select nouns from the provided list that logically fit with the preposition. Avoid combinations that are implausible in real life (e.g., "boy in bag" should be avoided).
    - Create three valid pairs for each preposition.
    - Ensure that the preposition and noun form a natural, everyday phrase (e.g., "apple on the table", "apple in the bag").
    - If not enough suitable nouns are available, you may add additional nouns, but ensure they are contextually appropriate.
    - The 'group' field should reflect the logical relationship between the prepositions and nouns used.

    Example input data:
    {
        "word": "on",
        "type": "preposition"
    }

    Example nouns list: ["apple", "bag", "potato", "boy"]

    Example response in JSON:
    {
        "unit": [
            {
                "mainKnowledge": "on",
                "knowledges": ["on", "table", "apple"],
                "text": "apple on the table",
                "group": "on-under"
            },
            {
                "mainKnowledge": "under",
                "knowledges": ["under", "table", "apple"],
                "text": "apple under the table",
                "group": "on-under"
            },
            {
                "mainKnowledge": "in",
                "knowledges": ["in", "bag", "apple"],
                "text": "apple in the bag",
                "group": "in-on"
            }
        ]
    }.

    Nouns list: ${JSON.stringify(params.nounList)}.

    Input data: ${JSON.stringify(params.data)}.

    Response must contain only JSON:
    `;
}
