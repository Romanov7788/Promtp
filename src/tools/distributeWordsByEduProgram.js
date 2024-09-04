export function distributeWordsByEduProgram(state) {
    const { eduProgram, wordsSequence } = state;

    const result = eduProgram.data.reduce((acc, level) => {
        const levelData = level.topics.reduce((topicAcc, topic) => {
            const wordsForTopic = wordsSequence.data.filter(word => word.topic === topic.topic);

            const words = wordsForTopic.map(word => {
                if (word.learning === "pair") {
                    return { words: word.words };
                } else {
                    return { word: word.word };
                }
            });

            if (topic.dependsOn.length > 0) {
                topic.dependsOn.forEach(dependency => {
                    const dependentWords = wordsSequence.data.filter(w => w.topic === dependency && w.learning === "pair");
                    dependentWords.forEach(depWord => {
                        const pair = depWord.words ? { words: depWord.words } : { word: depWord.word };
                        words.push(pair);
                    });
                });
            }

            return { ...topicAcc, [topic.topic]: words };
        }, {});

        return { ...acc, [level.level]: levelData };
    }, {});

    return {
        ...state,
        finalData: result,
        steps: [...state.steps, 'finalData'],
    };
}
