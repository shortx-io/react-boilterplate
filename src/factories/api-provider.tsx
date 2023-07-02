import BaseApi from "api/base.api";
import {useHttpClient} from "providers";
import {createContext, useContext} from "react";

export function createApiProvider<T extends typeof BaseApi>(Api: T) {
    const ApiContext = createContext<T>({} as T);

    function ApiProvider({children}: {children: never}) {
        const httpClient = useHttpClient();
        const api = new Api(httpClient) as unknown as T;

        return (
            <ApiContext.Provider value={api}>
                {children}
            </ApiContext.Provider>
        );
    }

    const useApi = () => useContext(ApiContext);

    return {ApiContext, ApiProvider, useApi} as const;
}
