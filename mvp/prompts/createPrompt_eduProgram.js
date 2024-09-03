export function createPrompt_eduProgram(params) {
    return `
    You are ${JSON.stringify(params.person)}.
    You will be provided with input data containing units, where each unit consists of a mainKnowledge, knowledges, text, and group. 
    Your task is to organize these units into separate sections.

    1. **Organize units into logical sections**:
      - For each unit, determine the appropriate section based on the 'group' field and logical context. Ensure that units are grouped together only if they make logical sense.
      - Use semantic rules to filter out combinations that do not align naturally or contextually. For example, "sit on tree" should only be grouped with phrases related to actions involving sitting or locations like "tree".

    2. **Check logical consistency and contextual accuracy**:
      - Ensure that the grouping reflects logical connections. For example, "naughty monkey" should be grouped with behavior-related terms, while "village" should be grouped with places. 
      - Avoid combinations where the context or meaning is unclear or not relevant (e.g., "enjoy trouble" may need to be refined or excluded if it does not fit any logical category).

    3. **Validate output data**:
      - Ensure that each generated section is coherent and represents meaningful relationships between the units. If a unit does not fit into any section, mark it for review.

    
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
