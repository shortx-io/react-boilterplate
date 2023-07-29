import {AxiosResponse} from "axios";

export default class ApiResponse<T> {
    public readonly data: T;
    public readonly status: number;

    constructor(data: T, status: number) {
        this.data = data;
        this.status = status;
    }

    static fromAxiosResponse<T>(response: AxiosResponse<never>) {
        return new ApiResponse<T>(response.data, response.status);
    }
}
