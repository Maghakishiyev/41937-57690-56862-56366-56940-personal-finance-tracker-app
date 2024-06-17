### Overview
The ProfileInfoContainer component is a React functional component designed to display a user's profile information in a structured and visually appealing format. It includes user details such as avatar, name, email, and other personal information. Additionally, it provides functionality to edit the user's personal information via a modal dialog.

### Imports

import EditUserInfoModal from '@/components/layout/EditUserInfoModal';
import { shortenString } from '@/helpers';
import { UserState, IUserState } from '@/store/UserStore';
import { Avatar } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useSnapshot } from 'valtio';
Constants
USER_INFO_FIELDS
A mapping object that defines the display labels for the user's information fields.


const USER_INFO_FIELDS: { [key: string]: string } = {
    email: 'Email:',
    userName: 'User Name:',
    firstName: 'First Name:',
    lastName: 'Last Name:',
    birthday: 'Birthday:',
};
Functional Component
ProfileInfoContainer
This is the main functional component that renders the user's profile information and includes an edit button to open the EditUserInfoModal.

### Props
The ProfileInfoContainer does not accept any props.

### State
open: A boolean state to manage the visibility of the EditUserInfoModal.
useSnapshot
The useSnapshot hook from Valtio is used to get the current state of the UserState.


const { user } = useSnapshot(UserState) as IUserState;
useMemo
The useMemo hook is used to optimize the rendering of the user information fields. It maps over the user's information and renders each field that is defined in USER_INFO_FIELDS.


const renderUserInfo = useMemo(
    () =>
        Object.entries(user)?.map(([key, value]) => {
            if (USER_INFO_FIELDS?.[key]) {
                return (
                    <span
                        key={USER_INFO_FIELDS?.[key]}
                        className='w-full text-left text-sm font-regular text-[#7D8395]'
                    >
                        {USER_INFO_FIELDS?.[key]}{' '}
                        {value?.length > 23
                            ? shortenString(value, 10, 10)
                            : value}
                    </span>
                );
            }
        }),
    [user]
);
handleEditPersonalInfo
A function to handle the click event of the edit button, setting the open state to true to display the EditUserInfoModal.



const handleEditPersonalInfo = () => {
    setOpen(true);
};
Return JSX
The component returns JSX that includes:

A container for the profile information with padding, border, and shadow styling.
The user's avatar, name, and email displayed centrally.
A list of other user information fields rendered using the renderUserInfo memoized function.
An "Edit Personal Info" button that opens the EditUserInfoModal.

return (
    <div className='min-w-[280px] w-[280px] items-stretch px-4 py-8 shadow-sm border border-[#dcdcdc] bg-white rounded flex flex-col flex-grow gap-64 justify-between'>
        <div className='flex flex-col items-center w-full gap-16'>
            <div className='flex w-full items-center flex-col gap-4'>
                <div className='rounded-full flex-shrink-0 w-[116px] h-[116px] overflow-clip'>
                    <Avatar
                        src={user.imageFile}
                        alt='Profile Avatar'
                        sx={{ width: 120, height: 120, marginBottom: 2 }}
                    />
                </div>
                {(user?.firstName || user?.lastName) && (
                    <span className='w-full text-center font-semibold text-black text-xl'>
                        {user?.firstName} {user.lastName}
                    </span>
                )}
                <span className='font-normal text-sm w-full text-center text-[#43454F]'>
                    {user?.email}
                </span>
            </div>
            <div className='flex flex-col items-start gap-1.5'>
                {renderUserInfo}
            </div>
        </div>
        <div className='w-full'>
            <button
                onClick={handleEditPersonalInfo}
                className='w-full py-3 flex items-center justify-center text-[#2D76E9] bg-white hover:bg-[#bbd3fb] border border-[#2D76E9] rounded hover:shadow-sm'
            >
                Edit Personal Info
            </button>
            <EditUserInfoModal open={open} setOpen={setOpen} />
        </div>
    </div>
);

### Helper Functions
shortenString
A helper function that shortens a string to a specified length, used here to truncate long user information values for display purposes.

### Components Used
Avatar
The Avatar component from @mui/material is used to display the user's profile picture.

### EditUserInfoModal
A custom modal component imported from @/components/layout/EditUserInfoModal that allows editing of user information.