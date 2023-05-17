import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import {SharedPropsEntity} from "./sharedPropsEntity";

export type StatusEnum = 'active' | 'cancelled' | 'settled';
export type ResultEnum = 'won' | 'lost';

@Entity("bets")
export class BetsEntity extends SharedPropsEntity {
    @PrimaryGeneratedColumn('increment')
    id: number | undefined;
    
    @Column({ type: 'int', nullable: false })
    bet_option: number | undefined;

    @Column({ type: 'varchar', length: 50, nullable: true })
    sport: string | undefined;

    @Column({ type: 'varchar', length: 15, nullable: true })
    status: StatusEnum | undefined;

    @Column({ type: 'varchar', length: 50, nullable: true })
    name: string | undefined;

    @Column({ type: 'int', nullable: true })
    event_id: number | undefined;

    @Column({ type: 'double', nullable: true })
    odd: number | undefined;

    @Column({ type: 'varchar', length: 10, nullable: true })
    result: ResultEnum | undefined;
}
