import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import {SharedPropsEntity} from "./sharedPropsEntity";

export type UserType = 'admin' | 'user';
export type Gender = 'masculine' | 'feminine' | 'neuter';

@Entity("users")
export class UserEntity extends SharedPropsEntity {
    @PrimaryGeneratedColumn('increment')
    id: number | undefined;
    
    @Column({ type: 'varchar', length: 20, nullable: false })
    role: UserType | undefined;

    @Column({ type: 'varchar', length: 50, nullable: false })
    first_name: string | undefined;

    @Column({ type: 'varchar', length: 50, nullable: false })
    last_name: string | undefined;

    @Column({ type: 'varchar', length: 10, nullable: true })
    phone?: string | undefined;

    @Column({ type: 'varchar', length: 50, nullable: true })
    email: string | undefined;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    username: string | undefined;

    @Column({ type: 'varchar', length: 50, nullable: true })
    city: string | undefined;

    @Column({ type: 'varchar', length: 50, nullable: true })
    country: string | undefined;

    @Column({ type: 'varchar', length: 10, nullable: true })
    document_id: string | undefined;

    @Column({ type: 'varchar', length: 50, nullable: true })
    user_state: string | undefined;

    @Column({ type: 'varchar', length: 50, nullable: true })
    address: string | undefined;

    @Column({ type: 'varchar', length: 20, nullable: true })
    gender: Gender | undefined;

    @Column({ type: 'timestamp', nullable: true })
    birth_date: number | undefined;

    @Column({ type: 'text', nullable: true })
    password?: string | undefined;
}
