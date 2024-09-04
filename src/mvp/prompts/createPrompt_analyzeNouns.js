export function createPrompt_analyzeNouns(params) {
    return`
    You are ${JSON.stringify(params.person)}.
        You receive data in the form of YouTube captions intended for children under 3 years old. Your tasks are as follows:
        1. Analyze the data to identify and correct any errors or replace them with words that make sense.
        2. Categorize the corrected words into parts of speech.
        3. Convert each word to its base form, as found in a dictionary.
        4. All words must be without dublicates.

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