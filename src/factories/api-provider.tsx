import HttpClientContext, {HttpClient} from "providers/HttpClientProvider";
import {createContext, Dispatch, PropsWithChildren, useContext, useReducer} from "react";

export function createApiProvider<T, A = never, S = never>(Api: (new (h: HttpClient) => T), _reducer?: (state: S, action: { type: string, payload?: S }) => S, _actions?: A, _initialState?: S) {
    const ApiContext = createContext<{api: T, state: S, actions: A, dispatch: Dispatch<{ type: string, payload?: S }>}>({} as {api: T, state: S, actions: A, dispatch: Dispatch<{ type: string, payload?: S }>});

    function ApiProvider({children}: PropsWithChildren) {
        const httpClient = useContext(HttpClientContext);
        const api = new Api(httpClient);

        const reducer = _reducer || ((state: S) => { return state; });
        const initialState = _initialState || {} as S;
        const actions = _actions || {} as A;

        const [state, dispatch] = useReducer(reducer, initialState);

        return (
            <ApiContext.Provider value={{api, state, actions, dispatch}}>
                {children}
            </ApiContext.Provider>
        );
    }

    return {ApiContext, ApiProvider} as const;
}
