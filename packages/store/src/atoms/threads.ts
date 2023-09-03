import {atom} from "recoil";

export const threadsState = atom({
  key: 'threads',
  default: [],
});

export const allThreadsState = atom({
    key: 'allThreads',
    default: []
})