export function createPrompt_dependsOnGroups(params) {
    return `
    You are an expert in the field of early childhood development.
    We have the following list of word groups:
    ${JSON.stringify(params.wordGroups)}

    We are going to teach people new words and possibly a new language.
    Determine the order in which the groups will be taught.
    For each group, identify all the groups that this group depends on to be best used in learning.
    Name this field Depends on groups. 


    Response must be only JSON contain:

    data:[
        {dependsOnGroups: ["group1", ...], ...},
        ...]
`;
}