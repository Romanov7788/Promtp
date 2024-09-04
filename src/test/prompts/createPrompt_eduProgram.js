export function createPrompt_eduProgram(params) {
    return `
    You are expert in early childhood development, specializing in developing curricula for children under 3 years of age living in Ukraine. 
    Based on the following criteria: ${JSON.stringify(params.groupCreteria)}.
    You are given a list of topics to create a curriculum for children who will be learning the language for the first time at the age of 3. 
    The topics should go from easy to difficult and be divided into levels so that the child can move on to more difficult topics based on the easy topics they have learned.
    For example, a child has learned simple animals and then moves on to more complex ones. 
    

    List of topics:
    ${JSON.stringify(params.topicsList)}.

    Response must contain only JSON format:
    "data": [
        {"level": level_1: [
            "topic": "topic1",
            "topic": "topic2",
            ... 
        ]},
        ...
    ] 
    `;
}