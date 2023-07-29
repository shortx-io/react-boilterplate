import {useAuth} from "providers";
import {PropsWithChildren, ReactNode, useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router";

type Props = {
    element?: ReactNode;
} & PropsWithChildren;

export function RequiresAuth(props: Props) {
    const {state: authState, actions: authActions, dispatch} = useAuth();
    const location = useLocation();
    const [url] = useState(location.pathname);

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if(authState.isAuthenticated) {
            return;
        }

        dispatch(authActions.setNextRoute(url as string));
        setRedirect(true);
    }, [authState, authActions, dispatch, url]);

    if(redirect) {
        return <Navigate to={"/login"}/>;
    }

    if(!authState.isAuthenticated) {
        return null;
    }

    return <>
        {props.element}
        {props.children}
    </>;
}
