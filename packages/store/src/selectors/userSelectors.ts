import { selector } from "recoil";
import { userState } from "../atoms/user";


export const userUsernameState = selector({
    key: 'userUsernameState',
    get: ({get}) => {
        const state = get(userState)
        return state;
    }
})