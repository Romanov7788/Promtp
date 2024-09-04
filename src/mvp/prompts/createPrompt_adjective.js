export function createPrompt_adjective(params) {
    return `
    You are ${JSON.stringify(params.person)}.
    Your task is to analyze the adjective provided and pair it with an appropriate antagonist or thematically related word.
    Keep in mind that all these words are in ${JSON.stringify(params.language)}, and you need to follow the rules peculiar to it.

    - For each adjective, use nouns from the list provided. If there are not enough suitable nouns, add additional nouns.
    - Must be created tree pair for each adjectives.
    - Adjectives should be grouped with a relevant word to form a pair (e.g., "naughty-calm", "big-small").
    - Ensure the group reflects the relationship or context between the words.
    - Use nouns from this list: ${JSON.stringify(params.nounList)}.

    Example input data:
    {
        "word": "naughty",
        "type": "adjective"
    }

    Example response in JSON:
    {
        "unit": [
            {
                "mainKnowledge": "naughty",
                "knowledges": ["naughty", "monkey"],
                "text": "naughty monkey",
                "group": "naughty-calm"
            },
            {
                "mainKnowledge": "calm",
                "knowledges": ["calm", "monkey"],
                "text": "calm monkey",
                "group": "naughty-calm"
            },
            ...
        ]
    }
    Input data: ${JSON.stringify(params.data)}.

    Response must contain only JSON:
    `;
}
