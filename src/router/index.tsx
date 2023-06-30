import {Layout} from "layouts/Layout";
import Authentication from "pages/Authentication";
import {createRoutesFromElements, Route} from "react-router";
import {createBrowserRouter} from "react-router-dom";

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route path="/login" element={<Authentication isSignUp={false}/>}/>
            <Route path="/signup" element={<Authentication isSignUp={true}/>}/>
        </Route>
    )
);
export default Router;
