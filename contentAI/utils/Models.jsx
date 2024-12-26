import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
// import dotenv from 'dotenv';
// dotenv.config();

const apiKey = "AIzaSyBjCVQdiXIh9_Q_uY4vbXx-frf6lEy7wZI" ;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// Asynchronous function to start a chat session and send a message
export async function getChatResponse(input) {
  try {
    const generationConfig = useRecoilValue(generationConfigAtom);
    const chatSession = await model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(input);
    return result.response.text();
  } catch (error) {
    console.error("Error with Google Generative AI:", error);
    return "An error occurred.";
  }
}
