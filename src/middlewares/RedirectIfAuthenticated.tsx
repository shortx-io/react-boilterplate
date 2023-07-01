import {PropsWithChildren} from "react";
import {Navigate} from "react-router";
import {useAuth} from "providers/AuthProvider";

export function RedirectIfAuthenticated({children}: PropsWithChildren) {
    const auth = useAuth();

    if (auth.isAuthenticated) {
        return <Navigate to={"/"}/>;
    }

    return children;
}
