import {UserEntity} from "../entities/user.entity";
import {ResponseToolkit} from "hapi";
import {get} from "lodash";
import {verifyJWT} from "../util/JWT";
export const jwtMiddleware = (request:any, h: any) => {
    const token: string = get(request, "headers.authorization")
    const user: UserEntity = verifyJWT(token);

    if(user instanceof Error)
        return h.response({
            message: "The authentication Token has been expired, please login!."
        }).code(400);

    return user;
}
