"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletEntity = void 0;
const typeorm_1 = require("typeorm");
const sharedPropsEntity_1 = require("./sharedPropsEntity");
let WalletEntity = class WalletEntity extends sharedPropsEntity_1.SharedPropsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment')
], WalletEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false })
], WalletEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: false })
], WalletEntity.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 3, nullable: false })
], WalletEntity.prototype, "currency", void 0);
WalletEntity = __decorate([
    (0, typeorm_1.Entity)("wallet")
], WalletEntity);
exports.WalletEntity = WalletEntity;
