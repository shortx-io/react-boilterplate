import ApiResponse from "contracts/api-response";
import React, {createContext} from "react";

export interface HttpClient {
    setBaseUrl(url: string): void;

    getBaseUrl(): unknown;

    setAuthorizationHeader(token: string): void;

    getAuthorizationHeader(): unknown;

    get<R, C = unknown>(url: string, config?: C): Promise<ApiResponse<R>>;

    post<R, D = unknown, C = unknown>(url: string, data?: D, config?: C): Promise<ApiResponse<R>>;

    put<R, D = unknown, C = unknown>(url: string, data?: D, config?: C): Promise<ApiResponse<R>>;

    patch<R, D = unknown, C = unknown>(url: string, data?: D, config?: C): Promise<ApiResponse<R>>;

    delete<R, C = unknown>(url: string, config?: C): Promise<ApiResponse<R>>;
}

const HttpClientContext = createContext<HttpClient>({} as HttpClient);

export function HttpClientProvider({children, value}: { children: React.ReactNode, value: HttpClient }) {
    return <HttpClientContext.Provider value={value}>
        {children}
    </HttpClientContext.Provider>;
}

export default HttpClientContext;
