'use client';

import { LoadingIcon } from '@/assets';
import {
    ExpensesTableContainer,
    MonthlyReportContainer,
    ProfileInfoContainer,
} from '@/components/ProfileComponents';
import TrackStore, { ITrackState } from '@/store/TracksStore';
import { IUserState, UserState } from '@/store/UserStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

const ProfilePage = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // +1 to make it 1-indexed for display or backend.
    const currentYear = currentDate.getFullYear();

    const { tracks, monthlyTotals, loading, error } = useSnapshot(
        TrackStore.TrackState
    ) as ITrackState;

    const router = useRouter();
    const { isUserLoading, isUserLoggedIn } = useSnapshot(
        UserState
    ) as IUserState;

    useEffect(() => {
        if (!isUserLoading && !isUserLoggedIn) {
            router.replace('/login');
        }
    }, [isUserLoading, isUserLoggedIn]);

    useEffect(() => {
        TrackStore.fetchMonthlyTotals({
            month: currentMonth,
            year: currentYear,
        });
    }, [tracks]);

    return isUserLoading || !isUserLoggedIn ? (
        <div className='w-full h-full min-h-screen flex items-center justify-center'>
            <LoadingIcon className='w-24 h-24 flex-shrink-0 animate-spin' />
        </div>
    ) : (
        <div className='w-fit mx-auto bg-white flex gap-4 px-6 py-8 rounded-xl shadow-sm mt-16 min-w-[1200px] items-stretch'>
            <ProfileInfoContainer />
            <div className='flex-grow w-full items-stretch flex flex-col gap-6'>
                <MonthlyReportContainer monthlyTotals={monthlyTotals} />
                <ExpensesTableContainer />
            </div>
        </div>
    );
};

export default ProfilePage;
