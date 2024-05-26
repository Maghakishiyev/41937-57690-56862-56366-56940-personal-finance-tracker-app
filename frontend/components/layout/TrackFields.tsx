import React, { useState } from 'react';
import { Box, Tab, Tabs, TextField, Button, styled, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { TabPanel, a11yProps } from './TabComponents';
import {
    CalendarMonthOutlined,
    MonetizationOnOutlined,
    GridViewOutlined,
    PeopleAltOutlined,
    CreateOutlined,
    BorderColorOutlined,
    ArrowDownward,
    ArrowUpward
} from '@mui/icons-material';
import { AccountState, IUserState, setUserTracks } from '@/store/UserStore';
import { useSnapshot } from 'valtio';
import { addTrackToUser } from '@/app/track/api';

const StyledDiv = styled('div')({
    display: 'flex',
    flexDirection: 'column',
});

const StyledDivButtons = styled('div')({
    display: 'flex',
    justifyContent: 'end',
    gap: '10px'
});

const StyledLabel = styled('label')({
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: 'lighter',
    fontSize: "18px",
    color: '#7D8395',
});

const TransactionForm: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const { user } = useSnapshot(AccountState) as IUserState;
    const [incomeData, setIncomeData] = useState({
        date: "",
        amount: "",
        category: "",
        account: "",
        note: "",
        description: "",
    });
    const [fieldErrors, setFieldErrors] = React.useState({
        date: false,
        amount: false,
        category: false,
        account: false,
    });

    const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
        console.log('newValue', newValue);
        setTabValue(newValue);
    };
    const incomeDateISO = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const birthday = value.substring(0, 10);
        setIncomeData({ ...incomeData, [name]: birthday });
        setFieldErrors({ ...fieldErrors, [name]: value.trim() === '' });
    }

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setIncomeData({ ...incomeData, [name]: value })
        setFieldErrors({ ...fieldErrors, [name]: value.trim() === '' })
    }
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target
        setIncomeData({ ...incomeData, [name]: value as string });
    };

    const handleSave = () => {
        if (!incomeData.account || !incomeData.amount || !incomeData.date) {
            alert("Please fill in all required fields.");
            return;
        }
        const uniqId = `${Date.now()}_${incomeData.amount}`
        const updatedFormData = {
            ...incomeData,
            _id: uniqId
        }
        setUserTracks(updatedFormData);
        addTrackToUser(updatedFormData, user._id)
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleChange} aria-label="transaction tabs">
                    <Tab label="Expense" {...a11yProps(0)} />
                    <Tab label="Income" {...a11yProps(1)} />
                    <Tab label="Transfer" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
                <StyledDiv>
                    <StyledLabel htmlFor="date-input">
                        <CalendarMonthOutlined />
                        Date
                    </StyledLabel>
                    <TextField
                        id='date'
                        type="date"
                        name='date'
                        value={incomeData.date}
                        onChange={incomeDateISO}
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <MonetizationOnOutlined />
                        Amount
                    </StyledLabel>
                    <TextField
                        label="Amount"
                        type="number"
                        name='amount'
                        value={incomeData.amount}
                        onChange={handleIncomeChange}
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <GridViewOutlined />
                        Category
                    </StyledLabel>
                    <Select
                        id="category"
                        name="category"
                        value={incomeData.category}
                        error={fieldErrors.category}
                        onChange={handleSelectChange}
                    >
                        {
                            user.categories.map((category) => category.categoryType == tabValue.toString() && (
                                <MenuItem value={category._id} key={category._id} className='flex flex-row justify-between'>
                                    <span>
                                        {category.categoryName}
                                    </span>
                                    <span>
                                        {category.categoryIcon}
                                    </span>
                                </MenuItem>
                            ))
                        }
                    </Select>
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <PeopleAltOutlined />
                        Account
                    </StyledLabel>
                    <Select
                        id="account"
                        name="account"
                        value={incomeData.account}
                        // error={fieldErrors.categoryType}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={"bank"} className='flex flex-row justify-between'>Bank</MenuItem>
                    </Select>
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <CreateOutlined />
                        Note
                    </StyledLabel>
                    <TextField
                        id='note'
                        name='note'
                        type='text'
                        value={incomeData.note}
                        onChange={handleIncomeChange}
                        label="Note"
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <BorderColorOutlined />
                        Description
                    </StyledLabel>
                    <TextField
                        id='description'
                        name='description'
                        type='text'
                        value={incomeData.description}
                        onChange={handleIncomeChange}
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                    />
                </StyledDiv>
                <StyledDivButtons>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#F95738',
                            color: '#ffffff',
                            p: '6px 23px',
                            '&:hover': {
                                backgroundColor: '#d32f2f'
                            }
                        }}
                        onClick={() => console.log('Reset action')}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#5698FF',
                            color: '#ffffff',
                            p: '6px 28px',
                            '&:hover': {
                                backgroundColor: '#1976d2'
                            }
                        }}
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </StyledDivButtons>
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <StyledDiv>
                    <StyledLabel htmlFor="date-input">
                        <CalendarMonthOutlined />
                        Date
                    </StyledLabel>
                    <TextField
                        id='date'
                        type="date"
                        name='date'
                        value={incomeData.date}
                        onChange={incomeDateISO}
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <MonetizationOnOutlined />
                        Amount
                    </StyledLabel>
                    <TextField
                        label="Amount"
                        type="number"
                        name='amount'
                        value={handleIncomeChange}
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <GridViewOutlined />
                        Category
                    </StyledLabel>
                    <Select
                        id="category"
                        name="category"
                        value={incomeData.category}
                        error={fieldErrors.category}
                        onChange={handleSelectChange}
                    >
                        {
                            user.categories.map((category) => category.categoryType == tabValue.toString() && (
                                <MenuItem value={category._id} key={category._id} className='flex flex-row justify-between'>
                                    <span>
                                        {category.categoryName}
                                    </span>
                                    <span>
                                        {category.categoryIcon}
                                    </span>
                                </MenuItem>
                            ))
                        }
                    </Select>
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <PeopleAltOutlined />
                        Account
                    </StyledLabel>
                    <Select
                        id="categoryType"
                        name="categoryType"
                        // value={formData.categoryType}
                        // error={fieldErrors.categoryType}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={"bank"} className='flex flex-row justify-between'>Bank</MenuItem>
                    </Select>
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <CreateOutlined />
                        Note
                    </StyledLabel>
                    <TextField
                        id='note'
                        name='note'
                        type='text'
                        value={incomeData.note}
                        label="Note"
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <BorderColorOutlined />
                        Description
                    </StyledLabel>
                    <TextField
                        id='description'
                        name='description'
                        type='text'
                        value={incomeData.description}
                        label="Description"
                        fullWidth
                        multiline
                        rows={4}
                    />
                </StyledDiv>
                <StyledDivButtons>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#F95738',
                            color: '#ffffff',
                            p: '6px 23px',
                            '&:hover': {
                                backgroundColor: '#d32f2f'
                            }
                        }}
                        onClick={() => console.log('Reset action')}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#5698FF',
                            color: '#ffffff',
                            p: '6px 28px',
                            '&:hover': {
                                backgroundColor: '#1976d2'
                            }
                        }}
                        onClick={() => console.log('Save action')}
                    >
                        Save
                    </Button>
                </StyledDivButtons>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <StyledDiv>
                    <StyledLabel htmlFor="date-input">
                        <CalendarMonthOutlined />
                        Date
                    </StyledLabel>
                    <TextField label="" type="date" fullWidth />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <MonetizationOnOutlined />
                        Amount
                    </StyledLabel>
                    <TextField label="Amount" type="number" fullWidth />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <ArrowUpward />
                        From
                    </StyledLabel>
                    <TextField label="Category" select fullWidth />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <ArrowDownward />
                        To
                    </StyledLabel>
                    <TextField label="Account" select fullWidth />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <CreateOutlined />
                        Note
                    </StyledLabel>
                    <TextField label="Note" fullWidth />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <BorderColorOutlined />
                        Description
                    </StyledLabel>
                    <TextField label="Description" fullWidth multiline rows={4} />
                </StyledDiv>
                <StyledDivButtons>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#F95738',
                            color: '#ffffff',
                            p: '6px 23px',
                            '&:hover': {
                                backgroundColor: '#d32f2f'
                            }
                        }}
                        onClick={() => console.log('Reset action')}
                    >
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#5698FF',
                            color: '#ffffff',
                            p: '6px 28px',
                            '&:hover': {
                                backgroundColor: '#1976d2'
                            }
                        }}
                        onClick={() => console.log('Save action')}
                    >
                        Save
                    </Button>
                </StyledDivButtons>
            </TabPanel>
        </Box >
    );
};

export default TransactionForm;
