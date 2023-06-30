import React, {createContext, useReducer} from "react";
import {AuthContextProps, AuthReducer, initialState} from "./reducers/auth-reducer";

type AuthContextPropsWithDispatch = AuthContextProps & {
    dispatch: React.Dispatch<{ type: string, payload?: AuthContextProps }>
};

const AuthContext = createContext<AuthContextPropsWithDispatch>({} as AuthContextPropsWithDispatch);

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(AuthReducer, initialState, x => x);
    return <AuthContext.Provider value={{...state, dispatch}}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;
