import {get} from "lodash";

export const userMiddleware = async (request:any, h: any) => {
    const {role, user_state} = get(request, "pre.jwtMiddleware", "");

    if(role !== "user") {
        return h.response({
            message: "This endpoint is accesible only for the 'user' role"
        }).code(400);
    }

    if(user_state === "block") {
        return h.response({
            message: "The user is blocked and cannot perform this action"
        }).code(400);
    }

    return h.continue;
}
