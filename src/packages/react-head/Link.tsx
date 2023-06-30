import {useEffect, useState} from "react";
import headManager from "./HeadManager.ts";

type LinkProps = {
    rel: string,
    href: string,
    hreflang?: string,
    crossorigin?: 'anonymous' | 'use-credentials'
    media?: string,
    referrerpolicy?: 'no-referrer' | 'origin' | 'unsafe-url',
    sizes?: string,
    type?: string,
    title?: string,
}

export function Link(props: LinkProps) {
    const [id] = useState<string>('link_id_' + Math.random().toString(36).substring(2, 11));
    headManager.add(id, props);

    useEffect(() => {
        return () => {
            headManager.remove(id);
        };
    });

    return null;
}
