import ApiError from "contracts/api-error";
import ApiResponse from "contracts/api-response";
import {Request} from "express";
import fs from "node:fs";
import {HttpClient} from "providers/HttpClientProvider";
import {BaseHttpClient} from "utils/http-client";
import {MockHandler} from "../../plugins/mock-server/server";

type ConfigType = unknown & { params: unknown };

export default class MockHttpClient extends BaseHttpClient implements HttpClient {
    handlers: {
        [method: string]: {
            [path: string]: (req: Request) => { status: number, body?: unknown }
        }
    } = {
        get: {},
        post: {},
        put: {},
        patch: {},
        delete: {},
    };
    private authToken?: string;
    private baseURL?: string;
    private readonly mockDir: string;

    constructor(mockDir: string) {
        super();
        this.mockDir = mockDir;
    }

    async loadMocks() {
        const mockFiles = fs.readdirSync(this.mockDir);
        for(const mockFile of mockFiles) {
            await import(`${this.mockDir}/${mockFile}`).then(({default: module}) => {
                const mocks = module as MockHandler[];
                for(const mock of mocks) {
                    this.handlers[mock.method][mock.path] = mock.response;
                }
            });
        }
    }

    async addRoute(method: string, path: string, handler: (req: Request) => { status: number, body?: unknown }) {
        this.handlers[method.toLowerCase()][path] = handler;
    }

    async respond<R, D = unknown>(method: string, url: string, data?: D, config?: ConfigType) {
        url = `${this.baseURL}/${url}`.replace(/\/\//g, '/');
        if(this.handlers?.[method]?.[url]) {
            const response = this.handlers[method][url]({body: data, query: config?.params || {}} as Request);
            return Promise.resolve(new ApiResponse<R>(response.body as R, response.status));
        }

        return Promise.reject(new ApiError("Not Found", 404));
    }

    async get<R, C = unknown>(url: string, config?: C) {
        return this.respond<R>("get", url, {}, config as ConfigType);
    }

    post<R, D = unknown, C = unknown>(url: string, data?: D, config?: C) {
        return this.respond<R, D>("post", url, data, config as ConfigType);
    }

    put<R, D = unknown, C = unknown>(url: string, data?: D, config?: C) {
        return this.respond<R, D>("put", url, data, config as ConfigType);
    }

    patch<R, D = unknown, C = unknown>(url: string, data?: D, config?: C) {
        return this.respond<R, D>("patch", url, data, config as ConfigType);
    }

    delete<R, C = unknown>(url: string, config?: C) {
        return this.respond<R>("delete", url, {}, config as ConfigType);
    }

    setAuthorizationHeader = (token: string) => {
        this.authToken = token;
    };

    getAuthorizationHeader(): unknown {
        return this.authToken;
    }

    setBaseUrl = (url: string) => {
        this.baseURL = (new URL(url)).pathname;
    };

    getBaseUrl(): unknown {
        return this.baseURL;
    }
}
