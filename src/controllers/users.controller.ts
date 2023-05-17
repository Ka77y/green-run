import { AppDataSource } from "../mysql"
import {UserEntity} from "../entities/user.entity";
import {
    get, isNil, keys
} from "lodash";
import {WalletEntity} from "../entities/userWallet.entity";
import {SessionEntity} from "../entities/sessionEntity";

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


export const retrieveUser = async (key:string, value: string | number): Promise<UserEntity | null> => {
    const retrieve_query: object = {
        [key]: value
    }
    console.log("retrieve_query")
    console.log(retrieve_query)
    console.log("retrieve_query")
    const user: UserEntity | null = await AppDataSource.getRepository(UserEntity).findOneBy(retrieve_query)

    console.log("user: ", user)

    return user
}

export const updateUser = async (userData: UserEntity, id: number): Promise<void> => {
    const user: UserEntity | null = await retrieveUser("id", id);

    console.log("userData");
    console.log(userData);
    console.log("userData");

    if (!isNil(user)) {
        // @ts-ignore
        Object.keys(userData).forEach((key: string) => (user[key] = userData[key]))
    }

    console.log("userId");
    console.log(user);
    console.log("userId");
    await AppDataSource.manager.save(user);

    console.log("User has been updated. User id is", id);
}
