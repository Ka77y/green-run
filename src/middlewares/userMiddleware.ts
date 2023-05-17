import {ResponseToolkit} from "hapi";
import {get} from "lodash";

export const userMiddleware = async (request:any, h: any) => {
    const {role} = get(request, "pre.jwtMiddleware", "");

    if(role !== "user") {
        h.response({
            message: "This endpoint is accesible only for the 'superAdmin' role"
        }).code(400);
        throw new Error();
    }


    return h.continue;
}
