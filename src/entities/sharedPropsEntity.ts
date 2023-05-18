import {Entity, CreateDateColumn} from "typeorm"

@Entity()
export class SharedPropsEntity {
    @CreateDateColumn({
        default: () => 0,
        type: "bigint",
        name: "created_at"
    })
    created_at: number | undefined;

    @CreateDateColumn({
        default: () => 0,
        type: "bigint",
        name: "updated_at"
    })
    updated_at: number | undefined;

    @CreateDateColumn({
        default: () => 0,
        type: "bigint",
        name: "deleted_at"
    })
    deleted_at: number | undefined;

    @CreateDateColumn({
        default: () => false,
        type: "boolean",
        name: "deleted"
    })
    deleted: boolean | undefined;
}
