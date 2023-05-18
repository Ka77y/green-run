import {createUserHandler} from "./handler/CreateUserHandler";
import {ServerRoute} from "@hapi/hapi";
import {createBetHandler} from "./handler/CreateBetHandler";
import {depositMoneyHandler} from "./handler/DepositMoneyHandler";
import {withdrawtMoneyHandlerTs} from "./handler/withdrawtMoneyHandler.ts";
import {updateUserHandler} from "./handler/UpdateUserHandler";
import {loginHandler} from "./handler/LoginHandler";
import {getBalanceHandler} from "./handler/GetBalanceHandler";
import Joi from "joi";
import {jwtMiddleware} from "./middlewares/jwtMiddleware";
import {userMiddleware} from "./middlewares/userMiddleware";
import {getTransactionsHandler} from "./handler/GetTransactionsHandler";
import {getBetsHandler} from "./handler/GetBetsHandler";
import {adminMiddleware} from "./middlewares/adminMiddleware";
import {updateBetHandler} from "./handler/UpdateBetHandler";
import {placeBetHandler} from "./handler/PlaceBetHandler";
import {settledBetHandler} from "./handler/SettledBetHandler";
import {blockUserHandler} from "./handler/BlockUserHandler";

export const router: ServerRoute[] = [
    {
        method: 'POST',
        path: '/login',
        handler: loginHandler,
        options: {
            validate: {
                payload: Joi.object({
                    username: Joi.string().required().min(3).max(50),
                    password: Joi.string().required().min(3).max(50),
                }),
                failAction(request, h, err) {
                    request.log('error', err);
                    throw err;
                },
            }
        }
    },
    {
        method: 'POST',
        path: '/createUser',
        handler: createUserHandler,
        options: {
            validate: {
                payload: Joi.object({
                    username: Joi.string().required().min(3).max(50),
                    password: Joi.string().required().min(3).max(50),
                    role: Joi.string().required().regex(/^(admin|user)$/),
                    first_name: Joi.string().required().min(3).max(50),
                    last_name: Joi.string().required().min(3).max(50),
                    phone: Joi.string().length(10),
                    email: Joi.string().required().min(3).max(50),
                    city: Joi.string().min(3).max(50),
                    country: Joi.string().min(3).max(50),
                    document_id: Joi.string().length(10),
                    address: Joi.string().min(3).max(50),
                    gender: Joi.string().required().regex(/^(masculine|feminine|neuter)$/),
                    birth_date: Joi.number().required(),
                }),
                failAction(request, h, err) {
                    request.log('error', err);
                    throw err;
                },
            }
        }
    },
    {
        method: 'POST',
        path: '/updateUser',
        handler: updateUserHandler,
        options: {
            pre: [{
                method: jwtMiddleware,
                assign: "jwtMiddleware"
            }],
            validate: {
                payload:  Joi.object({
                    password: Joi.string().min(3).max(50),
                    first_name: Joi.string().min(3).max(50),
                    last_name: Joi.string().min(3).max(50),
                    phone: Joi.string().length(10),
                    email: Joi.string().min(3).max(50),
                    city: Joi.string().min(3).max(50),
                    country: Joi.string().min(3).max(50),
                    document_id: Joi.string().min(3).max(50),
                    address: Joi.string().min(3).max(50),
                    gender: Joi.string().regex(/^(masculine|feminine|neuter)$/),
                    birth_date: Joi.string().min(3).max(50),
                }),
                failAction(request, h, err) {
                    request.log('error', err);
                    throw err;
                },
            }
        }
    },
    {
        method: 'POST',
        path: '/updateUser/{id}',
        handler: updateUserHandler,
        options: {
            pre: [{
                method: jwtMiddleware,
                assign: "jwtMiddleware"
            },
            {
                method: userMiddleware,
                assign: "userMiddleware"
            }],
            validate: {
                payload:  Joi.object({
                    password: Joi.string().min(3).max(50),
                    first_name: Joi.string().min(3).max(50),
                    last_name: Joi.string().min(3).max(50),
                    phone: Joi.string().length(10),
                    email: Joi.string().min(3).max(50),
                    city: Joi.string().min(3).max(50),
                    country: Joi.string().min(3).max(50),
                    document_id: Joi.string().min(3).max(50),
                    address: Joi.string().min(3).max(50),
                    gender: Joi.string().regex(/^(masculine|feminine|neuter)$/),
                    birth_date: Joi.string().min(3).max(50),
                }),
                failAction(request, h, err) {
                    request.log('error', err);
                    throw err;
                },
            }
        }
    },
    {
        method: 'PATCH',
        path: '/blockUser/{id}',
        handler: blockUserHandler,
        options: {
        pre: [{
            method: jwtMiddleware,
            assign: "jwtMiddleware"
        },{
            method: adminMiddleware,
            assign: "adminMiddleware"
        }]
    }
    },
    {
        method: 'POST',
        path: '/createBet',
        handler: createBetHandler,
        options: {
            pre: [{
                method: jwtMiddleware,
                assign: "jwtMiddleware"
            }],
            validate: {
                payload: Joi.object({
                        bet_option: Joi.number().required(),
                        status: Joi.string().required().min(3).max(50).regex(/^(active|cancelled|settled)$/),
                        sport: Joi.string().required().min(3).max(50),
                        name: Joi.string().required().min(3).max(50),
                        event_id: Joi.number().required(),
                        odd: Joi.number().required(),
                        result: Joi.string().required().min(3).max(50).regex(/^(open|won|lost)$/),
                }
                ),
                failAction(request, h, err) {
                    request.log('error', err);
                    throw err;
                },
            }
        }
    },
    {
        method: 'PATCH',
        path: '/updateBet/{id}',
        handler: updateBetHandler,
        options: {
            pre: [{
                method: jwtMiddleware,
                assign: "jwtMiddleware"
            },{
                method: adminMiddleware,
                assign: "adminMiddleware"
            }],
            validate: {
                payload: Joi.object({
                        status: Joi.string().min(3).max(50).regex(/^(active|cancelled|settled)$/),
                }
                ),
                failAction(request, h, err) {
                    request.log('error', err);
                    throw err;
                },
            }
        }
    },
    {
        method: 'PATCH',
        path: '/settledBet/{bet_id}',
        handler: settledBetHandler,
        options: {
            pre: [{
                method: jwtMiddleware,
                assign: "jwtMiddleware"
            },{
                method: adminMiddleware,
                assign: "adminMiddleware"
            }],
            validate: {
                payload: Joi.object({
                        result: Joi.string().min(3).max(50).regex(/^(open|won|lost)$/),
                }
                ),
                failAction(request, h, err) {
                    request.log('error', err);
                    throw err;
                },
            }
        }
    },
    {
        method: 'POST',
        path: '/depositMoney',
        handler: depositMoneyHandler,
        options: {
            pre: [{
                method: jwtMiddleware,
                assign: "jwtMiddleware"
            },
            {
                method: userMiddleware,
                assign: "userMiddleware"
            }],
            validate: {
                payload: Joi.object({
                    amount: Joi.number().required()
                }),
                failAction(request, h, err) {
                    request.log('error', err);
                    throw err;
                },
            }
        }
    },
    {
        method: 'POST',
        path: '/withdrawMoney',
        handler: withdrawtMoneyHandlerTs,
        options: {
            pre: [{
                method: jwtMiddleware,
                assign: "jwtMiddleware"
            },
            {
                method: userMiddleware,
                assign: "userMiddleware"
            }],
            validate: {
                payload: Joi.object({
                    amount: Joi.number().required()
                }),
                failAction(request, h, err) {
                    request.log('error', err);
                    throw err;
                },
            }
        }
    },
    {
        method: 'GET',
        path: '/balance',
        handler: getBalanceHandler,
        options: {
            pre: [{
                method: jwtMiddleware,
                assign: "jwtMiddleware"
            },
            {
                method: userMiddleware,
                assign: "userMiddleware"
            }]
        }
    },
    {
        method: 'POST',
        path: '/placeBet/{id}',
        handler: placeBetHandler,
        options: {
            pre: [{
                method: jwtMiddleware,
                assign: "jwtMiddleware"
            },
            {
                method: userMiddleware,
                assign: "userMiddleware"
            }],
            validate: {
                payload: Joi.object({
                    amount: Joi.number().required()
                }),
                failAction(request, h, err) {
                    request.log('error', err);
                    throw err;
                },
            }
        }
    },
    {
        method: 'GET',
        path: '/transactions',
        handler: getTransactionsHandler,
        options: {
            pre: [{
                method: jwtMiddleware,
                assign: "jwtMiddleware"
            }]
        }
    },
    {
        method: 'GET',
        path: '/bets',
        handler: getBetsHandler,
        options: {
            pre: [{
                method: jwtMiddleware,
                assign: "jwtMiddleware"
            },
                {
                method: adminMiddleware,
                assign: "adminMiddleware"
            }]
        }
    }
];
