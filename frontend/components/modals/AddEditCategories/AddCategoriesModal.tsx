import React, { useState } from 'react';
import {
    Box,
    Button,
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import {
    BoltOutlined,
    BorderColorOutlined,
    GridViewOutlined,
    SwapVertOutlined,
} from '@mui/icons-material';
import { useSnapshot } from 'valtio';
import CategoriesStore, {
    ICategoryContent,
    CategoriesState,
} from '@/store/CategoriesStore'; // Adjust the import path according to your project structure
import { StyledDiv, StyledLabel, style } from './AddCategoriesStyles';
import ModalTitle from '@/components/layout/ModalTitle';

interface AddCategoriesModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const AddCategoriesModal: React.FC<AddCategoriesModalProps> = ({
    open,
    setOpen,
}) => {
    const { addCategory, CategoriesState, resetErrors } = CategoriesStore;
    const { error } = useSnapshot(CategoriesState);
    const [formData, setFormData] = useState<ICategoryContent>({
        name: '',
        icon: '',
        type: '', // 'Income' or 'Expense'
        description: '',
    });
    const [fieldErrors, setFieldErrors] = useState({
        name: false,
        icon: false,
        type: false,
    });

    const { loading } = useSnapshot(CategoriesState);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        if (!formData.name || !formData.icon || !formData.type) {
            alert('Please fill in all required fields.');
            return;
        }
        await addCategory(formData)?.then(() =>
            alert('You have successfully added category')
        );

        if (error) {
            console.log('Error while adding new category', error);
            alert(error);
            resetErrors();
        }

        handleClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFieldErrors((prev) => ({ ...prev, [name]: value.trim() === '' }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value?.toLowerCase() }));
        setFieldErrors((prev) => ({ ...prev, [name]: value.trim() === '' }));
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='add-category-modal-title'
            aria-describedby='add-category-modal-description'
        >
            <Box sx={style}>
                <ModalTitle title='Add New Category' />
                <div className='flex flex-col gap-4'>
                    <StyledDiv>
                        <StyledLabel htmlFor='name-input'>
                            <GridViewOutlined />
                            Name
                        </StyledLabel>
                        <TextField
                            id='name-input'
                            label='Please write category name'
                            type='text'
                            name='name'
                            error={fieldErrors.name}
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                        />
                    </StyledDiv>
                    <StyledDiv>
                        <StyledLabel htmlFor='icon-input'>
                            <BoltOutlined />
                            Icon
                        </StyledLabel>
                        <TextField
                            id='icon-input'
                            label='Add custom category emoji (optional)'
                            type='text'
                            name='icon'
                            error={fieldErrors.icon}
                            value={formData.icon}
                            onChange={handleChange}
                            fullWidth
                        />
                    </StyledDiv>
                    <StyledDiv>
                        <StyledLabel htmlFor='type'>
                            <SwapVertOutlined />
                            Type
                        </StyledLabel>
                        <Select
                            id='type'
                            name='type'
                            value={formData.type}
                            onChange={handleSelectChange}
                            error={fieldErrors.type}
                            fullWidth
                        >
                            <MenuItem value='income'>Income</MenuItem>
                            <MenuItem value='expense'>Expense</MenuItem>
                        </Select>
                    </StyledDiv>
                    <StyledDiv>
                        <StyledLabel htmlFor='description-input'>
                            <BorderColorOutlined />
                            Description
                        </StyledLabel>
                        <TextField
                            id='description-input'
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
                        disabled={loading}
                    >
                        Save
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default AddCategoriesModal;
