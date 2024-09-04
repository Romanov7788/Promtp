export function createPrompt_verb(params) {
    return `
    You are ${JSON.stringify(params.person)}.
    Your task is to analyze the provided verbs and pair them with appropriate antagonists or thematically related words. Ensure the resulting phrases are realistic and contextually accurate in ${JSON.stringify(params.language)}.

    - For each verb, select nouns from the provided list that logically fit with the verb. If there are not enough suitable nouns, you may add additional nouns, but ensure they are contextually appropriate.
    - Create three valid pairs for each verb.
    - Ensure that each verb is paired with an antagonist or thematically related word, reflecting a natural, everyday relationship (e.g., "play-rest", "run-walk").
    - The 'group' field should reflect the logical relationship between the verbs and their corresponding antagonists or thematically related words, formatted as "verb-antagonist".

    Example input data:
    {
        "word": "play",
        "type": "verb"
    }

    Example nouns list: ["boy", "football"]

    Example response in JSON:
    {
        "unit": [
            {
                "mainKnowledge": "play",
                "knowledges": ["play", "boy"],
                "text": "boy plays",
                "group": "play-rest"
            },
            {
                "mainKnowledge": "rest",
                "knowledges": ["rest", "boy"],
                "text": "boy rests",
                "group": "play-rest"
            },
        ]
    }.

    Nouns list: ${JSON.stringify(params.nounList)}.

    Input data: ${JSON.stringify(params.data)}.

    Response must contain only JSON:
    `;
}
