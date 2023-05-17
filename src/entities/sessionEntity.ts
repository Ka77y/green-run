import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

export type Status = 'on' | 'off';

@Entity("session")
export class SessionEntity {
    @PrimaryGeneratedColumn('increment')
    id: number | undefined;

    @Column({ type: 'int', nullable: true })
    user_id: number | undefined;

    @Column({ type: 'text', nullable: true })
    token: string | undefined;
}
