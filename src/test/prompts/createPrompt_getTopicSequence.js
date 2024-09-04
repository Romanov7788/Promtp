export function createPrompt_getTopicSequence(params) {
    return `
    You are ${JSON.stringify(params.person)}, specializing in developing curricula for children under 3 years of age living in Ukraine. 
    Based on the following criteria: ${JSON.stringify(params.groupCreteria)}, 
    generate a comprehensive list of interconnected Ukrainian language learning topics suitable for this age group, 
    emphasizing topics that naturally involve actions, activities, or processes, and align them with language proficiency levels from A0 to C2. 
    Ensure that the curriculum consists solely of topic names, with each topic containing only 1-2 words. 
    The curriculum should include exactly ${JSON.stringify(params.sequenceLegth)} distinct topics, 
    arranged in a logical progression to support consistent language acquisition, from beginner (A0) to advanced (C2) levels. 
    Avoid including specific words from within the topics themselves.
    Topics should contain only one part of speech, that is, one topic cannot contain a noun with a verb, or an adjective with a noun, be sure to take this parameter into account

    Your response must be in the following JSON format:
    {
        "data": [
            { "topic": "topic1", "topic": topicN, ... }
        ]
    }
    `;
}