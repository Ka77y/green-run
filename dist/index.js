"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hapi = __importStar(require("@hapi/hapi"));
require("reflect-metadata");
const mysql_1 = require("./src/mysql");
const router_1 = require("./src/router");
const dotenv_1 = require("dotenv");
const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    server.route(router_1.router);
    await server.start().then();
    console.log("hello !!! Server running");
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
(0, dotenv_1.config)();
(0, mysql_1.initDb)();
init();
