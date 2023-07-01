import headManager from "./HeadManager";

export function Favicon(props: { type: string, href: string }) {
    headManager.setFavicon(props);

    return null;
}
