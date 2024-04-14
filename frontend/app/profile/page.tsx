'use client';

import { LoadingIcon } from '@/assets';
import { AccountState } from '@/store/UserStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

const ProfilePage = () => {
    const router = useRouter();
    const { isUserLoading, isUserLoggedIn, user } = useSnapshot(AccountState);

    useEffect(() => {
        console.log('User is', user);
        if (!isUserLoading && !isUserLoggedIn) {
            router.replace('/login');
        }
    }, [isUserLoading, isUserLoggedIn]);

    return (
        <div>
            {isUserLoading || !isUserLoggedIn ? (
                <div className='w-full h-full min-h-screen flex items-center justify-center'>
                    <LoadingIcon className='w-24 h-24 flex-shrink-0 animate-spin' />
                </div>
            ) : (
                <div className='w-fit h-fit mx-auto bg-white '></div>
            )}
        </div>
    );
};

export default ProfilePage;
