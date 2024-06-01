import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Select, MenuItem } from '@mui/material';
import { useSnapshot } from 'valtio';
import CategoriesStore, { ICategory } from '@/store/CategoriesStore'; // Adjust the import path as necessary

interface EditCategoriesModalProps {
    category: ICategory; // Passed from parent component
    open: boolean;
    onClose: () => void;
}

const EditCategoriesModal: React.FC<EditCategoriesModalProps> = ({
    category,
    open,
    onClose,
}) => {
    const { updateCategory, CategoriesState, resetErrors } = CategoriesStore;
    const { loading, error } = useSnapshot(CategoriesState);
    const [editedCategory, setEditedCategory] = useState<ICategory>(category);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setEditedCategory({
            ...editedCategory,
            [event.target.name]: event.target.value,
        });
    };

    const handleSelectChange = (
        event: React.ChangeEvent<{ name?: string; value: number }>
    ) => {
        const name = event.target.name as keyof ICategory;
        const type = event?.target?.value === 0 ? 'income' : 'expense';

        setEditedCategory({
            ...editedCategory,
            [name]: type,
        });
    };

    const handleSave = async () => {
        await updateCategory(editedCategory);

        if (error) {
            console.log('Error while updating new category', error);
            alert(error);
            resetErrors();
        }

        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby='edit-category-modal-title'
            aria-describedby='edit-category-modal-description'
        >
            <Box
                sx={{
                    margin: 'auto',
                    p: 2,
                    width: '400px',
                    backgroundColor: 'white',
                }}
            >
                <TextField
                    fullWidth
                    label='Category Name'
                    variant='outlined'
                    name='name'
                    value={editedCategory.name}
                    onChange={handleChange}
                    margin='normal'
                />
                <TextField
                    fullWidth
                    label='Icon'
                    variant='outlined'
                    name='icon'
                    value={editedCategory.icon}
                    onChange={handleChange}
                    margin='normal'
                />
                <Select
                    fullWidth
                    value={
                        editedCategory?.type?.toLowerCase() === 'income' ? 0 : 1
                    }
                    onChange={handleSelectChange as any}
                    name='type'
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={0}>Income</MenuItem>
                    <MenuItem value={1}>Expense</MenuItem>
                </Select>
                <TextField
                    fullWidth
                    label='Description'
                    variant='outlined'
                    name='description'
                    value={editedCategory.description || ''}
                    onChange={handleChange}
                    margin='normal'
                    multiline
                    rows={4}
                />
                <Box
                    sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}
                >
                    <Button onClick={onClose} color='primary'>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        color='primary'
                        disabled={loading}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditCategoriesModal;
