"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import EditableImage from './EditableImage';
import UserForm from './UserForm';
import { useSnapshot } from 'valtio';
import {
    AccountState,
    IUser,
    IUserState,
    setUser,
} from '@/store/UserStore';
import { updateUserData } from '@/app/profile/api';
const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 4,
    px: 2,
    py: 3,

};

export interface EditUserInfoModalProps {
    open: boolean | null;
    setOpen: (open: boolean) => void;
}

export default function EditUserInfoModal({ open, setOpen }: EditUserInfoModalProps) {
    const { isUserLoading, isUserLoggedIn, user } = useSnapshot(AccountState) as IUserState;
    const state = useSnapshot(AccountState);

    const [formData, setFormData] = React.useState(user);
    const [fieldErrors, setFieldErrors] = React.useState({
        firstName: false,
        lastName: false,
        userName: false,
        birthday: false,
    });
    React.useEffect(() => {
        setFormData(user);
    }, [user]);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updatedUser: IUser = {
            ...state.user,
            ...formData
        };
        setUser(updatedUser);
        updateUserData(user._id, formData)
    };

    return (
        <div>
            <Modal
                open={open || false}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmit} className='grid grid-cols-40-60 gap-8'>
                        <EditableImage />
                        <div>
                            <UserForm
                                formData={formData as any}
                                setFormData={setFormData}
                                fieldErrors={fieldErrors}
                                setFieldErrors={setFieldErrors}
                            />
                        </div>
                        <div className='col-span-2 flex justify-center items-center '>
                            <Button variant="outlined" type='submit' style={{ width: "200px" }}>Submit</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
