import { AppDataSource } from "../mysql"
import {
    get
} from "lodash";
import {BetsEntity} from "../entities/bets.entity";
import {WalletEntity} from "../entities/userWallet.entity";
const wallet: WalletEntity = new WalletEntity();

export const saveWallet = async (walletData: WalletEntity): Promise<void> => {
    wallet.user_id= get(walletData,"user_id"),
    wallet.balance= get(walletData,"balance", 0),
    wallet.currency= "USD",
    wallet.created_at= get(walletData,"created_at", 0),
    wallet.updated_at= get(walletData,"updated_at", 0),
    wallet.deleted= get(walletData,"deleted", false),
    wallet.deleted_at= get(walletData,"deleted_at", 0),

    await AppDataSource.manager.save(wallet);
    console.log("wallet has been saved. Wallet id is",wallet.id, " for the user id", wallet.user_id);
}

export const retrieveWallet = async (key:string, value: string | number): Promise<WalletEntity | null> => {
    const wallet: WalletEntity | null = await AppDataSource.getRepository(WalletEntity).findOneBy({
        user_id: Number(value)
    })

    console.log("wallet: ", wallet)

    return wallet
}

