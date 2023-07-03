import axios, {AxiosRequestConfig} from "axios";
import ApiError from "contracts/api-error";
import ApiResponse from "contracts/api-response";
import {HttpClient} from "providers/HttpClientProvider";

export abstract class BaseHttpClient {
    static Instance<T extends BaseHttpClient>(this: new () => T): T {
        return new Proxy(new this(), {
            get: function(target: T, prop: keyof T & string & symbol) {
                if(typeof target[prop] === "function" && ["get", "post", "put", "patch", "delete"].includes(prop)) {
                    const func = target[prop] as (...args: never[]) => Promise<never>;

                    return function(...args: never[]) {
                        return target.formatResponse(func(...args));
                    };
                }

                return target[prop];
            },
        });
    }

    formatResponse<T>(req: Promise<never>): Promise<ApiResponse<T>> {
        return req
            .then((res) => ApiResponse.fromAxiosResponse<T>(res))
            .catch((err) => {
                throw ApiError.fromAxiosError(err);
            });
    }
}

export default class AxiosHttpClient extends BaseHttpClient implements HttpClient {
    get<R, C = unknown>(url: string, config?: C) {
        return axios.get<unknown, ApiResponse<R>>(url, config as AxiosRequestConfig);
    }

    post<R, D = unknown, C = unknown>(url: string, data?: D, config?: C) {
        return axios.post<never, ApiResponse<R>, D>(url, data, config as AxiosRequestConfig<D>);
    }

    put<R, D = unknown, C = unknown>(url: string, data?: D, config?: C) {
        return axios.put<never, ApiResponse<R>, D>(url, data, config as AxiosRequestConfig<D>);
    }

    patch<R, D = unknown, C = unknown>(url: string, data?: D, config?: C) {
        return axios.patch<never, ApiResponse<R>, D>(url, data, config as AxiosRequestConfig<D>);
    }

    delete<R, C = unknown>(url: string, config?: C) {
        return axios.delete<unknown, ApiResponse<R>>(url, config as AxiosRequestConfig);
    }

    setAuthorizationHeader = (token: string) => {
        axios.defaults.headers.common["Authorization"] = token;
    };

    getAuthorizationHeader(): unknown {
        return axios.defaults.headers.common["Authorization"];
    }

    setBaseUrl = (url: string) => {
        axios.defaults.baseURL = url;
    };

    getBaseUrl(): unknown {
        return axios.defaults.baseURL;
    }
}
