### Interfaces
### IUserAccountContent
Represents the content of a user account without its unique identifier.

export interface IUserAccountContent {
    name: string;
    emoji: string;
    description?: string;
}
### IUserAccount
Extends IUserAccountContent by adding _id and userId fields.

export interface IUserAccount extends IUserAccountContent {
    _id: string;
    userId: string;
}
### IuserAccountState
Represents the state structure for user accounts, including loading and error states.

export interface IuserAccountState {
    accounts: IUserAccount[];
    loading: boolean;
    error: string | null;
}
### State
The UserAccountsState is a proxy state managed by Valtio.

export const UserAccountsState = proxy<IuserAccountState>({
    accounts: [],
    loading: false,
    error: null,
});
### Store Methods
### resetErrors
Resets the loading and error states.

resetErrors: () => {
    UserAccountsState.loading = false;
    UserAccountsState.error = null;
},
### resetUserAccounts
Resets the accounts array and the loading and error states.

resetUserAccounts: () => {
    UserAccountsState.accounts = [];
    UserAccountsState.loading = false;
    UserAccountsState.error = null;
},
### fetchAccounts
Fetches the user accounts from the API and updates the state. Handles loading and error states.

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
### addAccount
Adds a new account to the state and handles loading and error states.

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
### updateAccount
Updates an existing account in the state and handles loading and error states.

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
### deleteAccount
Deletes an account from the state and handles loading and error states.

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
### Usage
To use the UserAccountsStore in your application, import it and utilize its methods to manage user account-related data. Below is an example of how to fetch user accounts and display them in a React component.

import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import UserAccountsStore from '@/store/UserAccountsStore';

const AccountsComponent: React.FC = () => {
    const { accounts, loading, error } = useSnapshot(UserAccountsStore.UserAccountsState);

    useEffect(() => {
        UserAccountsStore.fetchAccounts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>User Accounts</h1>
            <ul>
                {accounts.map((account) => (
                    <li key={account._id}>
                        {account.name} - {account.emoji}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AccountsComponent;
In this example, the AccountsComponent fetches user accounts when it mounts and displays them in a list. It also handles loading and error states.






