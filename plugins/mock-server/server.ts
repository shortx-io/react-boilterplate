import bodyParser from "body-parser";
import {bundleRequire} from "bundle-require";
import cors from "cors";
import express, {Express, Request} from "express";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

export type MockServerOptions = {
    mockDir?: string;
    path?: string;
    port?: number;
};

export type MockMethod = "get" | "post" | "put" | "delete" | "patch" | "head" | "options" | "all";

export type ResponseHandler = (req: Request) =>
    {
        status: number;
        headers?: Record<string, string>;
        body: unknown;
    };

export type MockHandler = {
    path: string,
    method: MockMethod,
    response: ResponseHandler,
};

export const defaults: MockServerOptions = {
    mockDir: "mocks",
    path: "/api",
    port: 80,
};

export default class MockServer {
    private readonly config: MockServerOptions;
    private server?: http.Server;
    private app?: Express;
    private handlers: MockHandler[] = []; // later added

    constructor(_config: MockServerOptions = {}) {
        this.config = {...defaults, ..._config};
        this.config.mockDir = path.resolve(this.config.mockDir as string);
    }

    checkServerCreated() {
        if(!this.app) {
            throw new Error("Server isn't created.");
        }
    }

    async createMiddleware() {
        this.app = express();
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(cors());

        const files = fs.readdirSync(this.config.mockDir as string);
        for(const file of files) {
            await this.attachHandlers(file);
        }

        for(const handler of this.handlers) {
            this.app?.[handler.method](handler.path, handler.response);
        }

        this.app.use((_, res) => {
            return res.status(404).send("Resource not found").end();
        });

        return this.app;
    }

    async attachHandlers(file: string) {
        this.checkServerCreated();

        const filepath = `${this.config.mockDir}/${file}`;
        if(!fs.existsSync(filepath)) {
            console.log(`Could not find mock file: ${file}`);
            return;
        }

        const {mod} = await bundleRequire({filepath});
        const handlers = mod.default as MockHandler[];
        for(const handler of handlers) {
            this.app?.[handler.method](handler.path, (req, res) => {
                const {status, headers, body} = handler.response(req);
                res.status(status);
                if(headers) {
                    res.set(headers);
                }
                res.send(body).end();
            });
        }
    }

    async addRoute(method: MockMethod, path: string, response: ResponseHandler) {
        this.handlers.push({
            path,
            method,
            response,
        });
    }

    async clearCache(file: string) {
        if(!file.startsWith(this.config.mockDir as string)) {
            return;
        }

        const filename = file.replace(new RegExp(`^${this.config.mockDir}/?`, "g"), "");
        console.log("Mock update:", filename);

        await this.attachHandlers(filename);
    }

    async create() {
        this.server = http.createServer(await this.createMiddleware());
    }

    async start() {
        await this.create();
        this.server?.listen(this.config.port);
    }

    async stop() {
        this.server?.close();
    }

    getUrl() {
        return "http://" + `localhost:${this.config.port}/${this.config.path}`.replace(/\/\//g, "/");
    }
}
