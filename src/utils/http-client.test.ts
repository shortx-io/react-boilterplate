import {HttpClient} from "providers/HttpClientProvider";
import AxiosHttpClient from "utils/http-client";

let httpClient : HttpClient;

const setup = () => {
    httpClient = AxiosHttpClient.Instance();
}

describe('http-client', () => {
    beforeEach(setup);

    it("should be able to get an instance of the http client", () => {
        expect(httpClient).toBeInstanceOf(AxiosHttpClient);
    });

    it("should be able to set the base url", () => {
        httpClient.setBaseUrl("https://example.com");

        expect(httpClient.getBaseUrl()).toBe("https://example.com");
    });

    it("should be able to set the authorization header", () => {
        httpClient.setAuthorizationHeader("xxx");

        expect(httpClient.getAuthorizationHeader()).toBe("xxx");
    });
});
