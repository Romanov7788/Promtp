import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'fs';
import { Graph } from '@langchain/langgraph'; 


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


const graph = new Graph();

const analyzeNode = async (sentence) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a language analyzer. For each word in the sentence provided by the user, break the sentence into individual words, convert each word to its base form (lemma), determine the part of speech (noun, verb, adjective, etc.), and provide the output as a JSON array. Each element in the array should be an object with 'word', 'lemma', and 'part_of_speech'. Ensure the JSON is strictly formatted."
        },
        {
          role: "user",
          content: `Analyze the following sentence: "${sentence}"`
        }
      ],
      temperature: 0,
      max_tokens: 150,
      top_p: 1,
    });

    let jsonString = response.choices[0].message.content;


    const jsonMatch = jsonString.match(/\[.*\]/s); 
    if (jsonMatch) {
      jsonString = jsonMatch[0];
      try {
        return JSON.parse(jsonString); 
      } catch (error) {
        console.error("Failed to parse JSON:", error.message);
        return null;
      }
    } else {
      throw new Error("Valid JSON not found in response: " + jsonString);
    }
  } catch (error) {
    console.error("Error fetching from OpenAI:", error);
  }
};


const translateNode = async (data) => {
  const lemmas = data.map(item => item.lemma || item.word);
  const prompt = `Translate the following Ukrainian words into English: ${lemmas.join(', ')}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Translate the following Ukrainian words into English: " + lemmas.join(', ')
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const translations = response.choices[0].message.content.split(',');
    return data.map((item, index) => ({
      ...item,
      translation: translations[index] ? translations[index].trim() : 'N/A' 
    }));
  } catch (error) {
    console.error("Error fetching translations from OpenAI:", error);
  }
};


const formatResponseNode = (data) => {
  return data.map(item => `${item.word} (${item.lemma || 'undefined'}) - ${item.translation || 'undefined'} (${item.part_of_speech || 'undefined'})`);
};

const saveToFileNode = (data) => {
  fs.writeFileSync('analysis_with_translation.json', JSON.stringify(data, null, 2));
  console.log('Analysis saved to analysis_with_translation.json');
};

const sentence = "Хлопчик поклав кавун на стіл";

(async () => {
  const analysisResult = await analyzeNode(sentence);
  if (!analysisResult) return;

  const translationResult = await translateNode(analysisResult);
  if (!translationResult) return;

  const formattedResponse = formatResponseNode(translationResult);
  saveToFileNode(formattedResponse);

  console.log(formattedResponse);
})();
