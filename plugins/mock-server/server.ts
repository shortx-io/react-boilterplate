import bodyParser from "body-parser";
import {bundleRequire} from "bundle-require";
import express, {Request} from "express";
import fs from "node:fs";

export type MockServerOptions = {
    mockDir?: string;
    path?: string;
    port?: number;
};

export type MockMethod = "get" | "post" | "put" | "delete" | "patch" | "head" | "options" | "all";

export type MockHandler = {
    path: string,
    method: MockMethod,
    response: (req: Request) =>
        {
            status: number;
            headers?: Record<string, string>;
            body: unknown;
        }
};

export const defaults: MockServerOptions = {
    mockDir: "mocks",
    path: "/api",
    port: 80,
};

export default class MockServer {
    private readonly config: MockServerOptions;

    constructor(_config: MockServerOptions = {}) {
        this.config = {...defaults, ..._config};
    }

    async createMiddleware() {
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
                    res.send(body).end();
                });
            }
        }

        app.use((req, res) => {
            res.status(404).send("Not Found");
        });

        return app;
    }
}
