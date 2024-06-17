The AddUserAccountModal component is a React functional component used for adding and editing user accounts. It leverages Material-UI for the modal and form elements and integrates with an external state store managed by Valtio. The component ensures form data validation and provides feedback to users upon successful or failed operations.

Usage
Import the Component
To use the AddUserAccountModal component in your project, first import it:


import AddUserAccountModal from '@/components/AddUserAccountModal';
Make sure to replace '@/components/AddUserAccountModal' with the correct path based on your project's directory structure.

Include the Component
You can include the AddUserAccountModal component in your application as follows:


const [openModal, setOpenModal] = useState(false);
const [selectedAccount, setSelectedAccount] = useState(null);

<AddUserAccountModal
    open={openModal}
    setOpen={setOpenModal}
    account={selectedAccount}
    setSelectedAccount={setSelectedAccount}
/>;
Example

import React, { useState } from 'react';
import AddUserAccountModal from '@/components/AddUserAccountModal';

const AccountManagementPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);

    const openEditModal = (account) => {
        setSelectedAccount(account);
        setOpenModal(true);
    };

    const openAddModal = () => {
        setSelectedAccount(null);
        setOpenModal(true);
    };

    return (
        <div>
            {/* Button to open add modal */}
            <button onClick={openAddModal}>Add Account</button>
            
            {/* Button to open edit modal */}
            <button onClick={() => openEditModal({ id: 1, name: 'Account 1', emoji: '😊', description: 'Example account' })}>
                Edit Account
            </button>
            
            <AddUserAccountModal
                open={openModal}
                setOpen={setOpenModal}
                account={selectedAccount}
                setSelectedAccount={setSelectedAccount}
            />
        </div>
    );
};

export default AccountManagementPage;
Props
open (boolean, required): Controls the visibility of the modal.
setOpen (function, required): Function to toggle the modal's open/close state.
account (object, optional): The account to edit. If provided, the modal will operate in edit mode; otherwise, it will operate in add mode.
setSelectedAccount (function, required): Function to update the selected account state.
Functions
handleClose
Closes the modal and resets the form state:


const handleClose = () => {
    setSelectedAccount(undefined);
    setFormData({ emoji: '', name: '', description: '' });
    setFieldErrors({ emoji: false, name: false });
    setOpen(false);
};
handleSave
Validates the form data and saves the account, either by adding a new account or updating an existing one:


const handleSave = async () => {
    if (!formData.name || !formData.emoji) {
        alert('Please fill in all required fields.');
        return;
    }

    if (account) {
        await updateAccount({ ...account, ...formData }).then(() =>
            alert('You have successfully updated account ')
        );
    } else {
        await addAccount(formData).then(() =>
            alert('You have successfully added account')
        );
    }

    if (error) {
        console.log('Error while adding new account', error);
        alert(error);
        resetErrors();
    }

    handleClose();
};
handleChange
Handles form input changes and updates the form state and field validation state:


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: value.trim() === '' });
};
Dependencies
React: Utilizes React functional component syntax, hooks (useState, useEffect), and JSX for rendering.
Material-UI (@mui/material): Incorporates Material-UI components (Modal, Box, TextField, Button) for modal functionality, form inputs, and UI elements.
Valtio: Utilizes useSnapshot hook from Valtio for state management integration with the external UserAccountsStore.
Styling
The component utilizes custom styles defined in AddEditAccountModalStyles:

style: Used for the modal's container.
StyledDiv: Custom styled div for form fields.
StyledLabel: Custom styled label for form field labels.


import { StyledDiv, StyledLabel, style } from './AddEditAccountModalStyles';