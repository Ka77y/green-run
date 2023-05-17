"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const sharedPropsEntity_1 = require("./sharedPropsEntity");
let UserEntity = class UserEntity extends sharedPropsEntity_1.SharedPropsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment')
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: false })
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false })
], UserEntity.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false })
], UserEntity.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true })
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true })
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false, unique: true })
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true })
], UserEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true })
], UserEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true })
], UserEntity.prototype, "document_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true })
], UserEntity.prototype, "user_state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true })
], UserEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true })
], UserEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true })
], UserEntity.prototype, "birth_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true })
], UserEntity.prototype, "password", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)("users")
], UserEntity);
exports.UserEntity = UserEntity;
