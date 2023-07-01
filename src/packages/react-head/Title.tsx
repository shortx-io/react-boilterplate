import headManager from "./HeadManager";

export function Title(props: { children: string }) {
    headManager.setTitle(props.children);

    return null;
}
