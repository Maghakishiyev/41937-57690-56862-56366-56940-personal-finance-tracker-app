import { proxy } from 'valtio';
import {
    getUserAccounts,
    addAccountToUser,
    updateUserAccount,
    deleteUserAccount,
} from '../app/accounts/api';

export interface IUserAccountContent {
    name: string;
    emoji: string;
    description?: string;
}

export interface IUserAccount extends IUserAccountContent {
    _id: string;
    userId: string;
}

export interface IuserAccountState {
    accounts: IUserAccount[];
    loading: boolean;
    error: string | null;
}

export const UserAccountsState = proxy<IuserAccountState>({
    accounts: [],
    loading: false,
    error: null,
});

const UserAccountsStore = {
    UserAccountsState,
    resetErrors: () => {
        UserAccountsState.loading = false;
        UserAccountsState.error = null;
    },
    resetUserAccounts: () => {
        UserAccountsState.accounts = [];
        UserAccountsState.loading = false;
        UserAccountsState.error = null;
    },
    fetchAccounts: async function () {
        UserAccountsState.loading = true;
        UserAccountsState.error = null;
        try {
            const data = await getUserAccounts();
            UserAccountsState.accounts = data; // Assuming the API returns an array of accounts
            UserAccountsState.loading = false;
        } catch (error: any) {
            UserAccountsState.error = error.message;
            UserAccountsState.loading = false;
        }
    },
    addAccount: async function (account: IUserAccountContent) {
        UserAccountsState.loading = true;
        UserAccountsState.error = null;
        try {
            const addedAccount = await addAccountToUser(account);
            UserAccountsState.accounts.push(addedAccount); // Add the new account to the state
            UserAccountsState.loading = false;
        } catch (error: any) {
            UserAccountsState.error = error.message;
            UserAccountsState.loading = false;
        }
    },
    updateAccount: async function (account: IUserAccount) {
        UserAccountsState.loading = true;
        UserAccountsState.error = null;
        try {
            const updatedAccount = await updateUserAccount(account);
            const index = UserAccountsState.accounts.findIndex(
                (acc) => acc._id === account._id
            );
            if (index !== -1) {
                UserAccountsState.accounts[index] = updatedAccount;
            }
            UserAccountsState.loading = false;
        } catch (error: any) {
            UserAccountsState.error = error.message;
            UserAccountsState.loading = false;
        }
    },
    deleteAccount: async function (account: IUserAccount) {
        UserAccountsState.loading = true;
        UserAccountsState.error = null;
        try {
            await deleteUserAccount(account);
            UserAccountsState.accounts = UserAccountsState.accounts.filter(
                (accountItem) => accountItem._id !== account._id
            );
            UserAccountsState.loading = false;
        } catch (error: any) {
            UserAccountsState.error = error.message;
            UserAccountsState.loading = false;
        }
    },
};

export default UserAccountsStore;
