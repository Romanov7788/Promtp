function initializeFinalSequence(wordSequences) {
    return wordSequences[0].map(elem => ({ ...elem, occurrence: 1 }));
}


function updateFinalSequenceWithElement(finalSequence, elem) {
    const elemIndex = finalSequence.findIndex(finalElem => finalElem.word === elem.word);

    if (elemIndex === -1) {
        finalSequence.push({ ...elem, occurrence: 1 });
    } else {
        finalSequence[elemIndex].occurrence++;
        try {
            finalSequence[elemIndex].place = Math.round(
                (finalSequence[elemIndex].place + elem.place) / 2
            );
        } catch (error) {
            console.error(`Error converting place to int: ${finalSequence[elemIndex].place} or ${elem.place}`);
        }
    }
}


function processWordSequences(wordSequences, finalSequence) {
    wordSequences.slice(1).forEach(sequence => {
        sequence.forEach(elem => {
            updateFinalSequenceWithElement(finalSequence, elem);
        });
    });
}


function finalizeSequence(finalSequence) {
    finalSequence.forEach(elem => {
        try {
            elem.place = parseInt(elem.place, 10);
        } catch (error) {
            console.error(`Error converting place to int: ${elem.place}`);
        }
    });

    finalSequence.sort((a, b) => b.occurrence - a.occurrence || a.place - b.place);

    finalSequence.forEach((elem, i) => {
        elem.place = i + 1;
    });
}

function trimAndCleanFinalSequence(finalSequence, sequenceLength) {
    return finalSequence.slice(0, sequenceLength).map(elem => {
        const { occurrence, ...cleanedElem } = elem;
        return cleanedElem;
    });
}


export async function getAveragedWordSequence(state) {
    const wordSequences = state.wordSequences.map(seq => seq.data);
    let finalSequence = initializeFinalSequence(wordSequences);

    processWordSequences(wordSequences, finalSequence);
    finalizeSequence(finalSequence);

    const finalSequenceWithoutOccurrence = trimAndCleanFinalSequence(finalSequence, state.sequenceLength);

    return {
        ...state,
        wordSequence: finalSequenceWithoutOccurrence,
        steps: [...state.steps, 'getAveragedWordSequence'],
    };
}