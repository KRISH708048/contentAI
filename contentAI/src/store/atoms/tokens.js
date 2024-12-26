import { atom, selector } from 'recoil';

export const tokenAtom = atom({
    key: "tokenAtom",
    default: 0
});

// export const historySelector = selector({
//     key: "historySelector",
//     get: async () => {
//         try {
//             await new Promise(r=>setTimeout(r,2000));
//             const response = await fetch("http://localhost:3000/api/v1/user/history", {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error("Failed to fetch history.");
//             }

//             const data = await response.json();
//             return data.data; 
//         } catch (error) {
//             console.error("Error fetching history:", error);
//             return []; 
//         }
//     },
// });

// export const historyAtom = atom({
//     key: "historyAtom",
//     default: historySelector, 
// });

