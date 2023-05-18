import {UserEntity} from "../entities/user.entity";
import {ResponseToolkit} from "hapi";
import {get, isEmpty, isNil, omit} from "lodash";
import crypto from "js-sha512";
import {retrieveUser, updateUser} from "../controllers/users.controller";
import {messageResponse} from "../util/MessageResponse";

export const updateUserHandler = async (request: Request, h: ResponseToolkit): Promise<object> => {
    const body: UserEntity = <UserEntity> get(request, "payload");
    const {id} = get(request, "pre.jwtMiddleware", "");
    let password: string = get(body, "password", "");


    const payload: number = get(request, "params.id", "") === ""? id : get(request, "params.id", "");


    const user: UserEntity | null = await retrieveUser({id:payload})
    let user_body: UserEntity;

    if (isNil(user))
        return messageResponse("This user can´t be modified", 400, h);



    console.log("request");
    console.log(get(request, "params.id"));
    console.log(id);
    console.log(body);
    console.log("request");

    if (!isEmpty(password)) {
        password = await crypto.sha512(password);
        user_body = {
            ...body,
            password,
            updated_at: Date.now()
        }
    } else {
        user_body = {
            ...body,
            updated_at: Date.now()
        }
    }

    const responseBody: UserEntity = omit(user_body, ["password"]);
    console.log("request");
    console.log(get(request, "params.id"));
    console.log(id);
    console.log(body);
    console.log("request");
    updateUser(user_body, {id});

    return {
        ...responseBody,
    };
};
