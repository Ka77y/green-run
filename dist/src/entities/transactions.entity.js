"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionEntity = void 0;
const typeorm_1 = require("typeorm");
const sharedPropsEntity_1 = require("./sharedPropsEntity");
let TransactionEntity = class TransactionEntity extends sharedPropsEntity_1.SharedPropsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment')
], TransactionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true })
], TransactionEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true })
], TransactionEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true })
], TransactionEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true })
], TransactionEntity.prototype, "user_bet_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true })
], TransactionEntity.prototype, "amount", void 0);
TransactionEntity = __decorate([
    (0, typeorm_1.Entity)("transactions")
], TransactionEntity);
exports.TransactionEntity = TransactionEntity;
