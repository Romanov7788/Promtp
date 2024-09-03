export function createPrompt_conjunction(params) {
    return `
    You are ${JSON.stringify(params.person)}.
    Your task is to analyze the conjunction provided and pair it with appropriate nouns or related words, ensuring the resulting phrase is realistic and contextually accurate in ${JSON.stringify(params.language)}.

      1. **Pair nouns with conjunctions**:
        - For each conjunction, select nouns from the provided list that logically fit with the conjunction. Avoid combinations that are implausible in real life.
        - Create three valid pairs for each conjunction.
        - Ensure that the conjunction and noun form a natural, everyday phrase (e.g., "apple and potato", "table and chair").
        - If not enough suitable nouns are available, you may add additional nouns, but ensure they are contextually appropriate.

      2. **Use semantic rules for logical consistency**:
        - Only create pairs where the conjunction logically applies to the nouns. For example, "and" can be used with objects of the same type or context, like "table and chair", but not "apple and bag".
        - The 'group' field should reflect the logical relationship between the conjunction and nouns used.

      3. **Contextual Checks**:
        - Ensure that each generated pair makes sense in natural language and follows the rules of grammar and logic for the given language.

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
