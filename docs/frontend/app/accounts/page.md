# AccountsPage Component Documentation

## Overview

The `AccountsPage` component is a React component designed for managing user accounts. It provides a user interface to view, add, edit, and delete accounts, utilizing various subcomponents and state management via Valtio.

## Dependencies

- `axios`
- `@/components/layout/TabComponents`
- `@/components/modals/AddEditAccountModal/AddEditUserAccountModal`
- `@/components/modals/AddEditAccountModal/DeleteUserAccountModal`
- `@/store/UserAccountsStore`
- `@mui/icons-material`
- `@mui/material`
- `react`
- `valtio`

## Components and Functions

### Imported Components and Functions

- `TabPanel` from `@/components/layout/TabComponents`
- `AddUserAccountModal` from `@/components/modals/AddEditAccountModal/AddEditUserAccountModal`
- `DeleteUserAccountModal` from `@/components/modals/AddEditAccountModal/DeleteUserAccountModal`
- `UserAccountsStore`, `IUserAccount`, `IuserAccountState` from `@/store/UserAccountsStore`
- `Add`, `SellOutlined` from `@mui/icons-material`
- `DeleteIcon`, `EditIcon` from `@mui/icons-material`
- `Button`, `IconButton`, `Paper`, `Table`, `TableBody`, `TableCell`, `TableContainer`, `TableRow` from `@mui/material`
- `useEffect`, `useState` from `react`
- `useSnapshot` from `valtio`

### Component: `AccountsPage`

#### State Variables

- `selectedAccount`: Stores the currently selected account for editing or deletion. Initialized as `undefined`.
- `openAdd`: Boolean state to control the visibility of the `AddUserAccountModal`.
- `openDelete`: Boolean state to control the visibility of the `DeleteUserAccountModal`.

#### Store Variables

- `UserAccountsState`, `fetchAccounts` from `UserAccountsStore`
- `accounts`, `loading`, `error` derived from `useSnapshot(UserAccountsState)`

#### Effects

- `useEffect`: Fetches the user accounts when the component mounts if they are not already loaded.

#### Event Handlers

- `handleEditAccount(account: IUserAccount)`: Sets the selected account and opens the edit modal.
- `handleDeleteAccount(account: IUserAccount)`: Sets the selected account and opens the delete modal.
- `handleAddNew()`: Resets the selected account and opens the add modal.

#### Rendering

The component renders a section containing:

- A title "Manage Accounts".
- A button to add a new account.
- `AddUserAccountModal` and `DeleteUserAccountModal` components for adding and deleting accounts.
- A `TabPanel` containing a table of user accounts with options to edit or delete each account.

### Example Usage

```javascript
import AccountsPage from './path/to/AccountsPage';

function App() {
    return (
        <div className="App">
            <AccountsPage />
        </div>
    );
}

export default App;

## Notes 
The API_BASE_URL should be configured to point to the actual backend URL.
The component relies on the state management provided by Valtio (UserAccountsStore).
Ensure all imported components and modules are available and correctly path-referenced.

## Error Handling 
Error handling is managed within the modals and actions associated with each account operation. Ensure proper error messages are displayed to the user for a better user experience.