import {AuthProvider} from "providers/AuthProvider";
import {HttpClientProvider} from "providers/HttpClientProvider";
import React from "react";
import {RouterProvider} from "react-router";
import HttpClient from "utils/http-client";
import router from "./Router";

export function App() {
    const httpClient = HttpClient.Instance();
    const DEV = import.meta.env.DEV;
    const DEV_URL = import.meta.env.VITE_DEV_URL;
    const PROD_URL = import.meta.env.VITE_PROD_URL;

    httpClient.setBaseUrl(DEV ? DEV_URL : PROD_URL);

    return <React.StrictMode>
        <HttpClientProvider value={httpClient}>
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
        </HttpClientProvider>
    </React.StrictMode>;
}
