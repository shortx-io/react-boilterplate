import AuthApi from "api/auth.api";
import {useContext} from "react";
import {createApiProvider} from "../../factories/api-provider";

// @ts-ignore
export const {ApiProvider: AuthApiProvider, ApiContext: AuthApiContext} = createApiProvider(AuthApi);
export const useAuthApi = () => useContext(AuthApiContext);
