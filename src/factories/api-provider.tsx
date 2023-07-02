import {useHttpClient} from "providers";
import {createContext, PropsWithChildren} from "react";

export function createApiProvider<T>(Api: new () => T) {
    const ApiContext = createContext<T>({} as T);

    function ApiProvider({children}: PropsWithChildren) {
        const httpClient = useHttpClient();
        // @ts-ignore
        const api = new Api(httpClient) as unknown as T;

        return (
            <ApiContext.Provider value={api}>
                {children}
            </ApiContext.Provider>
        );
    }

    return {ApiContext, ApiProvider} as const;
}
