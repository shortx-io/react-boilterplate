import {HttpClient} from "providers/HttpClientProvider";

export default class BaseApi {
    protected httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;
    }
}
