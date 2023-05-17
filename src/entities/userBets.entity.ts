import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import {SharedPropsEntity} from "./sharedPropsEntity";
import {CategoryEnum} from "./transactions.entity";

export type StateEnum = 'open' | 'won' | 'lost';

@Entity("user_bets")
export class UserBetsEntity extends SharedPropsEntity {
    @PrimaryGeneratedColumn('increment')
    id: number | undefined;

    @Column({ type: 'int', nullable: true })
    user_id: number | undefined;

    @Column({ type: 'int', nullable: true })
    bet_id: number | undefined;

    @Column({ type: 'double', nullable: true })
    odd: number | undefined;

    @Column({ type: 'double', nullable: true })
    amount: number | undefined;

    @Column({ type: 'varchar', length: 10, nullable: true })
    state: StateEnum | undefined;
}
