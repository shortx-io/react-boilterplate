import {useHttpClient} from "providers";
import {HttpClient} from "providers/HttpClientProvider";
import {createContext, PropsWithChildren} from "react";

export function createApiProvider<T>(Api: (new (h: HttpClient) => T)) {
    const ApiContext = createContext<T>({} as T);

    function ApiProvider({children}: PropsWithChildren) {
        const httpClient = useHttpClient();
        const api = new Api(httpClient);

        return (
            <ApiContext.Provider value={api}>
                {children}
            </ApiContext.Provider>
        );
    }

    return {ApiContext, ApiProvider} as const;
}
