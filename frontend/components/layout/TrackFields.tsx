import React, { useEffect, useState } from 'react';
import {
    Box,
    Tab,
    Tabs,
    TextField,
    Button,
    styled,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import { TabPanel, a11yProps } from './TabComponents';
import {
    CalendarMonthOutlined,
    MonetizationOnOutlined,
    GridViewOutlined,
    PeopleAltOutlined,
    CreateOutlined,
    BorderColorOutlined,
} from '@mui/icons-material';
import { UserState, IUserState } from '@/store/UserStore';
import { useSnapshot } from 'valtio';
import CategoriesStore from '@/store/CategoriesStore';
import TracksStore, { ITrackContent } from '@/store/TracksStore';
import UserAccountsStore from '@/store/UserAccountsStore';

const StyledDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

const StyledDivButtons = styled('div')({
    display: 'flex',
    justifyContent: 'end',
    gap: '10px',
});

const StyledLabel = styled('label')({
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: 'lighter',
    fontSize: '18px',
    color: '#7D8395',
});

const TransactionForm: React.FC = () => {
    const { TrackState, addTrack } = TracksStore;
    const { UserAccountsState, fetchAccounts } = UserAccountsStore;
    const { CategoriesState, fetchCategories } = CategoriesStore;
    const { categories, loading: categoriesLoading } =
        useSnapshot(CategoriesState);
    const { accounts, loading: accountsLoading } =
        useSnapshot(UserAccountsState);

    const { error: tracksError } = useSnapshot(TrackState);

    const [tabValue, setTabValue] = useState(0);
    const [flowsData, setFlowsData] = useState<ITrackContent>({
        date: '',
        amount: '',
        category: '',
        account: '',
        note: '',
        description: '',
        from: '',
        to: '',
        type: '',
    });
    const [fieldErrors, setFieldErrors] = React.useState({
        date: false,
        amount: false,
        category: false,
        account: false,
    });

    useEffect(() => {
        if (!categoriesLoading && !categories?.length) {
            fetchCategories();
        }
    }, [categories, categoriesLoading]);

    useEffect(() => {
        if (!accountsLoading && !accounts?.length) {
            fetchAccounts();
        }
    }, [accounts, accountsLoading]);

    const handleChange = (
        event: React.SyntheticEvent,
        newValue: number
    ): void => {
        setTabValue(newValue);
    };

    const getTabType = (tabValue: number) => {
        switch (tabValue) {
            case 0:
                return 'expense';
            case 1:
                return 'income';
            case 2:
                return 'transfer';
            default:
                return 'expense';
        }
    };

    const incomeDateISO = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const date = value.substring(0, 10);
        setFlowsData({ ...flowsData, [name]: date });
        setFieldErrors({ ...fieldErrors, [name]: value.trim() === '' });
    };

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFlowsData({ ...flowsData, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: value.trim() === '' });
    };
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFlowsData({ ...flowsData, [name]: value as string });
    };

    const handleReset = () => {
        setFlowsData({
            date: '',
            amount: '',
            category: '',
            account: '',
            note: '',
            description: '',
            from: '',
            to: '',
            type: '',
        });
    };

    const handleSave = async () => {
        if (
            (tabValue < 2
                ? !flowsData.account
                : !flowsData.from || !flowsData?.to) ||
            !flowsData.amount ||
            !flowsData.date
        ) {
            alert('Please fill in all required fields.');
            return;
        }

        const updatedFormData = {
            ...flowsData,
            type: getTabType(tabValue)?.toLowerCase(),
        };
        await addTrack(updatedFormData)?.then(() =>
            alert(
                'You have successfully saved ' +
                    getTabType(tabValue)?.toLowerCase()
            )
        );

        if (tracksError) {
            console.log('Error while tracking expense', tracksError);
            alert(tracksError);
        }
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    aria-label='transaction tabs'
                >
                    <Tab label='Expense' {...a11yProps(0)} />
                    <Tab label='Income' {...a11yProps(1)} />
                    <Tab label='Transfer' {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
                <StyledDiv>
                    <StyledLabel htmlFor='date'>
                        <CalendarMonthOutlined />
                        Date
                    </StyledLabel>
                    <TextField
                        data-testid='date'
                        id='date'
                        type='date'
                        name='date'
                        value={flowsData.date}
                        onChange={incomeDateISO}
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor='amount'>
                        <MonetizationOnOutlined />
                        Amount
                    </StyledLabel>
                    <TextField
                        label='amount'
                        type='number'
                        name='amount'
                        value={flowsData.amount}
                        onChange={handleIncomeChange}
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor='category'>
                        <GridViewOutlined />
                        Category
                    </StyledLabel>
                    <Select
                        label='category'
                        id='category'
                        name='category'
                        value={flowsData.category}
                        error={fieldErrors.category}
                        onChange={handleSelectChange}
                    >
                        {categories.map(
                            (category) =>
                                category?.type?.toLowerCase() ===
                                    getTabType(tabValue)?.toLowerCase() && (
                                    <MenuItem
                                        value={category._id}
                                        key={category._id}
                                        className='flex flex-row justify-between gap-3'
                                    >
                                        <span>{category.name}</span>
                                        <span>{category.icon}</span>
                                    </MenuItem>
                                )
                        )}
                    </Select>
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor='account'>
                        <PeopleAltOutlined />
                        Account
                    </StyledLabel>
                    <Select
                        id='account'
                        name='account'
                        value={flowsData.account}
                        error={fieldErrors.account}
                        onChange={handleSelectChange}
                    >
                        {accounts &&
                            accounts.map((account) => (
                                <MenuItem value={account._id}>
                                    <div className='w-full flex items-center justify-start gap-3'>
                                        <span>{account.emoji}</span>
                                        <span className='text-base text-black font-semibold'>
                                            {account.name}
                                        </span>
                                    </div>
                                </MenuItem>
                            ))}
                    </Select>
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor='note'>
                        <CreateOutlined />
                        Note
                    </StyledLabel>
                    <TextField
                        id='note'
                        name='note'
                        type='text'
                        value={flowsData.note}
                        onChange={handleIncomeChange}
                        label='Note'
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor='description'>
                        <BorderColorOutlined />
                        Description
                    </StyledLabel>
                    <TextField
                        id='description'
                        name='description'
                        type='text'
                        value={flowsData.description}
                        onChange={handleIncomeChange}
                        label='Description'
                        fullWidth
                        multiline
                        rows={4}
                    />
                </StyledDiv>
                <StyledDivButtons>
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: '#F95738',
                            color: '#ffffff',
                            p: '6px 23px',
                            '&:hover': {
                                backgroundColor: '#d32f2f',
                            },
                        }}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: '#5698FF',
                            color: '#ffffff',
                            p: '6px 28px',
                            '&:hover': {
                                backgroundColor: '#1976d2',
                            },
                        }}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </StyledDivButtons>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <StyledDiv>
                    <StyledLabel htmlFor='date'>
                        <CalendarMonthOutlined />
                        Date
                    </StyledLabel>
                    <TextField
                        id='date'
                        type='date'
                        name='date'
                        value={flowsData.date}
                        onChange={incomeDateISO}
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor='amount'>
                        <MonetizationOnOutlined />
                        Amount
                    </StyledLabel>
                    <TextField
                        label='amount'
                        type='number'
                        name='amount'
                        onChange={handleIncomeChange}
                        value={flowsData.amount}
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor='category'>
                        <GridViewOutlined />
                        Category
                    </StyledLabel>
                    <Select
                        id='category'
                        name='category'
                        value={flowsData.category}
                        error={fieldErrors.category}
                        onChange={handleSelectChange}
                    >
                        {categories.map(
                            (category) =>
                                category?.type?.toLowerCase() ===
                                    getTabType(tabValue)?.toLowerCase() && (
                                    <MenuItem
                                        value={category._id}
                                        key={category._id}
                                        className='flex flex-row justify-between gap-3'
                                    >
                                        <span>{category.name}</span>
                                        <span>{category.icon}</span>
                                    </MenuItem>
                                )
                        )}
                    </Select>
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor='account'>
                        <PeopleAltOutlined />
                        Account
                    </StyledLabel>
                    <Select
                        id='account'
                        name='account'
                        value={flowsData.account}
                        error={fieldErrors.account}
                        onChange={handleSelectChange}
                    >
                        {accounts &&
                            accounts.map((account) => (
                                <MenuItem value={account._id}>
                                    <div className='w-full flex items-center justify-start gap-3'>
                                        <span>{account.emoji}</span>
                                        <span className='text-base text-black font-semibold'>
                                            {account.name}
                                        </span>
                                    </div>
                                </MenuItem>
                            ))}
                    </Select>
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor='note'>
                        <CreateOutlined />
                        Note
                    </StyledLabel>
                    <TextField
                        id='note'
                        name='note'
                        type='text'
                        value={flowsData.note}
                        onChange={handleIncomeChange}
                        label='Note'
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor='description'>
                        <BorderColorOutlined />
                        Description
                    </StyledLabel>
                    <TextField
                        id='description'
                        name='description'
                        type='text'
                        value={flowsData.description}
                        onChange={handleIncomeChange}
                        label='Description'
                        fullWidth
                        multiline
                        rows={4}
                    />
                </StyledDiv>
                <StyledDivButtons>
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: '#F95738',
                            color: '#ffffff',
                            p: '6px 23px',
                            '&:hover': {
                                backgroundColor: '#d32f2f',
                            },
                        }}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: '#5698FF',
                            color: '#ffffff',
                            p: '6px 28px',
                            '&:hover': {
                                backgroundColor: '#1976d2',
                            },
                        }}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </StyledDivButtons>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <StyledDiv>
                    <StyledLabel htmlFor='date'>
                        <CalendarMonthOutlined />
                        Date
                    </StyledLabel>
                    <TextField
                        id='date'
                        type='date'
                        name='date'
                        value={flowsData.date}
                        onChange={incomeDateISO}
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor='amount'>
                        <MonetizationOnOutlined />
                        Amount
                    </StyledLabel>
                    <TextField
                        label='amount'
                        type='number'
                        name='amount'
                        onChange={handleIncomeChange}
                        value={flowsData.amount}
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor='from'>
                        <PeopleAltOutlined />
                        From
                    </StyledLabel>
                    <Select
                        id='from'
                        name='from'
                        value={flowsData.from}
                        error={fieldErrors.account}
                        onChange={handleSelectChange}
                    >
                        {accounts &&
                            accounts.map((account) => (
                                <MenuItem value={account._id}>
                                    <div className='w-full flex items-center justify-start gap-3'>
                                        <span>{account.emoji}</span>
                                        <span className='text-base text-black font-semibold'>
                                            {account.name}
                                        </span>
                                    </div>
                                </MenuItem>
                            ))}
                    </Select>
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor='to'>
                        <PeopleAltOutlined />
                        To
                    </StyledLabel>
                    <Select
                        id='to'
                        name='to'
                        value={flowsData.to}
                        error={fieldErrors.account}
                        onChange={handleSelectChange}
                    >
                        {accounts &&
                            accounts.map((account) => (
                                <MenuItem value={account._id}>
                                    <div className='w-full flex items-center justify-start gap-3'>
                                        <span>{account.emoji}</span>
                                        <span className='text-base text-black font-semibold'>
                                            {account.name}
                                        </span>
                                    </div>
                                </MenuItem>
                            ))}
                    </Select>
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor='note'>
                        <CreateOutlined />
                        Note
                    </StyledLabel>
                    <TextField
                        id='note'
                        name='note'
                        type='text'
                        value={flowsData.note}
                        onChange={handleIncomeChange}
                        label='Note'
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor='description'>
                        <BorderColorOutlined />
                        Description
                    </StyledLabel>
                    <TextField
                        id='description'
                        name='description'
                        type='text'
                        value={flowsData.description}
                        onChange={handleIncomeChange}
                        label='Description'
                        fullWidth
                        multiline
                        rows={4}
                    />
                </StyledDiv>
                <StyledDivButtons>
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: '#F95738',
                            color: '#ffffff',
                            p: '6px 23px',
                            '&:hover': {
                                backgroundColor: '#d32f2f',
                            },
                        }}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: '#5698FF',
                            color: '#ffffff',
                            p: '6px 28px',
                            '&:hover': {
                                backgroundColor: '#1976d2',
                            },
                        }}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </StyledDivButtons>
            </TabPanel>
        </Box>
    );
};

export default TransactionForm;
