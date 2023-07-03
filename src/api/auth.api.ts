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

export type LogoutResponse = {
    message: string;
};

export default class AuthApi extends BaseApi {
    login(data: LoginProps) {
        return this.httpClient.post<LoginResponse>("/auth/login", data);
    }

    register(data: RegisterProps) {
        return this.httpClient.post<RegisterResponse>("/auth/register", data);
    }

    logout() {
        return this.httpClient.post<LogoutResponse>("/auth/logout");
    }
}
