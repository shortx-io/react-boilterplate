import {Layout} from "layouts/Layout";
import Authentication from "pages/Authentication";
import Dashboard from "pages/Dashboard";
import {createRoutesFromElements, Route} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import {RedirectIfAuthenticated} from "./middlewares/RedirectIfAuthenticated";
import {RequiresAuth} from "./middlewares/RequiresAuth";

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route path="/" element={<RequiresAuth><Dashboard/></RequiresAuth>}/>
            <Route path="/login"
                   element={<RedirectIfAuthenticated><Authentication isSignUp={false}/></RedirectIfAuthenticated>}/>
            <Route path="/signup"
                   element={<RedirectIfAuthenticated><Authentication isSignUp={true}/></RedirectIfAuthenticated>}/>
        </Route>,
    ),
);

export default Router;
