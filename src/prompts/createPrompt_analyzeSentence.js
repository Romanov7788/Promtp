export function createPrompt_analyzeSentence(paramps) {
    return `
    You are an early childhood educator specializing in the development of educational programs for children under the age of 3 living in Ukraine.
    Your expertise is in helping young children learn Ukrainian effectively.
    You are given a sentence and need to break it down into parts of speech.

    Sentence:
    ${JSON.stringify(paramps.sentence)}

    Your response should be a JSON:
`;
}