export function createPrompt_eduProgram(params) {
    return `
    You are ${JSON.stringify(params.person)}.
    You will be provided with input data containing units, where each unit consists of a mainKnowledge, knowledges, text, and group. 
    Your task is to organize these units into separate sections.
    
    Example JSON input:
    data:
        {
        "units": [
            {
            "mainKnowledge": "monkey",
            "knowledges": ["monkey"],
            "text": "monkey",
            "group": "animals"
            },
            {
            "mainKnowledge": "village",
            "knowledges": ["village"],
            "text": "village",
            "group": "places"
            },
            {
            "mainKnowledge": "naughty",
            "knowledges": ["naughty", "monkey"],
            "text": "naughty monkey",
            "group": "naughty-calm"
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
            "mainKnowledge": "enjoy",
            "knowledges": ["enjoy", "trouble"],
            "text": "enjoy trouble",
            "group": "enjoy-trouble"
            },
            {
            "mainKnowledge": "play",
            "knowledges": ["play", "with", "thing"],
            "text": "play with thing",
            "group": "play-work"
            },
            {
                "mainKnowledge": "under",
                "knowledges": ["apple" ,"under", "table"],
                "text": "apple under table",
                "group": "under-on"
            },
            {
                "mainKnowledge": "on",
                "knowledges": ["apple", "on", "table"],
                "text": "apple on table",
                "group": "under-on"
            }
        ]
    }.

    Example JSON output:
    {
        "data": [
            {
                "units": [
                    {
                        "mainKnowledge": "monkey",
                        "knowledges": ["monkey"],
                        "text": "monkey",
                        "group": "animals"
                    },
                    {
                        "mainKnowledge": "village",
                        "knowledges": ["village"],
                        "text": "village",
                        "group": "places"
                    }
                    {
                        "mainKnowledge": "apple",
                        "knowledges": ["apple"],
                        "text": "apple",
                        "group": "fruit"
                    }
                ]
            },
            {
                "units": [
                    {
                        "mainKnowledge": "naughty",
                        "knowledges": ["naughty", "monkey"],
                        "text": "naughty monkey",
                        "group": "naughty-calm"
                    }
                ]
            },
            {
                "units": [
                    {
                        "mainKnowledge": "under",
                        "knowledges": ["apple" ,"under", "table"],
                        "text": "apple under table",
                        "group": "under-on"
                    },
                    {
                        "mainKnowledge": "on",
                        "knowledges": ["apple", "on", "table"],
                        "text": "apple on table",
                        "group": "under-on"
                    }
                ]
            },
            {
                "units": [
                    {
                        "mainKnowledge": "sit",
                        "knowledges": ["sit", "on", "tree"],
                        "text": "sit on tree",
                        "group": "sit-stand"
                    }
                ]
            },
            {
                "units": [
                    {
                        "mainKnowledge": "enjoy",
                        "knowledges": ["enjoy", "trouble"],
                        "text": "enjoy trouble",
                        "group": "enjoy-trouble"
                    }
                ]
            },
            {
                "units": [
                    {
                        "mainKnowledge": "play",
                        "knowledges": ["play", "with", "thing"],
                        "text": "play with thing",
                        "group": "play-work"
                    }
                ]
            }
        ]
    }.

    Input data: ${JSON.stringify(params.data)}.
    Noun list: ${JSON.stringify(params.nounList)}

    Response must contain only JSON:
    `;
}
