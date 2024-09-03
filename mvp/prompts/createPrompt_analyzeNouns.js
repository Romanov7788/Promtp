export function createPrompt_analyzeNouns(params) {
    return`
    You are ${JSON.stringify(params.person)}.
    You receive data in the form of YouTube captions intended for children under 3 years old. Your tasks are as follows:
      1. **Analyze the data**:
       - Identify and correct any grammatical, spelling, or **logical errors**. The goal is to minimize errors to the greatest extent possible, ensuring sentences make sense and reflect natural human speech.

      2. **Categorize the corrected words into parts of speech**:
        - For each corrected word, identify its part of speech (noun, verb, adjective, etc.). Ensure consistency in part-of-speech tagging.

      3. **Convert each word to its base form**:
        - Convert each word to its base form, as found in a dictionary. For example, "running" should be "run".

      4. **Ensure uniqueness**:
        - All words must be unique without duplicates. If duplicates exist, remove them.

      5. **Ensure logical consistency between nouns and verbs**:
        - Avoid combinations where inanimate objects are paired with actions that are not possible for them (e.g., "newspaper reads"). Use semantic rules and ontologies to ensure that each noun-verb pair is logically and contextually valid.

      6. **Use compatibility rules**:
        - Implement a compatibility table for verbs and nouns to ensure logical pairing. For example, "read" can be paired with "boy" or "girl", but not with "book" or "newspaper".


        Example input data:
        [
            {
                "unit": [
                {
                    "mainKnowledge": "boy",
                    "knowledges": [
                    "boy"
                    ],
                    "text": "boy",
                    "group": "people"
                },
                {
                    "mainKnowledge": "book",
                    "knowledges": [
                    "book"
                    ],
                    "text": "book",
                    "group": "objects"
                }
                ]
            },
            {
                "unit": [
                {
                    "mainKnowledge": "read",
                    "knowledges": [
                    "read",
                    "book"
                    ],
                    "text": "book reads",
                    "group": "read-ignore"
                },
                {
                    "mainKnowledge": "ignore",
                    "knowledges": [
                    "ignore",
                    "book"
                    ],
                    "text": "book ignores",
                    "group": "read-ignore"
                },
                {
                    "mainKnowledge": "read",
                    "knowledges": [
                    "read",
                    "boy"
                    ],
                    "text": "boy reads",
                    "group": "read-ignore"
                },
                {
                    "mainKnowledge": "ignore",
                    "knowledges": [
                    "ignore",
                    "boy"
                    ],
                    "text": "boy ignores",
                    "group": "read-ignore"
                },
                {
                    "mainKnowledge": "read",
                    "knowledges": [
                    "read",
                    "newspaper"
                    ],
                    "text": "newspaper reads",
                    "group": "read-ignore"
                },
                {
                    "mainKnowledge": "ignore",
                    "knowledges": [
                    "ignore",
                    "newspaper"
                    ],
                    "text": "newspaper ignores",
                    "group": "read-ignore"
                }
                ]
            }
        ]

        Example response in JSON:
        {
            "unit": [
            {
                "mainKnowledge": "boy",
                "knowledges": [
                "boy"
                ],
                "text": "boy",
                "group": "people"
            },
            {
                "mainKnowledge": "book",
                "knowledges": [
                "book"
                ],
                "text": "book",
                "group": "objects"
            },
            {
                "mainKnowledge": "newspaper",
                "knowledges": [
                "newspaper"
                ],
                "text": "newspaper",
                "group": "objects"
            }
            ]
        },

        Input data: ${JSON.stringify(params.data)}.

        Response must contain only JSON:
    `;
}