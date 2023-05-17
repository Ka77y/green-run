"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.generateJwt = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function generateJwt(payload) {
    const options = { expiresIn: '20m' };
    // const secret: string = crypto.randomBytes(64).toString('hex');
    // const hashedSecret = crypto.createHash('sha256').update(secret).digest('hex');
    const hashedSecret = "mysecret";
    const token = (0, jsonwebtoken_1.sign)(payload, hashedSecret, options);
    return token;
}
exports.generateJwt = generateJwt;
function verifyJWT(token) {
    const secret = 'mysecret'; // The secret key used to sign the token
    try {
        return (0, jsonwebtoken_1.verify)(token, secret);
    }
    catch (err) {
        throw err;
    }
}
exports.verifyJWT = verifyJWT;
