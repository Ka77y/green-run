"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const CreateUserHandler_1 = require("./handler/CreateUserHandler");
const CreateBetHandler_1 = require("./handler/CreateBetHandler");
const DepositMoneyHandler_1 = require("./handler/DepositMoneyHandler");
const withdrawtMoneyHandler_ts_1 = require("./handler/withdrawtMoneyHandler.ts");
const UpdateUserHandler_1 = require("./handler/UpdateUserHandler");
const LoginHandler_1 = require("./handler/LoginHandler");
const GetBalanceHandler_1 = require("./handler/GetBalanceHandler");
const joi_1 = __importDefault(require("joi"));
const jwtMiddleware_1 = require("./middlewares/jwtMiddleware");
const userMiddleware_1 = require("./middlewares/userMiddleware");
const GetTransactionsHandler_1 = require("./handler/GetTransactionsHandler");
const GetBetsHandler_1 = require("./handler/GetBetsHandler");
const updateUserSchema = {
    password: joi_1.default.string().min(3).max(50),
    first_name: joi_1.default.string().min(3).max(50),
    last_name: joi_1.default.string().min(3).max(50),
    phone: joi_1.default.string().length(10),
    email: joi_1.default.string().min(3).max(50),
    city: joi_1.default.string().min(3).max(50),
    country: joi_1.default.string().min(3).max(50),
    document_id: joi_1.default.string().min(3).max(50),
    address: joi_1.default.string().min(3).max(50),
    gender: joi_1.default.string().regex(/^(masculine|feminine|neuter)$/),
    birth_date: joi_1.default.string().min(3).max(50),
};
exports.router = [
    {
        method: 'POST',
        path: '/login',
        handler: LoginHandler_1.loginHandler,
        options: {
            validate: {
                payload: joi_1.default.object({
                    username: joi_1.default.string().required().min(3).max(50),
                    password: joi_1.default.string().required().min(3).max(50),
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
        handler: CreateUserHandler_1.createUserHandler,
        options: {
            validate: {
                payload: joi_1.default.object({
                    username: joi_1.default.string().required().min(3).max(50),
                    password: joi_1.default.string().required().min(3).max(50),
                    role: joi_1.default.string().required().regex(/^(admin|user)$/),
                    first_name: joi_1.default.string().required().min(3).max(50),
                    last_name: joi_1.default.string().required().min(3).max(50),
                    phone: joi_1.default.string().length(10),
                    email: joi_1.default.string().required().min(3).max(50),
                    city: joi_1.default.string().min(3).max(50),
                    country: joi_1.default.string().min(3).max(50),
                    document_id: joi_1.default.string().length(10),
                    address: joi_1.default.string().min(3).max(50),
                    gender: joi_1.default.string().required().regex(/^(masculine|feminine|neuter)$/),
                    birth_date: joi_1.default.number().required(),
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
        handler: UpdateUserHandler_1.updateUserHandler,
        options: {
            pre: [{
                    method: jwtMiddleware_1.jwtMiddleware,
                    assign: "jwtMiddleware"
                },
                {
                    method: userMiddleware_1.userMiddleware,
                    assign: "userMiddleware"
                }],
            validate: {
                payload: joi_1.default.object(updateUserSchema),
                failAction(request, h, err) {
                    request.log('error', err);
                    throw err;
                },
            }
        }
    },
    {
        method: 'POST',
        path: '/createBet',
        handler: CreateBetHandler_1.createBetHandler,
        options: {
            pre: [{
                    method: jwtMiddleware_1.jwtMiddleware,
                    assign: "jwtMiddleware"
                }],
            validate: {
                payload: joi_1.default.object({
                    bet_option: joi_1.default.number().required(),
                    status: joi_1.default.string().required().min(3).max(50).regex(/^(active|cancelled|settled)$/),
                    sport: joi_1.default.string().required().min(3).max(50),
                    name: joi_1.default.string().required().min(3).max(50),
                    event_id: joi_1.default.string().required().min(3).max(50),
                    odd: joi_1.default.string().required().min(3).max(50),
                    result: joi_1.default.string().required().min(3).max(50).regex(/^(open|won|lost)$/),
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
        path: '/depositMoney',
        handler: DepositMoneyHandler_1.depositMoneyHandler,
        options: {
            pre: [{
                    method: jwtMiddleware_1.jwtMiddleware,
                    assign: "jwtMiddleware"
                }],
            validate: {
                payload: joi_1.default.object({
                    amount: joi_1.default.number().required()
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
        handler: withdrawtMoneyHandler_ts_1.withdrawtMoneyHandlerTs,
        options: {
            pre: [{
                    method: jwtMiddleware_1.jwtMiddleware,
                    assign: "jwtMiddleware"
                }],
            validate: {
                payload: joi_1.default.object({
                    amount: joi_1.default.number().required()
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
        handler: GetBalanceHandler_1.getBalanceHandler,
        options: {
            pre: [{
                    method: jwtMiddleware_1.jwtMiddleware,
                    assign: "jwtMiddleware"
                }]
        }
    },
    {
        method: 'GET',
        path: '/transactions',
        handler: GetTransactionsHandler_1.getTransactionsHandler,
        options: {
            pre: [{
                    method: jwtMiddleware_1.jwtMiddleware,
                    assign: "jwtMiddleware"
                }]
        }
    },
    {
        method: 'GET',
        path: '/bets',
        handler: GetBetsHandler_1.getBetsHandler,
        options: {
            pre: [{
                    method: jwtMiddleware_1.jwtMiddleware,
                    assign: "jwtMiddleware"
                }]
        }
    }
];
