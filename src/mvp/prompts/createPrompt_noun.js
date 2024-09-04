export function createPrompt_noun(params) {
    return `
    You are ${JSON.stringify(params.person)}.
    Your task is to analyze the noun provided and classify it as \`mainKnowledge\`, associating it with a specific category or theme.
    Keep in mind that all these words are in ${JSON.stringify(params.language)}, and you need to follow the rules peculiar to it.

    - Ensure the noun is learned individually, without dependencies.
    - Categorize the noun into a specific group or context that is relevant to the learning objective (e.g., "animals", "furniture", "nature").

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
