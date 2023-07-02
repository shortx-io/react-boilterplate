import AuthApi from "api/auth.api";
import {createApiProvider} from "../../factories/api-provider";

export const {
    ApiProvider: AuthApiProvider,
    ApiContext: AuthApiContext,
    useApi: useAuthApi,
} = createApiProvider(AuthApi);
