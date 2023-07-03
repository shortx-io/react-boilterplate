import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import {useContext} from "react";
import {wait} from "utils/helpers";
import AxiosHttpClient from "utils/http-client";
import {vi} from "vitest";
import MockServer from "../../plugins/mock-server/server";
import {HttpClientContext, HttpClientProvider} from "./HttpClientProvider";

let server: MockServer;
const fn = vi.fn();

beforeAll(async () => {
    server = new MockServer({
        path: "/api",
        port: 8082,
    });
    await server.addRoute("/api/test", "get", () => {
        fn();

        return {
            status: 200,
            body: 'OK',
        }
    });
    await server.start();
});

afterAll(async () => {
    await server.stop();
});

const useHttpClient = () => useContext(HttpClientContext);

function TestComponent() {
    const httpClient = useHttpClient();

    return (
        <button onClick={() => httpClient.get("/test")}
                data-testid="test">Click me</button>
    );
}

const setup = () => {
    const httpClient = AxiosHttpClient.Instance();
    httpClient.setBaseUrl(server.getUrl());

    render(
        <HttpClientProvider value={httpClient}>
            <TestComponent/>
        </HttpClientProvider>,
    );
};

describe("<HttpClientProvider />", function() {
    beforeEach(setup);
    afterEach(cleanup);

    it("should handle http requests as expected", async function() {
        fireEvent.click(await screen.findByTestId("test"));
        await wait(50);
        expect(fn).toBeCalled();
    });
});
