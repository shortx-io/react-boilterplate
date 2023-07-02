import axios from "axios";

export default class HttpClient {
    get = axios.get;
    post = axios.post;
    put = axios.put;
    delete = axios.delete;
    patch = axios.patch;
    setAuthorizationHeader = (token: string) => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    };
}
