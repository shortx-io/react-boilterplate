import {MockHandler} from "../../plugins/mock-server/server";

export default [
    {
        path:'/api/verbs/get',
        method: 'get',
        response(req) {
            return {
                status: 200,
                body: req.query,
            }
        }
    },
    {
        path: '/api/verbs/post',
        method: 'post',
        response(req) {
            return {
                status: 200,
                body: {...req.body, ...req.query},
            }
        }
    },
    {
        path: '/api/verbs/put',
        method: 'put',
        response(req) {
            return {
                status: 200,
                body: {...req.body, ...req.query},
            }
        }
    },
    {
        path: '/api/verbs/patch',
        method: 'patch',
        response(req) {
            return {
                status: 200,
                body: {...req.body, ...req.query},
            }
        }
    },
    {
        path: '/api/verbs/delete',
        method: 'delete',
        response(req) {
            return {
                status: 200,
                body: req.query,
            }
        }
    },
    {
        path: '/api/verbs/404',
        method: 'get',
        response() {
            return {
                status: 404,
            }
        }
    },
] as MockHandler[];
