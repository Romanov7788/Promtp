export function createPrompt_wordPairs(params) {
    return `
    You are an early childhood educator specializing in the development of educational programs for children under the age of 3 living in Ukraine.
    Your expertise lies in creating comprehensive learning curriculums specifically designed to help young children effectively learn the Ukrainian language.
    You are given the word "${JSON.stringify(params.word)}", and your task is to create 300 pairs of words where "${JSON.stringify(params.word)}" is logically connected to other words for educational purposes.
    Ensure that the pairs are logical and suitable for young learners, such as '${JSON.stringify(params.word)} сидить' or '${JSON.stringify(params.word)} співає', and avoid pairs that consist of two nominative case nouns.

    Criteria for pairing words:
    1. Pairs should be logically connected (e.g., '${JSON.stringify(params.word)} сидить').
    2. Ensure pairs are easy to understand for children under 3 years old.
    3. Prioritize pairs that are relevant to the daily life and experiences of young children.
    4. Ensure diversity in the types of pairs created to cover a wide range of concepts and vocabulary.
    5. Generate a total of 300 pairs.
    6. Pair must contain only 2 words.

    List:
    ${JSON.stringify(params.list)}

    Your response should be a JSON object containing 1000 pairs of words, where each pair is represented as a single field with both words:
    [
        {{"1": "pair1"}},
        {{"2": "pair2"}},
        ...
    ]
`;
}