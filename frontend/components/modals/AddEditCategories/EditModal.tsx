import { Box, Button, MenuItem, Modal, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useState } from 'react'
import { StyledDiv, StyledLabel, style } from './AddCategoriesStyles'
import ModalTitle from '@/components/layout/ModalTitle'
import { BoltOutlined, BorderColorOutlined, GridViewOutlined, SwapVertOutlined } from '@mui/icons-material'
import { useSnapshot } from 'valtio'
import { AccountState, ICategories, IUser, setDataEditCategoriesModal, setShowEditCategoriesModal, setUser } from '@/store/UserStore'
import { editCategory } from '@/app/categories/api'

const EditCategoriesModal = () => {
    const { dataEditCategoriesModal, showEditCategoriesModal, user } = useSnapshot(AccountState)
    const [fieldErrors, setFieldErrors] = useState({
        categoryName: false,
        categoryIcon: false,
        categoryType: false,
    });
    const handleClose = () => {
        setShowEditCategoriesModal(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const updatedCategory: ICategories = {
            ...dataEditCategoriesModal,
            [name]: value
        };
        setDataEditCategoriesModal(updatedCategory);
        setFieldErrors(prevErrors => ({
            ...prevErrors,
            [name]: value.trim() === ''
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target
        const updatedCategory: ICategories = {
            ...dataEditCategoriesModal,
            [name]: value
        };
        setDataEditCategoriesModal(updatedCategory);
        setFieldErrors(prevErrors => ({
            ...prevErrors,
            [name]: value.trim() === ''
        }));

    };

    const handleSave = async () => {
        const res = await editCategory(dataEditCategoriesModal, user._id)
        const updatedUser: IUser = {
            ...user,
            ...res
        };
        setUser(updatedUser)
        setShowEditCategoriesModal(false);
        setDataEditCategoriesModal({
            _id: "",
            categoryName: "",
            categoryIcon: "",
            categoryType: "",
            categoryDes: ""
        })
    };

    return (
        <Modal
            open={showEditCategoriesModal || false}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div>
                    <ModalTitle title="Edit Category" />
                </div>
                <div className="flex flex-col gap-4">
                    <StyledDiv>
                        <StyledLabel htmlFor="date-input">
                            <GridViewOutlined />
                            Name
                        </StyledLabel>
                        <TextField
                            id="categoryName"
                            label="Please write category name"
                            type="text"
                            name="categoryName"
                            error={fieldErrors.categoryName}
                            value={dataEditCategoriesModal.categoryName}
                            onChange={handleChange}
                            fullWidth />
                    </StyledDiv>
                    <StyledDiv>
                        <StyledLabel htmlFor="">
                            <BoltOutlined />
                            Icon
                        </StyledLabel>
                        <TextField
                            id="categoryIcon"
                            label="Add custom category emoji (optional)"
                            type="text"
                            name="categoryIcon"
                            error={fieldErrors.categoryIcon}
                            value={dataEditCategoriesModal.categoryIcon}
                            onChange={handleChange}
                            fullWidth />
                    </StyledDiv>
                    <StyledDiv>
                        <StyledLabel htmlFor="">
                            <SwapVertOutlined />
                            Type
                        </StyledLabel>
                        <Select
                            id="categoryType"
                            name="categoryType"
                            value={dataEditCategoriesModal.categoryType}
                            error={fieldErrors.categoryType}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="0">Expense</MenuItem>
                            <MenuItem value="1">Income</MenuItem>
                        </Select>
                    </StyledDiv>
                    <StyledDiv>
                        <StyledLabel htmlFor="">
                            <BorderColorOutlined />
                            Description
                        </StyledLabel>
                        <TextField id="categoryDes"
                            label="Add a description (optional)"
                            type="text"
                            name="categoryDes"
                            value={dataEditCategoriesModal.categoryDes}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4} />
                    </StyledDiv>
                </div>
                <div className="flex flex-row gap-2.5 items-center justify-end mt-9">
                    <Button variant="outlined" onClick={handleClose} className="border-[#7D8395] text-[#7D8395] py-1.5 px-4">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained" className="py-1.5 px-7">
                        Save
                    </Button>
                </div>
            </Box>
        </Modal >
    )
}

export default EditCategoriesModal