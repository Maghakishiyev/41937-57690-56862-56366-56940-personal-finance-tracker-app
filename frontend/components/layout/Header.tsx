'use client';
import {
    AccountState,
    setIsUserLoading,
    setIsUserLoggedIn,
    setUser,
} from '@/store/UserStore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useSnapshot } from 'valtio';

const Header: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname()
    const { isUserLoading, isUserLoggedIn, user } = useSnapshot(AccountState);
    const userInfo = { ...user }
    const signOutClickHandler = useCallback(() => {
        setIsUserLoading(true);
        setUser({
            _id: '',
            email: '',
            firstName: '',
            lastName: '',
            userName: '',
            imageFile: '',
            birthday: '',
            categories: []
        });
        setIsUserLoggedIn(false);
        setIsUserLoading(false);
        router.replace('/');
    }, []);

    useEffect(() => {
        if (!isUserLoading && !isUserLoggedIn) {
            router.replace('/login');
        }
    }, [isUserLoading, isUserLoggedIn]);

    return (
        <header className='bg-blue-800 flex justify-between items-center px-8 py-3'>
            <div className='flex items-center'>
                <Link href='/'>
                    <h1 className='text-white text-3xl font-bold mr-16 cursor-pointer font-jura'>
                        CashTrack
                    </h1>
                </Link>
                <div className='flex items-center gap-4'>
                    <Link className='relative' href='/'>
                        <span className='text-white text-lg relative cursor-pointer'>
                            Home
                        </span>
                        {pathname == '/' && (
                            <span className='absolute left-0 bottom-0 h-0.5 w-full bg-white'></span>
                        )}
                    </Link>
                    {isUserLoggedIn && (
                        <div className='flex flex-row gap-x-4'>
                            <Link className='relative' href='/profile'>
                                <span className='text-white text-lg cursor-pointer'>
                                    Profile
                                </span>
                                {pathname == '/profile' && <span className='absolute left-0 bottom-0 h-0.5 w-full bg-white'></span>}
                            </Link>
                            <Link className='relative' href='/track'>
                                <span className='text-white text-lg cursor-pointer'>
                                    Track
                                </span>
                                {pathname == '/track' && <span className='absolute left-0 bottom-0 h-0.5 w-full bg-white'></span>}
                            </Link>
                            <Link className='relative' href='/categories'>
                                <span className='text-white text-lg cursor-pointer'>
                                    Categories
                                </span>
                                {pathname == '/categories' && <span className='absolute left-0 bottom-0 h-0.5 w-full bg-white'></span>}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {!isUserLoggedIn ? (
                <div className='flex'>
                    <Link href='/login' legacyBehavior>
                        <a className='bg-black text-white text-lg px-4 py-2 rounded-lg mr-3'>
                            Sign In
                        </a>
                    </Link>
                    <Link href='/register' legacyBehavior>
                        <a className='bg-white text-blue-800 text-lg px-4 py-2 rounded-lg'>
                            Sign Up
                        </a>
                    </Link>
                </div>
            ) : (
                <div className='flex flex-row gap-x-3 items-center'>
                    <span className='cursor-pointer text-white'>
                        {userInfo.userName}
                    </span>
                    <button
                        onClick={signOutClickHandler}
                        className='bg-black text-white text-lg px-4 py-2 rounded-lg'
                    >
                        Sign out
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
