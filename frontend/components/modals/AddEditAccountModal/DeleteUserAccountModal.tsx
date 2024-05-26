import { Box, Button, Modal, TableCell, TableRow } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import ModalTitle from '@/components/layout/ModalTitle';
import { deleteStyle, style } from './AddEditAccountModalStyles';
import UserAccountsStore, {
    IUserAccount,
    IuserAccountState,
} from '@/store/UserAccountsStore';
import { useSnapshot } from 'valtio';
import { SellOutlined } from '@mui/icons-material';

interface IDeleteUserAccountModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    account: IUserAccount;
    setSelectedAccount: Dispatch<SetStateAction<IUserAccount | undefined>>;
}

const DeleteUserAccountModal = ({
    open,
    setOpen,
    account,
    setSelectedAccount,
}: IDeleteUserAccountModalProps) => {
    const { UserAccountsState, resetErrors, deleteAccount } = UserAccountsStore;
    const { error } = useSnapshot(UserAccountsState) as IuserAccountState;

    const handleClose = () => {
        resetErrors();
        setSelectedAccount(undefined);
        setOpen(false);
    };

    const handleSave = async () => {
        if (!account) {
            alert('Please fill in all required fields.');
            return;
        }

        await deleteAccount(account);

        if (error) {
            console.log('Error while deleting account', error);
            alert(error);
        }

        handleClose();
    };

    return (
        <Modal
            open={open || false}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={deleteStyle}>
                <div>
                    <ModalTitle title={'Delete Account'} />
                </div>
                <div className='w-full flex flex-col items-start gap-6'>
                    <div className='w-full text-lg font-semibold'>
                        Are you sure you want to delete this account?
                    </div>

                    <div className='w-full flex items-center justify-between py-2 border-y border-gray-400'>
                        <div
                            className={`flex items-center gap-3 ${
                                !account.description ? 'w-full' : ''
                            }`}
                        >
                            <div className='px-2 border-x border-gray-300'>
                                {account.emoji ?? <SellOutlined />}
                            </div>
                            <div
                                className={`px-2 text-base font-medium text-gray-700 border-r border-gray-300  line-clamp-1 break-all text-ellipsis ${
                                    account.description
                                        ? 'max-w-[200px]'
                                        : 'w-full'
                                }`}
                            >
                                {account.name}
                            </div>
                        </div>
                        {account.description && (
                            <div className='px-2 line-clamp-1 break-all text-ellipsis border-r border-gray-300'>
                                {account.description}
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-row gap-2.5 items-center justify-end mt-9'>
                    <Button
                        variant='contained'
                        onClick={handleClose}
                        className='py-1.5 px-7'
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='outlined'
                        onClick={handleSave}
                        className='border-[#7D8395] text-[#7D8395] py-1.5 px-4'
                    >
                        Confirm
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default DeleteUserAccountModal;
