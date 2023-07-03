import c from "picocolors";
import {PreviewServerForHook, ProxyOptions, ResolvedConfig, ViteDevServer} from "vite";
import MockServer, {defaults, MockServerOptions} from "./server";


class ViteMockServer {
    private readonly config: MockServerOptions;
    private shouldListen = false;
    private _viteConfig: ResolvedConfig;
    private mockServer: MockServer;

    constructor(_config: MockServerOptions = {}) {
        this.config = {...defaults, ..._config};

        this.mockServer = new MockServer(this.config);
    }

    listen() {
        this.shouldListen = true;
    }

    viteConfig(config: ResolvedConfig) {
        this._viteConfig = config;
    }

    async createMiddleware() {
        if(!this.shouldListen) {
            return (req: unknown, res: unknown, next: () => unknown) => next();
        }

        return await this.mockServer.createMiddleware();
    }

    async configureServer(_server: ViteDevServer | PreviewServerForHook) {
        _server.middlewares.use(await this.createMiddleware());

        const _print = _server.printUrls;
        const path = this.config.path;
        const viteConfig = this._viteConfig;

        _server.printUrls = function() {
            _print();

            const host = `${viteConfig.server.https ? "https" : "http"}://localhost:${viteConfig.server.port || "80"}`;
            console.log(`  ${c.green("➜")}  ${c.bold("Mock Server")}: ${colorUrl(`${host}${path}`)}`);
        };
    }
}

const colorUrl = (url: string) => c.green(url.replace(/:(\d+)\//, (_, port) => `:${c.bold(port)}/`));

export default function mockServer(config?: MockServerOptions) {
    const _config = {...defaults, ...(config || defaults)};
    const server = new ViteMockServer(_config);

    const proxy: Record<string, string | ProxyOptions> = {
        [_config.path]: {}, // proxy our route to nowhere
    };

    return {
        name: "vite:mock-server",
        enforce: "pre" as const,
        config() {
            return {
                server: {proxy},
                preview: {proxy},
            };
        },
        configResolved(c: ResolvedConfig) {
            if(c.command === "serve") {
                server.viteConfig(c);
                server.listen();
            }
        },
        async configureServer(_server: ViteDevServer) {
            await server.configureServer(_server);
        },
        async configurePreviewServer(_server: PreviewServerForHook) {
            await server.configureServer(_server);
        },
    };
}
