export function createPrompt_addNewWords(params) {
    return `
    You are a researcher who specializes in creating educational programs for children.
    Focus your attention on children living in Ukraine. Use only Ukrainian language. Ensure the words are grammatically correct.
    Your responsibility is to create a comprehensive list of words for early communication and pronunciation development in children under 3 years old.

    The topics to be studied should be as suitable as possible for children.
    Must be ordered to follow a logical learning progression for a child under 3 years old, starting from simpler and more commonly used words to more complex and less commonly used words. 
    The words should be unique from the previous list.


    Previus list: 
    ${JSON.stringify(params.wordList)}

    Response must be only JSON contain:
    data: [
        {"place": 1, "word": "word1", "type": "noun"}, 
        {"place": 2, "word": "word2", "type": "verb"}, 
        ...
    ]
`;
}