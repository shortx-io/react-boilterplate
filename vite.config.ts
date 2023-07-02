import react from "@vitejs/plugin-react-swc";
import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mockServer from "./plugins/mock-server";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({tsDecorators: true}),
        tsconfigPaths(),
        mockServer(),
    ],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTests.ts",
        coverage: {
            provider: "istanbul",
            reportsDirectory: "coverage",
            reporter: [["text", {file: "coverage.txt"}], "json-summary"],
        },
    },
    base: "/",
});
