import crypto from 'crypto';
import {sign, SignOptions, verify} from "jsonwebtoken";
import {UserEntity} from "../entities/user.entity";
import {get} from "lodash";
import {ResponseToolkit} from "hapi";

export function messageResponse(message: string, statusCode: number, h: ResponseToolkit) {
    return h.response({
        message
    }).code(statusCode);
}
