import React, {createContext} from "react";
import {AxiosRequestConfig, AxiosResponse} from "axios";

export interface HttpClient {
    setAuthorizationHeader(token: string): void;
    get<T = never, R = AxiosResponse<T>, D = never>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    post<T = never, R = AxiosResponse<T>, D = never>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    put<T = never, R = AxiosResponse<T>, D = never>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    patch<T = never, R = AxiosResponse<T>, D = never>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    delete<T = never, R = AxiosResponse<T>, D = never>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
}

const HttpClientContext = createContext<HttpClient>({} as HttpClient);

export function HttpClientProvider({children, value}: { children: React.ReactNode, value: HttpClient }) {
    return <HttpClientContext.Provider value={value}>
        {children}
    </HttpClientContext.Provider>;
}

export default HttpClientContext;
