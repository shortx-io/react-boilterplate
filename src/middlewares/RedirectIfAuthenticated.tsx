import {useAuth} from "providers";
import {PropsWithChildren, ReactNode} from "react";
import {Navigate} from "react-router";

type Props = {
    c?: ReactNode;
} & PropsWithChildren;

export function RedirectIfAuthenticated(props: Props) {
    const auth = useAuth();

    if(auth.isAuthenticated) {
        return <Navigate to={"/"}/>;
    }

    return <>
        {props.c}
        {props.children}
    </>;
}
