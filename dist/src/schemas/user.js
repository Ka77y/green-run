"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
exports.UserSchema = {
    title: "User",
    additionalProperties: false,
    type: "object",
    properties: {
        role: {
            type: "string"
        }
    },
    "required": ["role"]
};
