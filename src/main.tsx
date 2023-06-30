import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router";
import './index.css'
import {AuthProvider} from "./providers/AuthProvider";
import router from "./router";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </React.StrictMode>,
)
