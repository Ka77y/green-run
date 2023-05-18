import { AppDataSource } from "../mysql"
import {UserEntity} from "../entities/user.entity";
import {
    get, isNil, set
} from "lodash";
import {WalletEntity} from "../entities/userWallet.entity";

export const saveUser = async (userData: UserEntity): Promise<number | undefined> => {
    const user: UserEntity = new UserEntity();

    user.role= get(userData,"role","user"),
    user.first_name= get(userData,"first_name", ""),
    user.last_name= get(userData,"last_name", ""),
    user.phone= get(userData,"phone", ""),
    user.email= get(userData,"email",""),
    user.username= get(userData,"username", ""),
    user.country= get(userData,"country", ""),
    user.city= get(userData,"city", ""),
    user.document_id= get(userData,"document_id", ""),
    user.user_state= get(userData,"user_state", ""),
    user.created_at= get(userData,"created_at", 0),
    user.updated_at= get(userData,"updated_at", 0),
    user.deleted= get(userData,"deleted", false),
    user.deleted_at= get(userData,"deleted_at", 0),
    user.address= get(userData,"address", ""),
    user.gender= get(userData,"gender", "neuter"),
    user.birth_date= get(userData,"birth_date", 0)
    user.password= get(userData,"password")

    await AppDataSource.manager.save(user);
    console.log("User has been saved. User id is",user.id);

    return user.id
}


export const retrieveUser = async (payload: object): Promise<UserEntity | null> =>
    await AppDataSource.getRepository(UserEntity).findOneBy(payload);

export const updateUser = async (userData: object, query_payload: object): Promise<void> => {
    const user: UserEntity | null = await retrieveUser(query_payload);
    if (!isNil(userData)) {
        Object.keys(userData).forEach((key: string) => set(<UserEntity>user, key, get(userData, key, "")));
    }

    await AppDataSource.manager.save(UserEntity, {...user, ...userData});
}
