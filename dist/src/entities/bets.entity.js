"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetsEntity = void 0;
const typeorm_1 = require("typeorm");
const sharedPropsEntity_1 = require("./sharedPropsEntity");
let BetsEntity = class BetsEntity extends sharedPropsEntity_1.SharedPropsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment')
], BetsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false })
], BetsEntity.prototype, "bet_option", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true })
], BetsEntity.prototype, "sport", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 15, nullable: true })
], BetsEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true })
], BetsEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true })
], BetsEntity.prototype, "event_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double', nullable: true })
], BetsEntity.prototype, "odd", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true })
], BetsEntity.prototype, "result", void 0);
BetsEntity = __decorate([
    (0, typeorm_1.Entity)("bets")
], BetsEntity);
exports.BetsEntity = BetsEntity;
