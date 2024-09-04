export function createPrompt_dependsOnGroup(params) {
    return `
        You are expert in early childhood development, specializing in developing curricula for children under 3 years of age living in Ukraine.
        You are given a curriculum with topics, and for each topic you need to add a "dependsOn" column and write down which topics can be used to study the topic,
            taking into account the sequence of topics and the fact that they will be studied by children under 3 years old.
        For example: {"topic": "Food", "dependsOn": [{Fruits, Vegetables, ...}]}
        Curriculum:
        ${JSON.stringify(params.eduProgram)}.

        Response must contain only JSON:
        "data": [
            {"level": level_1: [
                [{"topic": "topic1", "dependsOn": [{topicN, topicN, ...}]}],
                [{"topic": "topic2", "dependsOn": [{topicN, topicN, ...}]}],
                ... 
            ]},
            ...
        ] 
    `;
}
