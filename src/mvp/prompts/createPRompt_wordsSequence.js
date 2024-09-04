export function createPrompt_wordsSequence(params) {
    return `
    You are ${JSON.stringify(params.person)}.
    Your task is to analyze each word and relate it to a specific topic, ensuring the following:

    - Nouns should be learned individually as \`mainKnowledge\` without dependencies.
    - Verbs and other parts of speech (e.g., adjectives, prepositions, etc.) should be grouped with an appropriate antagonist or thematically related word, forming pairs of no more than two words. 
        If the word is not a noun, the group should be named using a known word and its antagonist. For example: “sit-stand”, ‘run-stand’, ‘naughty-calm’, etc.
    - Ensure that each group reflects the relationship or context between the words. Do not use grammatical word types (such as "noun" or "verb") as group names.

    Example input data:
    {
        "units": [
            {"word": "the", "type": "article"},
            {"word": "cat", "type": "noun"},
            {"word": "sit", "type": "verb"},
            {"word": "stand", "type": "verb"},
            {"word": "under", "type": "preposition"},
            {"word": "on", "type": "preposition"},
            {"word": "table", "type": "noun"},
            {"word": "naughty", "type": "adjective"},
            {"word": "calm", "type": "adjective"},
            {"word": "monkey", "type": "noun"},
            {"word": "tree", "type": "noun"}
        ]
    }

    Example response in JSON:
    {
        "units": [
            {
                "mainKnowledge": "the",
                "knowledges": ["the", "cat"],
                "text": "the cat",
                "group": "the-a"
            },
            {
                "mainKnowledge": "a",
                "knowledges": ["a", "boy"],
                "text": "a boy",
                "group": "the-a"
            },
            {
                "mainKnowledge": "cat",
                "knowledges": ["cat"],
                "text": "cat",
                "group": "animals"
            },
            {
                "mainKnowledge": "table",
                "knowledges": ["table"],
                "text": "table",
                "group": "furniture"
            },
            {
                "mainKnowledge": "monkey",
                "knowledges": ["monkey"],
                "text": "monkey",
                "group": "animals"
            },
            {
                "mainKnowledge": "tree",
                "knowledges": ["tree"],
                "text": "tree",
                "group": "nature"
            },
            {
                "mainKnowledge": "sit",
                "knowledges": ["sit", "on", "tree"],
                "text": "sit on tree",
                "group": "sit-stand"
            },
            {
                "mainKnowledge": "stand",
                "knowledges": ["stand", "on", "tree"],
                "text": "stand on tree",
                "group": "sit-stand"
            },
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
            {
                "mainKnowledge": "under",
                "knowledges": ["under", "table"],
                "text": "under table",
                "group": "under-on"
            },
            {
                "mainKnowledge": "on",
                "knowledges": ["on", "table"],
                "text": "on table",
                "group": "under-on"
            }
        ]
    }

    Input data: ${JSON.stringify(params.data)}.

    Response must contain only JSON:
    `;
}
