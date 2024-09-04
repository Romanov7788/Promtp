export function createPrompt_analyzeData(params) {
    return `
        You are ${JSON.stringify(params.person)}.
        You receive data in the form of YouTube captions intended for children under 3 years old. Your tasks are as follows:
        1. Analyze the data to identify and correct any errors or replace them with words that make sense.
        2. Categorize the corrected words into parts of speech.
        3. Convert each word to its base form, as found in a dictionary.
        4. All words must be without dublicates.

        Example input data:
        The cat ran under the table.
        Norty monkey on mango tree.
        He is one of them.

        Example response in JSON:
        {   
            "language": "English", 
            "units": [
                {"word": "the", "type": "article"},
                {"word": "cat", "type": "noun"}
                {"word": "run", "type": "verb"},
                {"word": "under", "type": "preposition"},
                {"word": "table", "type": "noun"},
                {"word": "naughty", "type": "adjective"},
                {"word": "monkey", "type": "noun"},
                {"word": "on", "type": "preposition"},
                {"word": "mango", "type": "noun"},
                {"word": "tree", "type": "noun"},
                {"word": "he", "type": "pronoun"},
                {"word": "one of them", "type": "phrase"}
            ]
        }

        Input data: ${JSON.stringify(params.data)}.

        Response must contain only JSON:
    `;
}
