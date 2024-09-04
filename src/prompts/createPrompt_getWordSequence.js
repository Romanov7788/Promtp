export function createPrompt_getWordSequence(params) {
    return `
    You are a ${JSON.stringify(params.person)}.
    Focus your attention on children living in Ukraine. Ensure the words are grammatically correct.
    Your responsibility is to create a comprehensive list of words for early communication and pronunciation development in children under 3 years old.

    Suggest a list of ${JSON.stringify(params.wordSequenceTypes)} that:
    - Use only Ukrainian language.
    - Must contain only unique words.
    - Must contain exactly ${JSON.stringify(params.sequenceLength)} words.
    - The topics to be studied should be as suitable as possible for children
    - Must be ordered to follow a logical learning progression for a child under 3 years old, starting from simpler and more commonly used words to more complex and less commonly used words.

    Response must be a JSON containing:
    data: [
        {"place": 1, "word": "word1", "type": "noun"},
        {"place": 2, "word": "word2", "type": "verb"},
        ...
    ]
`;
}