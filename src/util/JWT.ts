import crypto from 'crypto';
import {sign, SignOptions, verify} from "jsonwebtoken";
import {UserEntity} from "../entities/user.entity";
import {get} from "lodash";

export function generateJwt(payload: UserEntity) {
    const options: SignOptions  = { expiresIn: '20m' };
    // const secret: string = crypto.randomBytes(64).toString('hex');
    // const hashedSecret = crypto.createHash('sha256').update(secret).digest('hex');

    const hashedSecret:string = "mysecret";
    const token:string = sign(payload, hashedSecret, options);

    return token
}

export function verifyJWT(token: string): UserEntity {
    const secret: string = 'mysecret'; // The secret key used to sign the token

    try {
        return <UserEntity> verify(token, secret);
    } catch (err) {
        throw err;
    }
}
