"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBetsEntity = void 0;
const typeorm_1 = require("typeorm");
const sharedPropsEntity_1 = require("./sharedPropsEntity");
let UserBetsEntity = class UserBetsEntity extends sharedPropsEntity_1.SharedPropsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment')
], UserBetsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true })
], UserBetsEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true })
], UserBetsEntity.prototype, "bet_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true })
], UserBetsEntity.prototype, "odd", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true })
], UserBetsEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true })
], UserBetsEntity.prototype, "state", void 0);
UserBetsEntity = __decorate([
    (0, typeorm_1.Entity)("user_bets")
], UserBetsEntity);
exports.UserBetsEntity = UserBetsEntity;
