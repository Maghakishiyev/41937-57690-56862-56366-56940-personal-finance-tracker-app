import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    Button,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    styled,
    Box,
} from '@mui/material';
import {
    CalendarMonthOutlined,
    MonetizationOnOutlined,
    GridViewOutlined,
    PeopleAltOutlined,
    CreateOutlined,
    BorderColorOutlined,
    SwapHorizOutlined,
} from '@mui/icons-material';
import { useSnapshot } from 'valtio';
import CategoriesStore from '@/store/CategoriesStore';
import UserAccountsStore from '@/store/UserAccountsStore';
import { ITrack } from '@/store/TracksStore';

const StyledLabel = styled('label')({
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: 'lighter',
    fontSize: '18px',
    color: '#7D8395',
});

interface TrackModalProps {
    track: ITrack;
    open: boolean;
    onClose: () => void;
    onSave: (track: ITrack) => void;
    onDelete: (trackId: string) => void;
}

const TrackModal: React.FC<TrackModalProps> = ({
    track,
    open,
    onClose,
    onSave,
    onDelete,
}) => {
    const [trackData, setTrackData] = useState<ITrack>({ ...track });
    const { CategoriesState, fetchCategories } = CategoriesStore;
    const { UserAccountsState, fetchAccounts } = UserAccountsStore;

    const { categories } = useSnapshot(CategoriesState);
    const { accounts } = useSnapshot(UserAccountsState);

    useEffect(() => {
        fetchCategories();
        fetchAccounts();
    }, []);

    const handleSave = () => {
        onSave(trackData);
        onClose();
    };

    const handleDelete = () => {
        onDelete(trackData._id);
        onClose();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrackData({ ...trackData, [event.target.name]: event.target.value });
    };

    const handleSelectChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        setTrackData({
            ...trackData,
            [event.target.name as string]: event.target.value,
        });
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth='md' // Adjusting the maximum width
            fullWidth={true} // This ensures the dialog is responsive but respects the max-width
            PaperProps={{
                style: { width: '100%', maxWidth: 480 }, // Custom width, adjust as needed
            }}
        >
            <DialogTitle>Edit Track</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <StyledLabel>
                        <CalendarMonthOutlined /> Date
                    </StyledLabel>
                    <TextField
                        id='date'
                        type='date'
                        name='date'
                        value={trackData.date?.substring(0, 10)}
                        onChange={handleChange}
                        fullWidth
                    />

                    <StyledLabel>
                        <MonetizationOnOutlined /> Amount
                    </StyledLabel>
                    <TextField
                        type='number'
                        name='amount'
                        value={trackData.amount}
                        onChange={handleChange}
                        fullWidth
                    />

                    {trackData.type !== 'transfer' && (
                        <>
                            <StyledLabel htmlFor='category'>
                                <GridViewOutlined /> Category
                            </StyledLabel>
                            <Select
                                name='category'
                                id='category'
                                value={trackData.category}
                                onChange={handleSelectChange as any}
                                fullWidth
                                displayEmpty
                            >
                                {categories.map((category) => (
                                    <MenuItem
                                        key={category._id}
                                        value={category._id}
                                    >
                                        {category.icon} {category.name}
                                    </MenuItem>
                                ))}
                            </Select>

                            <StyledLabel htmlFor='account'>
                                <PeopleAltOutlined /> Account
                            </StyledLabel>
                            <Select
                                name='account'
                                id='account'
                                value={trackData.account}
                                onChange={handleSelectChange as any}
                                fullWidth
                                displayEmpty
                            >
                                {accounts.map((account) => (
                                    <MenuItem
                                        key={account._id}
                                        value={account._id}
                                    >
                                        {account.emoji} {account.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </>
                    )}

                    {trackData.type === 'transfer' && (
                        <>
                            <StyledLabel>
                                <SwapHorizOutlined /> From
                            </StyledLabel>
                            <Select
                                name='from'
                                value={trackData.from}
                                onChange={handleSelectChange as any}
                                fullWidth
                                displayEmpty
                            >
                                {accounts.map((account) => (
                                    <MenuItem
                                        key={account._id}
                                        value={account._id}
                                    >
                                        {account.emoji} {account.name}
                                    </MenuItem>
                                ))}
                            </Select>

                            <StyledLabel>
                                <SwapHorizOutlined /> To
                            </StyledLabel>
                            <Select
                                name='to'
                                value={trackData.to}
                                onChange={handleSelectChange as any}
                                fullWidth
                                displayEmpty
                            >
                                {accounts.map((account) => (
                                    <MenuItem
                                        key={account._id}
                                        value={account._id}
                                    >
                                        {account.emoji} {account.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </>
                    )}

                    <StyledLabel>
                        <CreateOutlined /> Note
                    </StyledLabel>
                    <TextField
                        type='text'
                        name='note'
                        value={trackData.note}
                        onChange={handleChange}
                        fullWidth
                    />

                    <StyledLabel>
                        <BorderColorOutlined /> Description
                    </StyledLabel>
                    <TextField
                        type='text'
                        name='description'
                        value={trackData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} color='secondary'>
                    Delete
                </Button>
                <Button onClick={handleSave} color='primary'>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TrackModal;
