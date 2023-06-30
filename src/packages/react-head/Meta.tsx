import {useEffect, useState} from "react";
import headManager from "./HeadManager.ts";

type MetaProps = {
    charset?: string,
    'httpEquiv'?: string,
    name?: string,
    content?: string
};

export function Meta(props: MetaProps) {
    const [id] = useState<string>('meta_id_' + Math.random().toString(36).substring(2, 11));
    headManager.add(id, props);

    useEffect(() => {
        return () => {
            headManager.remove(id);
        };
    });

    return null;
}
