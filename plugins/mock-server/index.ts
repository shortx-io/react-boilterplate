import bodyParser from "body-parser";
import {bundleRequire} from "bundle-require";
import express, {Request} from "express";
import fs from "node:fs";
import c from "picocolors";
import {PreviewServerForHook, ProxyOptions, ResolvedConfig, ViteDevServer} from "vite";


type MockServerOptions = {
    mockDir?: string;
    path?: string;
    port?: number;
};

type MockMethod = "get" | "post" | "put" | "delete" | "patch" | "head" | "options" | "all";

export type MockHandler = {
    path: string,
    method: MockMethod,
    response: (req: Request) =>
        {
            status: number;
            headers?: Record<string, string>;
            body: any;
        }
};

const defaults: MockServerOptions = {
    mockDir: "mocks",
    path: "/api",
    port: 80,
};

class MockServer {
    private readonly config: MockServerOptions;
    private shouldListen = false;
    private _viteConfig: ResolvedConfig;

    constructor(_config: MockServerOptions = {}) {
        this.config = {...defaults, ..._config};
    }

    listen() {
        this.shouldListen = true;
    }

    viteConfig(config: ResolvedConfig) {
        this._viteConfig = config;
    }

    async createMiddleware() {
        if(!this.shouldListen) {
            return (req: any, res: any, next: any) => next();
        }

        const app = express();
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

        const files = fs.readdirSync(this.config.mockDir);
        for(const file of files) {
            const {mod} = await bundleRequire({filepath: `${process.cwd()}/${this.config.mockDir}/${file}`});
            const handlers = mod.default as MockHandler[];
            for(const handler of handlers) {
                app[handler.method](handler.path, (req, res) => {
                    const {status, headers, body} = handler.response(req);
                    res.status(status);
                    if(headers) {
                        res.set(headers);
                    }
                    res.send(body);
                });
            }
        }

        return app;
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

    transform;
}

const colorUrl = (url: string) => c.green(url.replace(/:(\d+)\//, (_, port) => `:${c.bold(port)}/`));

export default function mockServer(config?: MockServerOptions) {
    const _config = {...defaults, ...(config || defaults)};
    const server = new MockServer(_config);

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
