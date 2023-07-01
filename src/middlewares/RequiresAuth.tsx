import {useAuth} from "providers/AuthProvider";
import {PropsWithChildren, useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router";

export function RequiresAuth({children}: PropsWithChildren) {
    const auth = useAuth();
    const location = useLocation();
    const [url] = useState(location.pathname);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (auth.isAuthenticated) {
            return;
        }

        auth.dispatch(auth.actions.setNextRoute(url as string));
        setRedirect(true);
    }, [auth, url]);

    if (redirect) {
        return <Navigate to={"/login"}/>;
    }

    if (!auth.isAuthenticated) {
        return null;
    }

    return children;
}
