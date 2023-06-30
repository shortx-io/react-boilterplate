import headManager from "./HeadManager.ts";

export function Favicon(props: { type: string, href: string }) {
    headManager.setFavicon(props);

    return null;
}
