import {Layout} from "layouts/Layout";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import Dashboard from "pages/Dashboard";
import {createRoutesFromElements, Route} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import {RedirectIfAuthenticated} from "middlewares/RedirectIfAuthenticated";
import {RequiresAuth} from "middlewares/RequiresAuth";

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route path="/" element={<RequiresAuth c={<Dashboard/>}/>}/>
            <Route path="/login"
                   element={<RedirectIfAuthenticated c={<Login />}/>}/>
            <Route path="/signup"
                   element={<RedirectIfAuthenticated c={<Register/>}/>}/>
        </Route>,
    ),
);

export default Router;
