import {GuestLayout} from "layouts/GuestLayout";
import {UserLayout} from "layouts/UserLayout";
import {useAuth} from "providers";

export function Layout() {
    const auth = useAuth();

    return auth.isAuthenticated ? <UserLayout/> : <GuestLayout/>;
}
