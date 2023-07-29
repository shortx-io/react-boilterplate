import {Layout} from "layouts/Layout";
import {RedirectIfAuthenticated} from "middlewares/RedirectIfAuthenticated";
import {RequiresAuth} from "middlewares/RequiresAuth";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import Dashboard from "pages/Dashboard";
import {ApiProvider} from "providers/api-providers";
import {createRoutesFromElements, Route} from "react-router";
import {createBrowserRouter} from "react-router-dom";

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route path="/" element={<RequiresAuth element={<Dashboard/>}/>}/>

            <Route path="/login" element={<RedirectIfAuthenticated>
                <ApiProvider providers={["auth"]}>
                    <Login/>
                </ApiProvider>
            </RedirectIfAuthenticated>}/>

            <Route path="/signup" element={<RedirectIfAuthenticated>
                <ApiProvider providers={["auth"]}>
                    <Register/>
                </ApiProvider>
            </RedirectIfAuthenticated>}/>
        </Route>,
    ),
);

export default Router;
