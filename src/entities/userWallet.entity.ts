import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import {SharedPropsEntity} from "./sharedPropsEntity";

export type UserTypeEnum = 'admin' | 'user'

@Entity("wallet")
export class WalletEntity extends SharedPropsEntity {
    @PrimaryGeneratedColumn('increment')
    id: number | undefined;

    @Column({ type: 'int', nullable: false })
    user_id: number | undefined;

    @Column({ type: 'double', nullable: false })
    balance: number | undefined;

    @Column({ type: 'varchar', length: 3, nullable: false })
    currency?: string | undefined;
}
