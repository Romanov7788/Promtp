export function createPrompt_populateWordGroups(params) {
    return `
    You are languge expert.
    We have the following list of word groups:
    ${JSON.stringify(params.wordList)}

    We going to teach people new words, maybe new language.
    Define sequence of learning groups.
    Group criteria: good to learn together, one type of word

    Response must be only JSON contain:
    data:
        [{"place": 1, "word": "word1", type: "noun", group: "GroupName1"},
        {"place": 2, "word": "word2", type: "verb", group: "GroupName2"},
        ...]
`;
}