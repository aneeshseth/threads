import {atom} from "recoil";

export const userState = atom({
  key: 'userState',
  default: {
    username: null,
    password: null,
    profile_pic: null,
    email: null,
    role: null
  },
});

