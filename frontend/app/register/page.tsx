'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import EnvelopeIcon from '@/components/icons/EnvelopeIcon';
import LockClosedIcon from '@/components/icons/LockClosedIcon';
import img from '@/public/Component3.png';
import img2 from '@/public/statistics.png';
import UserAvatarIcon from '@/public/UserAvatar.png';
import { signUp } from './api';
import { useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';
import {
    UserState,
    IUser,
    setIsUserLoading,
    setIsUserLoggedIn,
    setUser,
    IUserState,
} from '@/store/UserStore';

const RegisterPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [fieldErrors, setFieldErrors] = useState({
        email: false,
        password: false,
        confirmPassword: false,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const { isUserLoading, isUserLoggedIn, user } = useSnapshot(
        UserState
    ) as IUserState;

    useEffect(() => {
        if (!isUserLoading && isUserLoggedIn && user._id) {
            router.replace('/profile');
        }
    }, [isUserLoading, isUserLoggedIn, user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        setFieldErrors({ ...fieldErrors, [name]: value.trim() === '' });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newFieldErrors = {
            email: formData.email.trim() === '',
            password: formData.password.trim() === '',
            confirmPassword: formData.password.trim() === '',
        };

        const hasErrors = Object.values(newFieldErrors).some((error) => error);
        if (hasErrors) {
            setFieldErrors(newFieldErrors);
            setErrorMessage('Please fill in all fields.');
            return;
        }

        setIsUserLoading(true);
        try {
            const response = await signUp(formData);
            localStorage.setItem('token', response.token);
            const updatedUser: IUser = {
                ...user,
                ...(response as any).user._doc,
            };
            setUser(updatedUser);
            router.replace('/profile');
            setIsUserLoggedIn(true);
        } catch (error: any) {
            setErrorMessage(error.message);
        } finally {
            setIsUserLoading(false);
        }
    };

    const getInputClass = (fieldName: keyof typeof fieldErrors) => {
        return `appearance-none border ${
            fieldErrors[fieldName] ? 'border-[#F36C6C]' : 'border-gray-300'
        } rounded w-[420px] py-3 px-3 text-[#070707] leading-tight focus:outline-none focus:shadow-outline focus:border-primary`;
    };

    return (
        <section className='flex align-middle items-center gap-x-40 bg-white rounded shadow-md max-w-8xl max-h-[85vh]  mx-auto mt-16 '>
            <div className='flex flex-col gap-y-[110px] bg-gradient-to-tr from-[#0034D3] to-[#92C5FA] min-w-[660px] my-8 ml-7 rounded-xl'>
                <h1 className='mt-8 ml-8 text-white text-[32px] font-bold font-jura'>
                    CashTrack
                </h1>
                <div className='flex items-center justify-center relative'>
                    <div className='absolute z-10 -bottom-[30px] left-[56px]  shadow-lg'>
                        <Image
                            src={img2}
                            width={171}
                            height={114}
                            alt=''
                        ></Image>
                    </div>
                    <div className='flex flex-col gap-y-4 items-center justify-center bg-white rounded  pt-4 min-w-80 pb-7'>
                        <div className=''>
                            <Image
                                width={116}
                                height={119}
                                src={UserAvatarIcon}
                                alt=''
                            ></Image>
                        </div>
                        <div className='flex flex-col gap-y-1.5 items-center'>
                            <p className='text-xl font-semibold'>Lorem Ipsum</p>
                            <p className='text-[#43454F] text-sm'>
                                loremipsum@gmail.com
                            </p>
                        </div>
                        <a className='bg-primary text-white text-lg px-9 py-1.5 rounded'>
                            Add Expense
                        </a>
                    </div>
                    <div className='bg-white shadow-2xl p-2 max-h-min rounded absolute z-10 top-7 right-[60px]'>
                        <h1 className='text-[#7D8395] pb-2'>Total Balance</h1>
                        <div
                            className='absolute left-0 right-0 mx-auto bg-[#DCDCDC] h-0.5'
                            style={{ bottom: '67%', width: '100%' }}
                        ></div>
                        <div className='flex items-center gap-5.5'>
                            <div className='flex flex-col gap-4'>
                                <p className='text-black text-xs font-custom font-semibold'>
                                    $30,224
                                </p>
                                <p className='text-[#27B867] text-[10px] font-custom font-semibold'>
                                    +12.3 %
                                </p>
                            </div>
                            <Image width={76} height={53} src={img} alt='' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4 items-center text-center text-white mb-16 '>
                    <h1 className='text-4xl font-semibold'>
                        Speady, Easy and Faster
                    </h1>
                    <p className='max-w-[450px] text-xs'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Reprehenderit cum facilis, quis corporis
                        architecto veritatis inventore corrupti expedita vel
                        odio recusandae numquam nostrum id minima quas, debitis
                        voluptas incidunt eum!
                    </p>
                </div>
            </div>
            <div className='flex align-middle items-center flex-col gap-12'>
                <div className='text-center'>
                    <h1 className='text-[32px] font-semibold'>
                        Sign up for Your Account
                    </h1>
                    <p className='text-base text-[#7D8395]'>
                        Send, spend and save smarter
                    </p>
                </div>
                <div>
                    <form
                        className='flex flex-col gap-[25px]'
                        action=''
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <div className='flex items-center mb-1 gap-1'>
                                <EnvelopeIcon color='#DCDCDC' />
                                <label
                                    htmlFor='Full Name'
                                    className='lock  text-sm font-medium text-[#7D8395]'
                                >
                                    Email address
                                </label>
                            </div>
                            <input
                                className={getInputClass('email')}
                                id='email'
                                type='email'
                                name='email'
                                value={formData?.email}
                                onChange={handleChange}
                                placeholder='Enter your email address'
                            />
                        </div>
                        <div>
                            <div className='flex items-center mb-1 gap-1'>
                                <LockClosedIcon color='#DCDCDC' />
                                <label
                                    htmlFor='Full Name'
                                    className='block text-sm font-medium text-[#7D8395]'
                                >
                                    Password
                                </label>
                            </div>
                            <input
                                className={getInputClass('password')}
                                id='password'
                                type='password'
                                name='password'
                                value={formData?.password}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />
                        </div>
                        <div>
                            <div className='flex items-center mb-1 gap-1'>
                                <LockClosedIcon color='#DCDCDC' />
                                <label
                                    htmlFor='Full Name'
                                    className='block text-sm font-medium text-[#7D8395]'
                                >
                                    Repeat your password
                                </label>
                            </div>
                            <input
                                className={getInputClass('confirmPassword')}
                                id='confirmPassword'
                                type='password'
                                name='confirmPassword'
                                value={formData?.confirmPassword}
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />
                        </div>
                        <div className='flex flex-col items-center justify-between'>
                            <button
                                className='bg-primary  text-white font-bold py-3 w-full rounded focus:outline-none focus:shadow-outline'
                                type='submit'
                            >
                                Sign Up
                            </button>
                            {errorMessage && <p>Error: {errorMessage}</p>}
                            <div className='text-center mt-4'>
                                Already have an account?{' '}
                                <a href='/login' className='text-blue-500'>
                                    Sign in here
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
