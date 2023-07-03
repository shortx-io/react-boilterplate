import {MockHandler} from "../../plugins/mock-server/server";

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
] as MockHandler[];
