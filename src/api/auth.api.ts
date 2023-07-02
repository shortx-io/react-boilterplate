import BaseApi from "./base.api";

export type LoginProps = {
    email: string;
    password: string;
};

export type RegisterProps = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

export type LoginResponse = {
    token: string;
}

export type RegisterResponse = {
    message: string;
}

export type LogoutResponse = void;

export default class AuthApi extends BaseApi {
    login(data: LoginProps) {
        return this.formatResponse<LoginResponse>(this.httpClient.post("/auth/login", data));
    }

    register(data: RegisterProps) {
        return this.formatResponse<RegisterResponse>(this.httpClient.post("/auth/register", data));
    }

    logout() {
        return this.formatResponse<LogoutResponse>(this.httpClient.post("/auth/logout"));
    }
}
