export async function averageTopics(state) {
    const eduPrograms = state.topicSequence.map(program => JSON.parse(program));
    const allTopics = {};

    eduPrograms.forEach(program => {
        program.data.forEach(levelData => {
            const topics = Object.values(levelData).filter(value => value !== levelData.level);
            topics.forEach(topic => {
                if (topic) {
                    if (!allTopics[topic]) {
                        allTopics[topic] = 0;
                    }
                    allTopics[topic]++;
                }
            });
        });
    });

    const sortedTopics = Object.entries(allTopics)
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([topic]) => ({ "topic": topic }));


    console.log('avaragedTopics: ', sortedTopics);

    return {
        ...state,
        averageTopics: sortedTopics,
        steps: [...state.steps, 'averageTopics'],
    };
}
