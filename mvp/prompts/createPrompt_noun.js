export function createPrompt_noun(params) {
    return `
    You are ${JSON.stringify(params.person)}.
    Your task is to analyze the noun provided and classify it as \`mainKnowledge\`, associating it with a specific category or theme.
    Keep in mind that all these words are in ${JSON.stringify(params.language)}, and you need to follow the rules peculiar to it.

    1. **Classify the noun into a specific group**:
      - Ensure the noun is learned individually, without dependencies. For example, if the noun is "cat", classify it under "animals".
      - Categorize the noun into a specific group or context that is relevant to the learning objective (e.g., "animals", "furniture", "nature"). Ensure that the chosen category logically matches the noun.

    2. **Use semantic rules to check for logical consistency**:
      - Use semantic rules to ensure that the noun fits naturally within its category. Avoid assigning nouns to categories that are not applicable or relevant. For example, "apple" should not be categorized under "furniture".

    3. **Handle ambiguous nouns**:
      - If a noun can belong to more than one category (e.g., "bat" as an "animal" or "sport equipment"), provide a context or additional information to clarify the categorization.



    Example input data:
    {
        "word": "cat",
        "type": "noun"
    }

    Example response in JSON:
    {
        "unit": [
            {
                "mainKnowledge": "cat",
                "knowledges": ["cat"],
                "text": "cat",
                "group": "animals"
            },
            ...
        ]
    }

    Input data: ${JSON.stringify(params.data)}.

    Response must contain only JSON:
    `;
}
