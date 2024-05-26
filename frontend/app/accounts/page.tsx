'use client';
import { TabPanel } from '@/components/layout/TabComponents';
import AddUserAccountModal from '@/components/modals/AddEditAccountModal/AddEditUserAccountModal';
import DeleteUserAccountModal from '@/components/modals/AddEditAccountModal/DeleteUserAccountModal';
import UserAccountsStore, {
    IUserAccount,
    IuserAccountState,
} from '@/store/UserAccountsStore';
import { Add, SellOutlined } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

const AccountsPage = () => {
    const [selectedAccount, setSelectedAccount] = useState<
        IUserAccount | undefined
    >(undefined);
    const [openAdd, setOpenAdd] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const { UserAccountsState, fetchAccounts } = UserAccountsStore;
    const { accounts, loading, error } = useSnapshot(
        UserAccountsState
    ) as IuserAccountState;

    useEffect(() => {
        if (!loading && !accounts?.length) fetchAccounts(); // Load accounts when the component mounts
    }, []);

    const handleEditAccount = (account: IUserAccount) => {
        setSelectedAccount(account);
        setOpenAdd(true);
    };

    const handleDeleteAccount = (account: IUserAccount) => {
        setSelectedAccount(account);
        setOpenDelete(true);
    };

    const handleAddNew = () => {
        setSelectedAccount(undefined);
        setOpenAdd(true);
    };

    return (
        <section className='flex flex-col gap-y-4 items-center bg-white rounded shadow-md mx-auto my-16 px-6 py-4 max-w-max'>
            <div className='font-semibold text-2xl'>Manage Accounts</div>
            <div className='flex flex-col items-center'>
                <div className='flex flex-row justify-end w-[420px]'>
                    <Button
                        variant='outlined'
                        className='text-[16px] py-1.5 px-2 shadow-lg border-[#7D8395] text-black'
                        onClick={handleAddNew}
                    >
                        Add New
                        <Add />
                    </Button>
                    <AddUserAccountModal
                        open={openAdd}
                        setOpen={setOpenAdd}
                        account={selectedAccount}
                        setSelectedAccount={setSelectedAccount}
                    />
                    {selectedAccount && openDelete && (
                        <DeleteUserAccountModal
                            open={openDelete}
                            setOpen={setOpenDelete}
                            account={selectedAccount}
                            setSelectedAccount={setSelectedAccount}
                        />
                    )}
                </div>
                <TabPanel value={0} index={0}>
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 400 }}
                            size='small'
                            aria-label='a dense table'
                        >
                            <TableBody>
                                {accounts.map((account) => (
                                    <TableRow key={account._id}>
                                        <TableCell padding='checkbox'>
                                            {account.emoji ?? <SellOutlined />}
                                        </TableCell>
                                        <TableCell component='th' scope='row'>
                                            {account.name}
                                        </TableCell>
                                        <TableCell align='right'>
                                            <IconButton
                                                aria-label='edit'
                                                onClick={handleEditAccount?.bind(
                                                    this,
                                                    account
                                                )}
                                            >
                                                <EditIcon color='primary' />
                                            </IconButton>
                                            <IconButton aria-label='delete'>
                                                <DeleteIcon
                                                    color='secondary'
                                                    onClick={handleDeleteAccount?.bind(
                                                        this,
                                                        account
                                                    )}
                                                />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </div>
        </section>
    );
};

export default AccountsPage;
