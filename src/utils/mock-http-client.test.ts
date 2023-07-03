import ApiError from "contracts/api-error";
import ApiResponse from "contracts/api-response";
import MockHttpClient from "utils/mock-http-client";

const params = {hello: "world"};
const body = {goodbye: "world"};
const combined = {...params, ...body};

const setupMockHttp = async () => {
    const httpClient = new MockHttpClient("mocks");
    await httpClient.loadMocks();
    httpClient.setBaseUrl("http://localhost/api");

    return httpClient;
};

let httpClient: MockHttpClient;

beforeAll(async () => {
    httpClient = await setupMockHttp();
});

describe("mock-http-client", () => {
    it("should be able to get an instance of the http client", () => {
        expect(httpClient).toBeInstanceOf(MockHttpClient);
    });

    it("should be able to set the base url", () => {
        httpClient.setBaseUrl("http://localhost/api");

        expect(httpClient.getBaseUrl()).toBe("/api");
    });

    it("should be able to set the authorization header", () => {
        httpClient.setAuthorizationHeader("xxx");

        expect(httpClient.getAuthorizationHeader()).toBe("xxx");
    });

    it("should handle GET requests", async function() {
        const response = await httpClient.get<typeof params>("/verbs/get", {params});
        expect(response).toBeInstanceOf(ApiResponse);
        expect(response.data).toStrictEqual(params);
    });

    it("should handle POST requests", async function() {
        const response = await httpClient.post<typeof params>("/verbs/post", body, {params});
        expect(response).toBeInstanceOf(ApiResponse);
        expect(response.data).toStrictEqual(combined);
    });

    it("should handle PUT requests", async function() {
        const response = await httpClient.put<typeof combined>("/verbs/put", body, {params});
        expect(response).toBeInstanceOf(ApiResponse);
        expect(response.data).toStrictEqual(combined);
    });

    it("should handle PATCH requests", async function() {
        const response = await httpClient.patch<typeof combined>("/verbs/patch", body, {params});
        expect(response).toBeInstanceOf(ApiResponse);
        expect(response.data).toStrictEqual(combined);
    });

    it("should handle DELETE requests", async function() {
        const response = await httpClient.delete<typeof params>("/verbs/delete", {params});
        expect(response).toBeInstanceOf(ApiResponse);
        expect(response.data).toStrictEqual(params);
    });

    it("should handle 404 responses", async function() {
        await httpClient.get("/verbs/404")
                        .catch((err: unknown) => {
                            expect(err).toBeInstanceOf(ApiError);
                        });
    });

    it("should handle 404 responses for non-existent routes", async function() {
        await httpClient.get("/verbs/non-existent")
                        .catch((err: unknown) => {
                            expect(err).toBeInstanceOf(ApiError);
                        });
    });

    it("should be able to add route in runtime", async function() {
        await httpClient.addRoute("get", "/api/verbs/runtime", () => {
            return {status: 200, body: "OK"};
        });

        // await httpClient.get("/verbs/runtime")
        //     .then(r => {
        //         expect(r.data).toBe("OK");
        //     })
    });
});
