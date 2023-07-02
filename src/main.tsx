import {AuthProvider} from "providers/AuthProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router";
import "./i18n";
import "./index.css";
import router from "./Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </React.StrictMode>,
);
