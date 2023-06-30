import headManager from "./HeadManager.ts";

export function Title(props: { children: string }) {
    headManager.setTitle(props.children);

    return null;
}
