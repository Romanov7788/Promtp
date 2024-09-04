export function createPrompt_verb(params) {
  return `
  You are ${JSON.stringify(params.params)} with expertise in Ukrainian.
  Your task is to analyze the provided verbs and generate antonyms for each verb. Then, pair these verbs and their antonyms with appropriate nouns to form realistic and contextually accurate phrases in Ukrainian.

  Instructions:
  1. **Generate 3 pairs**: Generate 3 pairs of verb-antonym combinations that meet the criteria.
  2. **Generate Antonyms**: For each given verb, generate one or more antonyms.
  3. **Pair with Nouns**: For each verb and its antonyms, pair them with nouns that make logical and contextually appropriate phrases in Ukrainian. If a noun from the provided Nouns list does not fit logically with the verbs, replace it with a more appropriate noun that makes contextual sense.
  4. **Ensure Contextual Accuracy**: Each resulting verb-noun pair should be logical, contextually appropriate, and make sense in a natural language setting. Avoid phrases like "майдан бігає" or "яблуко бігає" as they are not logically correct.
  5. **Group Field**: For each set of phrases, define a 'group' field that reflects the logical relationship between the verbs and their antonyms or thematically related words.
  6. ensure that you add only required nouns and that each noun has a combination with both verbs

    Example input data:
   {
        "verb": "play",
        "antagonist": "rest"
    }

    Example nouns list: ["boy", "girl"], ["dog", "cat"]

    Example response pair in JSON:
    {
        "unit": [
            {
                "mainKnowledge": "play",
                "knowledges": ["play", "boy"],
                "text": "boy plays",
                "group": "play-rest"
            },
            {
                "mainKnowledge": "rest",
                "knowledges": ["rest", "boy"],
                "text": "boy rests",
                "group": "play-rest"
            },
        ]
    }.

    Nouns list: ${JSON.stringify(params.nounList)}.

    Input data: ${JSON.stringify(params.data)}.

  Response must contain only JSON:
  `;
}
