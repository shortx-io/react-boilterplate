import AuthApi from "api/auth.api";
import {createApiProvider} from "factories/api-provider";
import * as actions from "./actions/auth-actions";
import {AuthReducer, initialState} from "./reducers/auth-reducer";

const {
    ApiProvider: AuthProvider,
    ApiContext: AuthContext,
} = createApiProvider(AuthApi, AuthReducer, actions, initialState);

export {AuthProvider, AuthContext};

export default AuthContext;
