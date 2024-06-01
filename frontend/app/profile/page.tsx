'use client';

import { LoadingIcon } from '@/assets';
import {
    ExpensesTableContainer,
    MonthlyReportContainer,
    ProfileInfoContainer,
} from '@/components/ProfileComponents';
import { IUserState, UserState } from '@/store/UserStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

const ProfilePage = () => {
    const router = useRouter();
    const { isUserLoading, isUserLoggedIn } = useSnapshot(
        UserState
    ) as IUserState;

    useEffect(() => {
        if (!isUserLoading && !isUserLoggedIn) {
            router.replace('/login');
        }
    }, [isUserLoading, isUserLoggedIn]);

    return isUserLoading || !isUserLoggedIn ? (
        <div className='w-full h-full min-h-screen flex items-center justify-center'>
            <LoadingIcon className='w-24 h-24 flex-shrink-0 animate-spin' />
        </div>
    ) : (
        <div className='w-fit mx-auto bg-white flex gap-4 px-6 py-8 rounded-xl shadow-sm mt-16 min-w-[1200px] items-stretch'>
            <ProfileInfoContainer />
            <div className='flex-grow w-full items-stretch flex flex-col gap-6'>
                <MonthlyReportContainer />
                <ExpensesTableContainer />
            </div>
        </div>
    );
};

export default ProfilePage;
