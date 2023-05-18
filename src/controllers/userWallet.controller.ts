import { AppDataSource } from "../mysql"
import {
    get, isNil, set
} from "lodash";
import {WalletEntity} from "../entities/userWallet.entity";

export const saveWallet = async (walletData: object): Promise<void> => {
    const wallet: WalletEntity = new WalletEntity();

    wallet.user_id= get(walletData,"user_id");
    wallet.balance= get(walletData,"balance", 0);
    wallet.currency= "USD";
    wallet.created_at= get(walletData,"created_at", 0);
    wallet.updated_at= get(walletData,"updated_at", 0);
    wallet.deleted= get(walletData,"deleted", false);
    wallet.deleted_at= get(walletData,"deleted_at", 0);

    await AppDataSource.manager.save(wallet);
    console.log("wallet has been saved. Wallet id is",wallet.id, " for the user id", wallet.user_id);
}

export const retrieveWallet = async (payload: object): Promise<WalletEntity | null> =>
    await AppDataSource.getRepository(WalletEntity).findOneBy(payload);

export const updateWallet = async (walletData: object, query_payload: object): Promise<void> => {
    const wallet: WalletEntity | null = await retrieveWallet(query_payload);

    if (!isNil(walletData)) {
        Object.keys(walletData).forEach((key: string) => set(<WalletEntity>wallet, key, get(walletData, key, "")));
    }

    await AppDataSource.manager.save(WalletEntity, walletData);
}
