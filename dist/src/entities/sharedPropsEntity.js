"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedPropsEntity = void 0;
const typeorm_1 = require("typeorm");
let SharedPropsEntity = class SharedPropsEntity {
};
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        default: () => 0,
        type: "bigint",
        name: "created_at"
    })
], SharedPropsEntity.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        default: () => 0,
        type: "bigint",
        name: "updated_at"
    })
], SharedPropsEntity.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        default: () => 0,
        type: "bigint",
        name: "deleted_at"
    })
], SharedPropsEntity.prototype, "deleted_at", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        default: () => false,
        type: "boolean",
        name: "deleted"
    })
], SharedPropsEntity.prototype, "deleted", void 0);
SharedPropsEntity = __decorate([
    (0, typeorm_1.Entity)()
], SharedPropsEntity);
exports.SharedPropsEntity = SharedPropsEntity;
