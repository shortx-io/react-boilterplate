import {AuthProvider} from "providers/AuthProvider";
import {HttpClientProvider} from "providers/HttpClientProvider";
import React from "react";
import {RouterProvider} from "react-router";
import HttpClient from "utils/http-client";
import router from "./Router";

export function App() {
    const httpClient = new HttpClient();
    const {DEV, DEV_URL, PROD_URL} = import.meta.env;
    httpClient.setBaseUrl(DEV ? DEV_URL : PROD_URL);

    return <React.StrictMode>
        <HttpClientProvider value={httpClient}>
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
        </HttpClientProvider>
    </React.StrictMode>;
}
