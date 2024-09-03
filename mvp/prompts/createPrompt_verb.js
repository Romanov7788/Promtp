export function createPrompt_verb(params) {
  return `
  You are ${JSON.stringify(params.params)} with expertise in Ukrainian.
  Your task is to analyze the provided verbs and generate antonyms for each verb. Then, pair these verbs and their antonyms with appropriate nouns to form realistic and contextually accurate phrases in Ukrainian.

  Instructions:
  Generate Antonyms: For each given verb, generate one or more antonyms.
  Pair with Nouns: For each verb and its antonyms, pair them with nouns that make logical and contextually appropriate phrases in Ukrainian.
  Ensure Contextual Accuracy: Each resulting verb-noun pair should be logical, contextually appropriate, and make sense in a natural language setting.
  Group Field: For each set of phrases, define a 'group' field that reflects the logical relationship between the verbs and their antonyms or thematically related words.

    Example input data:
   {
        "verb": "play",
        "antagonist" "rest"
    }

    Example nouns list: ["boy", "girl"]

    Example response in JSON:
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

    Input data: ${JSON.stringify(params.data)}.

  Response must contain only JSON:
  `;
}
