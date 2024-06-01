'use client';
import { Avatar, Button } from '@mui/material';
import { UserState, IUser, IUserState, setUser } from '@/store/UserStore';
import React from 'react';
import { useSnapshot } from 'valtio';
import { CloudUpload } from '@mui/icons-material';

const EditableImage = () => {
    const state = useSnapshot(UserState) as IUserState;
    const handleImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('imageFile', file);
                const token = localStorage.getItem('token');
                try {
                    const response = await fetch(
                        'http://localhost:8080/upload/img',
                        {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            body: formData,
                        }
                    );
                    const data = await response.json();
                    const updatedUser: IUser = {
                        ...state.user,
                        imageFile: data.url,
                    };
                    setUser(updatedUser);
                } catch (error) {
                    console.error('Upload error:', error);
                }
            }
        } else {
            console.log('No file selected');
        }
    };
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 20,
            }}
        >
            <Avatar
                src={state.user.imageFile}
                alt='Profile Avatar'
                sx={{ width: 120, height: 120, marginBottom: 2 }}
            />
            <label htmlFor='upload-button'>
                <input
                    accept='image/*'
                    id='upload-button'
                    type='file'
                    style={{ display: 'none' }}
                    name='imageFile'
                    onChange={handleImageChange}
                />
                <Button
                    variant='outlined'
                    component='span'
                    className='flex flex-row gap-x-2.5 items-center'
                >
                    <CloudUpload />
                    Change Image
                </Button>
            </label>
        </div>
    );
};

export default EditableImage;
