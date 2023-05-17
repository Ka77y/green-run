import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import {SharedPropsEntity} from "./sharedPropsEntity";

export type CategoryEnum = 'deposit' | 'withdraw' | 'bet' | 'winning';

@Entity("transactions")
export class TransactionEntity extends SharedPropsEntity {
    @PrimaryGeneratedColumn('increment')
    id: number | undefined;

    @Column({ type: 'int', nullable: true })
    user_id: number | undefined;

    @Column({ type: 'varchar', length: 20, nullable: true })
    category: CategoryEnum | undefined;

    @Column({ type: 'varchar', length: 10, nullable: true })
    status: string | undefined;

    @Column({ type: 'int', nullable: true })
    user_bet_id: number | undefined;

    @Column({ type: 'double', nullable: true })
    amount: number | undefined;
}
