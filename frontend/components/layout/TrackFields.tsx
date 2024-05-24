import React, { useState } from 'react';
import { Box, Tab, Tabs, TextField, Button, styled } from '@mui/material';
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
    const [tabValue, setTabValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
        setTabValue(newValue);
    };

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
                        <GridViewOutlined />
                        Category
                    </StyledLabel>
                    <TextField label="Category" select fullWidth />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <PeopleAltOutlined />
                        Account
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
            <TabPanel value={tabValue} index={1}>
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
                        <GridViewOutlined />
                        Category
                    </StyledLabel>
                    <TextField label="Category" select fullWidth />
                </StyledDiv>
                <StyledDiv>
                    <StyledLabel htmlFor="">
                        <PeopleAltOutlined />
                        Account
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
        </Box>
    );
};

export default TransactionForm;
