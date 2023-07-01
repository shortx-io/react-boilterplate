import {User} from "models/user";

export type AuthContextProps = {
    isAuthenticated?: boolean;
    user?: User | null,
    token?: string | null,
    nextRoute?: string | null,
    [k: string]: string | number | null | boolean | User | undefined | object,
};

export const initialState: AuthContextProps = {
    isAuthenticated: false,
}

export const actions = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    UPDATE_USER: 'UPDATE_USER',
    SET_NEXT_ROUTE: 'SET_NEXT_ROUTE',
}

export function AuthReducer(state: AuthContextProps, action: {
    type: string,
    payload?: AuthContextProps
}): AuthContextProps {
    switch (action.type) {
        case actions.LOGIN:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
            };
        case actions.LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
            };
        case actions.UPDATE_USER:
        case actions.SET_NEXT_ROUTE:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}
