import { AuthApiContext } from "providers/api-providers/AuthApiProvider";
import AuthContext from "providers/AuthProvider";
import HttpClientContext from "providers/HttpClientProvider";
import {useContext} from "react";

export * from "./api-providers/AuthApiProvider";

export function useAuth() {
    return useContext(AuthContext);
}

export function useHttpClient() {
    return useContext(HttpClientContext);
}

export function useAuthApi() {
    return useContext(AuthApiContext);
}
