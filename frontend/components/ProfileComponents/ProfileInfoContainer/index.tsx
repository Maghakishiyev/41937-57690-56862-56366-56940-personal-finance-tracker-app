import EditUserInfoModal from '@/components/layout/EditUserInfoModal';
import { shortenString } from '@/helpers';
import { AccountState, IUserState } from '@/store/UserStore';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import { useSnapshot } from 'valtio';

const USER_INFO_FIELDS: { [key: string]: string } = {
    email: 'Email:',
    userName: 'User Name:',
    firstName: 'First Name:',
    lastName: 'Last Name:',
    birthday: 'Birthday:',
};

export const ProfileInfoContainer: React.FC = () => {
    const { user } = useSnapshot(AccountState) as IUserState;
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const defaultImagePath = '/frontend/public/default_profile_icon.png';
    const img = user.imageFile ?? defaultImagePath;

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

    const handleEditPersonalInfo = () => {
        setOpen(true);
    };

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
};
