import {AxiosResponse} from "axios";
import {HttpClient} from "providers/HttpClientProvider";
import ApiError from "../contracts/api-error";
import ApiResponse from "../contracts/api-response";

export default class BaseApi {
    protected httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }

    formatResponse<T>(req: Promise<AxiosResponse>): Promise<ApiResponse<T>> {
        return req
            .then((res) => ApiResponse.fromAxiosResponse<T>(res))
            .catch((err) => {
                throw Promise.reject(ApiError.fromAxiosError(err))
            });
    }
}
