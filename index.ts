import * as Hapi from '@hapi/hapi';
import "reflect-metadata"
import {ResponseToolkit, Request} from "hapi";
import {initDb} from "./src/mysql"
import {router} from "./src/router";
import {config} from "dotenv";

const init = async (): Promise<void> => {
    const server: Hapi.Server<Hapi.ServerApplicationState> = Hapi.server({
        port: Number(`${process.env.SERVER_PORT}`),
        host: `${process.env.SERVER_HOST}`
    });
    server.route(router)


    await server.start().then();
    console.log("hello !!! Server running")
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

config();
initDb();
init();
