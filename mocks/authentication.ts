import {MockHandler} from "../plugins/mock-server/server";

export default [
    {
        path: "/api/auth/login",
        method: "post",
        response(req) {
            console.log(req.body);
            return {
                status: 200,
                body: {
                    token: "123",
                },
            };
        },
    },
    {
        path: "/api/auth/logout",
        method: "post",
        response(req) {
            console.log(req.body);
            return {
                status: 200,
                body: {
                    token: "123",
                },
            };
        },
    },
    {
        path: "/api/auth/register",
        method: "post",
        response(req) {
            console.log(req.body);
            return {
                status: 200,
                body: {
                    token: "123",
                },
            };
        },
    },
    {
        path: "/api/auth/user",
        method: "get",
        response(req) {
            console.log(req.body);
            return {
                status: 200,
                body: {
                    id: 111,
                    first_name: "John",
                    last_name: "Doe",
                    email: "john.doe@example.com",
                    role: "admin",
                },
            };
        },
    },
] as MockHandler[];
