export function createPrompt_preposition(params) {
    return `
    You are ${JSON.stringify(params.person)}.
    Your task is to analyze the preposition provided and pair it with an appropriate noun or related word, ensuring the resulting phrase is realistic and contextually accurate in ${JSON.stringify(params.language)}.

    1. **Preposition Analysis**:
      - For each preposition, select nouns from the provided list that logically fit with the preposition. Avoid combinations that are implausible in real life (e.g., "boy in bag" should be avoided).

    2. **Create Logical Pairs**:
      - Create three valid pairs for each preposition.
      - Ensure that the preposition and noun form a natural, everyday phrase (e.g., "apple on the table", "apple in the bag").
      - If not enough suitable nouns are available, you may add additional nouns, but ensure they are contextually appropriate.
      
    3. **Category and Context Compatibility**:
      - Nouns should belong to the same or related categories when combined with a preposition. For example, "apple on the table" (both food items or commonly found objects in a household setting) is valid, but "boy in bag" is not.
      - Use the following categories for filtering: "food", "furniture", "objects", "people", etc.

    4. **Define Relationship Groups**:
      - The 'group' field should reflect the logical relationship between the prepositions and nouns used (e.g., "on", "under", "in").
   
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
