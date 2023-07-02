import {AuthApiProvider} from "providers";
import {PropsWithChildren, ReactNode} from "react";

const providersRegistry = {
    auth: AuthApiProvider,
};

type registryType = typeof providersRegistry;

type ApiProviderProps = {
    providers: (keyof registryType)[],
    component?: ReactNode,
} & PropsWithChildren;

function getProvider(providers: (keyof registryType)[], children: ReactNode[]) {
    if(providers.length === 0) {
        return children;
    }
    const _providers = providers.slice(1);
    const Provider = providersRegistry[providers[0]];
    return <Provider>
        {getProvider(_providers, children)}
    </Provider>;
}

export function ApiProvider({children, providers, component}: ApiProviderProps) {
    return getProvider(providers, [children, component]);
}
