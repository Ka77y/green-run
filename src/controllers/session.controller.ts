import { AppDataSource } from "../mysql"
import {UserEntity} from "../entities/user.entity";
import {
    get
} from "lodash";
import {SessionEntity} from "../entities/sessionEntity";

export const saveSession = async (sessionData: SessionEntity): Promise<void> => {
    console.log("sessionData");
    console.log(sessionData);
    console.log("sessionData");
    const session: SessionEntity = new SessionEntity();

        session.user_id = get(sessionData,"user_id"),
        session.token = get(sessionData,"token"),

    await AppDataSource.manager.save(session);
    console.log("User Session has been saved. User Session id is",session.id);
}

export const updateSession = async (sessionData: SessionEntity, sessionId: number): Promise<void> => {
    const session: SessionEntity = new SessionEntity();

    await AppDataSource.manager.createQueryBuilder()
        .update(session)
        .set({
            ...sessionData
        })
        .where("id = :sessionId", { sessionId })
        .execute()

    console.log("User Session has been saved. User Session id is", session.id);
}
