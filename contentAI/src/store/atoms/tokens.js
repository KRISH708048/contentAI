import { atom } from 'recoil';

const tokenAtom = atom({
    key: "tokenAtom",
    default: 0
});

export {tokenAtom};