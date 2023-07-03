import {AxiosError} from "axios";

export default class ApiError {
    public readonly message: string;
    public readonly status?: number;
    public readonly data?: unknown;

    constructor(message: string, status?: number, data?: unknown) {
        this.message = message;
        this.status = status;
        this.data = data;
    }

    static fromAxiosError(error: AxiosError) {
        return new ApiError(error.message, error.response?.status, error.response?.data);
    }
}
