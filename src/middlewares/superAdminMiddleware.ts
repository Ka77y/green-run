import {ResponseToolkit} from "hapi";
import {get} from "lodash";

export const superAdminMiddleware = async (request: Request, h: ResponseToolkit) => {
    const {role} = get(request, "pre.jwtMiddleware", "");

    if(role !== "user")
        return h.response({
            message: "This endpoint is accesible only for the 'user' role"
        }).code(400);
}
