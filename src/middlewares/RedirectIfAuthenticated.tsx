import {useAuth} from "providers";
import {PropsWithChildren, ReactNode} from "react";
import {Navigate} from "react-router";

type Props = {
    element?: ReactNode;
} & PropsWithChildren;

export function RedirectIfAuthenticated(props: Props) {
    const {state: authState} = useAuth();

    if(authState.isAuthenticated) {
        return <Navigate to={"/"}/>;
    }

    return <>
        {props.element}
        {props.children}
    </>;
}
