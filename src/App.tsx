import {AuthProvider} from "providers/AuthProvider";
import {HttpClientProvider} from "providers/HttpClientProvider";
import React from "react";
import {RouterProvider} from "react-router";
import HttpClient from "utils/http-client";
import router from "./Router";

export function App() {
    const httpClient = new HttpClient();

    return <React.StrictMode>
        <HttpClientProvider value={httpClient}>
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
        </HttpClientProvider>
    </React.StrictMode>;
}
