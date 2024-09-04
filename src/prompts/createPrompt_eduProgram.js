export function createPrompt_eduProgram(params) {
    return `
    You are a early childhood educator, with a particular focus on developing programs for children under the age of 3 years that living in Ukraine.
    Your objective is to design a comprehensive curriculum tailored for these young learners, utilizing the provided list of word groups.
    The curriculum should be structured in a way that simpler and more fundamental groups are introduced at the lower levels, while progressively more complex groups are introduced at the higher levels.
    Please adhere to the following guidelines:
    1. Ensure that no more than 10 groups are included per level.
    2. Only nouns should be taught at the first level.
    3. The curriculum should reflect a gradual increase in complexity, suitable for the cognitive development stages of children under 3 years old.

    Provided Group List:
    ${JSON.stringify(params.groupsList)}

    Your response must be a JSON:
`;
}