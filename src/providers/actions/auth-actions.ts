import {User} from "../../models/user";
import {actions} from "../reducers/auth-reducer";

export function login(user: User, token: string) {
    return {
        type: actions.LOGIN,
        payload: {
            user,
            token,
        }
    }
}

export function logout() {
    return {
        type: actions.LOGOUT,
    }
}

export function updateUser(user: User) {
    return {
        type: actions.UPDATE_USER,
        payload: {
            user,
        }
    }
}
