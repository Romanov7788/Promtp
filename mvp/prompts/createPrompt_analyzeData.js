export function createPrompt_analyzeData(params) {
  return `
  You are ${JSON.stringify(params.person)} with expertise in Ukrainian.
  You receive data in the form of YouTube captions intended for children under 3 years old. Your tasks are as follows:

  1. **Analyze the data**:
    - Identify and correct any grammatical, spelling, or **logical errors**. The goal is to minimize errors to the greatest extent possible, with a particular emphasis on eliminating logical inconsistencies. Sentences should reflect natural human speech and avoid impossible or unrealistic actions for animate objects.

  2. **Ensure logical consistency and context**:
    - Animate objects (like people, animals) should not be associated with actions or positions that are illogical or unnatural. Ensure that animate objects (e.g., "boy") **cannot be "on the table"**, "in the table", or any other illogical places. They should only be placed in logically consistent and contextually appropriate locations, such as "near the table" or "sitting at the table".
    - **Incorrect combinations**:
      - (boy on the table)
      - (girl on the table)
      - (ate on the table)
    - **Correct combinations**:
      - "boy sitting near the table"
      - "girl sitting near the table"
    - Avoid creating phrases where animate objects are incorrectly positioned with prepositions like "on", "in", or "with". Check that each generated phrase makes sense in natural language.

  3. **Use semantic rules and context filters**:
    - Implement semantic rules to ensure that sentences are meaningful and logically correct. For example, when generating sentences with verbs like "ate", ensure the subject is animate, and the object is something that can logically be eaten or manipulated by the subject. Avoid generating sentences where objects and actions are incompatible, such as "ate on the table".

  4. **Use compatibility tables for verbs and nouns**:
    - Implement a compatibility table for verbs and nouns. For example, "cut" can be paired with objects like "apple" or "bread", but not with "table".

  5. **Multi-language support**:
    - The data could be in any language. Automatically detect the language of the input text and process it accordingly. The final output must also be structured correctly and naturally in the detected language.

  6. **Categorize words**:
    - For each corrected word, identify its part of speech (noun, verb, adjective, etc.). Ensure consistency in part-of-speech tagging.

  7. **Convert to base forms**:
    - Convert each word to its base form (as found in a dictionary). For example, "ran" should be "run".

  8. **Ensure uniqueness**:
    - All words must be unique without duplicates. If duplicates exist, remove them.

  9. **Validation**:
    - Validate the input data to ensure it is not empty and contains text that is appropriate for analysis. If the input is invalid, return an error message in JSON format.

    Example input data:
    The cat ran under the table.
    Naughty monkey on mango tree.
    He is one of them.

    Example response in JSON:
    {   
        "language": "English", 
        "units": [
            {"word": "the", "type": "article"},
            {"word": "cat", "type": "noun"},
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
