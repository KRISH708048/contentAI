import { atom } from 'recoil';

export const generationConfigAtom = atom({
  key: 'generationConfigAtom', 
  default: {
    temperature: 1,
    topP: 0.95,     
    topK: 40,       
    maxOutputTokens: 8192,  
    responseMimeType: 'text/plain', 
  },
});
