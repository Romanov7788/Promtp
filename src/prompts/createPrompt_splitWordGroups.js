export function createPrompt_splitWordGroups(params) {
    return `
    You are a researcher who specializes in creating educational programs for children under the age of 3.
    Focus on children living in Ukraine.
    Be grammatically correct. 
    You are given a list of words and you need to divide the groups into subgroups, i.e. 
    in what order it is better for a child to learn the words of a particular group.
    Criteria for the groups: good at learning together, one type of word.
    The names of the groups should be as clear as possible, for example: Fruits, Food, People.

    Words list:
    ${JSON.stringify(params.wordsList)}

    Response must be only JSON containing:
    data: [
        {"GroupName: [{"place": 1, "word": "word1", type: "noun"},
        {"place": 2, "word": "word2", type: "noun"}, 
        ...]}
    ]
`;
}