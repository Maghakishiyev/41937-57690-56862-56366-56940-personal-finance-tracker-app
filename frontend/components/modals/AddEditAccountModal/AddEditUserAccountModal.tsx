import {
    BoltOutlined,
    BorderColorOutlined,
    GridViewOutlined,
} from '@mui/icons-material';
import { Box, Button, Modal, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import ModalTitle from '@/components/layout/ModalTitle';
import { StyledDiv, StyledLabel, style } from './AddEditAccountModalStyles';
import { EditUserInfoModalProps } from './types';
import UserAccountsStore, {
    IUserAccountContent,
    IuserAccountState,
} from '@/store/UserAccountsStore';
import { useSnapshot } from 'valtio';

const AddUserAccountModal = ({
    open,
    setOpen,
    account,
    setSelectedAccount,
}: EditUserInfoModalProps) => {
    const { addAccount, UserAccountsState, updateAccount, resetErrors } =
        UserAccountsStore;
    const { error } = useSnapshot(UserAccountsState) as IuserAccountState;

    const [formData, setFormData] = useState<IUserAccountContent>({
        name: account?.name ?? '',
        emoji: account?.emoji ?? '',
        description: account?.description ?? '',
    });

    const [fieldErrors, setFieldErrors] = useState({
        name: false,
        emoji: false,
    });

    useEffect(() => {
        if (account) {
            setFormData({
                emoji: account?.emoji,
                name: account.name,
                description: account?.description,
            });
        }
    }, [account]);

    const handleClose = () => {
        setSelectedAccount(undefined);
        setFormData({ emoji: '', name: '', description: '' });
        setFieldErrors({ emoji: false, name: false });
        setOpen(false);
    };

    const handleSave = async () => {
        if (!formData.name || !formData.emoji) {
            alert('Please fill in all required fields.');
            return;
        }

        if (account) {
            await updateAccount({ ...account, ...formData });
        } else {
            await addAccount(formData);
        }

        if (error) {
            console.log('Error while adding new account', error);
            alert(error);
            resetErrors();
        }

        handleClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: value.trim() === '' });
    };

    return (
        <Modal
            open={open || false}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={style}>
                <div>
                    <ModalTitle
                        title={account ? 'Edit Account' : 'Add New Account'}
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <StyledDiv>
                        <StyledLabel htmlFor='date-input'>
                            <GridViewOutlined />
                            Name
                        </StyledLabel>
                        <TextField
                            id='name'
                            label='Please write account name'
                            type='text'
                            name='name'
                            error={fieldErrors.name}
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                        />
                    </StyledDiv>
                    <StyledDiv>
                        <StyledLabel htmlFor=''>
                            <BoltOutlined />
                            Icon
                        </StyledLabel>
                        <TextField
                            id='emoji'
                            label='Add custom account emoji (optional)'
                            type='text'
                            name='emoji'
                            error={fieldErrors.emoji}
                            value={formData.emoji}
                            onChange={handleChange}
                            fullWidth
                        />
                    </StyledDiv>
                    <StyledDiv>
                        <StyledLabel htmlFor=''>
                            <BorderColorOutlined />
                            Description
                        </StyledLabel>
                        <TextField
                            id='description'
                            label='Add a description (optional)'
                            type='text'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </StyledDiv>
                </div>
                <div className='flex flex-row gap-2.5 items-center justify-end mt-9'>
                    <Button
                        variant='outlined'
                        onClick={handleClose}
                        className='border-[#7D8395] text-[#7D8395] py-1.5 px-4'
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant='contained'
                        className='py-1.5 px-7'
                    >
                        Save
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default AddUserAccountModal;
