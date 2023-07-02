export default class ApiError {
    public readonly message: string;
    public readonly status: number;
    public readonly data: any;

    constructor(message: string, status: number, data: any) {
        this.message = message;
        this.status = status;
        this.data = data;
    }

    static fromAxiosError(error: any) {
        return new ApiError(error.message, error.response.status, error.response.data);
    }
}
