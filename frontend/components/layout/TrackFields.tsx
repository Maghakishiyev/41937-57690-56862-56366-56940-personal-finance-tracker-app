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
    const [flowsData, setFlowsData] = useState({
        date: "",
        amount: "",
        category: "",
        account: "",
        note: "",
        description: "",
        from: "",
        to: "",
        type: ""
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
        setFlowsData({ ...flowsData, [name]: birthday });
        setFieldErrors({ ...fieldErrors, [name]: value.trim() === '' });
    }

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFlowsData({ ...flowsData, [name]: value })
        setFieldErrors({ ...fieldErrors, [name]: value.trim() === '' })
    }
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target
        setFlowsData({ ...flowsData, [name]: value as string });
    };

    const handleReset = () => {
        setFlowsData({
            date: "",
            amount: "",
            category: "",
            account: "",
            note: "",
            description: "",
            from: "",
            to: "",
            type: ""
        });
    }

    const handleSave = () => {
        console.log(flowsData);
        // if (!flowsData.account || !flowsData.amount || !flowsData.date) {
        //     alert("Please fill in all required fields.");
        //     return;
        // }
        const uniqId = `${Date.now()}_${flowsData.amount}`
        const updatedFormData = {
            ...flowsData,
            _id: uniqId,
            type: tabValue.toString(),
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
                        value={flowsData.date}
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
                        value={flowsData.amount}
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
                        value={flowsData.category}
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
                        value={flowsData.account}
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
                        value={flowsData.note}
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
                        value={flowsData.description}
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
                        onClick={handleReset}
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
                        value={flowsData.date}
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
                        onChange={handleIncomeChange}
                        value={flowsData.amount}
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
                        value={flowsData.category}
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
                        value={flowsData.account}
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
                        value={flowsData.note}
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
                        value={flowsData.description}
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
                        onClick={handleReset}
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
            <TabPanel value={tabValue} index={2}>
                <StyledDiv>
                    <StyledLabel htmlFor="date-input">
                        <CalendarMonthOutlined />
                        Date
                    </StyledLabel>
                    <TextField
                        id='date'
                        type="date"
                        name='date'
                        value={flowsData.date}
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
                        onChange={handleIncomeChange}
                        value={flowsData.amount}
                        fullWidth
                    />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <PeopleAltOutlined />
                        From
                    </StyledLabel>
                    <Select
                        id="from"
                        name="from"
                        value={flowsData.from}
                        // error={fieldErrors.categoryType}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={"bankA"} className='flex flex-row justify-between'>Bank A</MenuItem>
                    </Select>
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <PeopleAltOutlined />
                        To
                    </StyledLabel>
                    <Select
                        id="to"
                        name="to"
                        value={flowsData.to}
                        // error={fieldErrors.categoryType}
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={"bankB"} className='flex flex-row justify-between'>Bank B</MenuItem>
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
                        value={flowsData.note}
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
                        value={flowsData.description}
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
                        onClick={handleReset}
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
        </Box >
    );
};

export default TransactionForm;
