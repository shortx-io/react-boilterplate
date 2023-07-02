import React, {createContext, useReducer} from "react";
import * as actions from "./actions/auth-actions";
import {AuthContextProps, AuthReducer, initialState} from "./reducers/auth-reducer";

type ActionsType = typeof actions;

type AuthContextPropsWithDispatch = AuthContextProps & {
    dispatch: React.Dispatch<{ type: string, payload?: AuthContextProps }>,
    actions: ActionsType,
};

const AuthContext = createContext<AuthContextPropsWithDispatch>({} as AuthContextPropsWithDispatch);

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(AuthReducer, initialState, x => x);

    return <AuthContext.Provider value={{...state, actions, dispatch}}>
        {children}
    </AuthContext.Provider>;
}

export default AuthContext;
