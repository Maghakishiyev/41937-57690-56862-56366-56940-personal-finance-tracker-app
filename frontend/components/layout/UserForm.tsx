import React from 'react';
import { TextField } from '@mui/material';
import { IUserState } from '@/store/UserStore';

interface IUserFormProps { formData: any, setFormData: any, fieldErrors: any, setFieldErrors: any }

const UserForm: React.FC<IUserFormProps> = ({ formData, setFormData, fieldErrors, setFieldErrors }: IUserFormProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: value.trim() === '' });
    };

    function formatDateISO(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        const birthday = value.substring(0, 10);
        setFormData({ ...formData, [name]: birthday });
        setFieldErrors({ ...fieldErrors, [name]: value.trim() === '' });
    }
    return (
        <div className='flex flex-col gap-6'>
            <div>
                <TextField
                    error={fieldErrors.firstName}
                    id='firstName'
                    label="First name"
                    variant="outlined"
                    type='text'
                    name='firstName'
                    value={formData?.firstName}
                    onChange={handleChange}
                    className='w-[80%]'
                />
            </div>
            <div>
                <TextField
                    error={fieldErrors.lastName}
                    id='lastName'
                    label="Last name"
                    variant="outlined"
                    type='text'
                    name='lastName'
                    value={formData?.lastName}
                    onChange={handleChange}
                    className='w-[80%]'
                />
            </div>
            <div>
                <TextField
                    error={fieldErrors.userName}
                    id='userName'
                    label="User name"
                    variant="outlined"
                    type='text'
                    name='userName'
                    value={formData?.userName}
                    onChange={handleChange}
                    className='w-[80%]'
                />
            </div>
            <div>
                <TextField
                    disabled
                    error={fieldErrors.email}
                    id='email'
                    label="Email"
                    variant="outlined"
                    type='email'
                    name='email'
                    value={formData?.email}
                    onChange={handleChange}
                    className='w-[80%]'
                />
            </div>
            <div>
                <TextField
                    error={fieldErrors.birthday}
                    id='birthday'
                    label="Birthday"
                    variant="outlined"
                    type='date'
                    name='birthday'
                    value={formData?.birthday}
                    onChange={formatDateISO}
                    className='w-[80%]'
                />
            </div>
        </div>

    );
};

export default UserForm;
