import {PropsWithChildren} from "react";
import headManager from "./HeadManager";

function jsxToString(jsx: PropsWithChildren): string {
    if(jsx === null || jsx === undefined) {
        return "";
    }

    if(typeof jsx !== "object") {
        return `${jsx}`;
    }

    if(Array.isArray(jsx)) {
        return jsx.map(jsxToString).join("");
    }

    if(jsx?.children === null || jsx?.children === undefined) {
        return "";
    }

    if(typeof jsx.children !== "object") {
        return `${jsx.children}`;
    }

    return jsxToString((jsx?.children as {props: PropsWithChildren}).props);
}

export function Title(title: PropsWithChildren) {
    const titleText = jsxToString(title);
    headManager.setTitle(titleText);

    return null;
}
