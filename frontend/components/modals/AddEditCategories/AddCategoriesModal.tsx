import { useState } from "react";
import { BoltOutlined, BorderColorOutlined, GridViewOutlined, SwapVertOutlined } from "@mui/icons-material";
import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material"
import { useSnapshot } from "valtio";

import {
    setUserCategories,
    AccountState,
    ICategories
} from '@/store/UserStore';
import { StyledDiv, StyledLabel, style } from "./AddCategoriesStyles";
import { EditUserInfoModalProps } from "./types";
import { addCategoryToUser } from "@/app/categories/api";
import ModalTitle from "@/components/layout/ModalTitle";


const AddCategoriesModal = ({ open, setOpen }: EditUserInfoModalProps) => {
    const { user } = useSnapshot(AccountState);
    const [formData, setFormData] = useState({
        _id: "",
        categoryName: "",
        categoryIcon: "",
        categoryType: "",
        categoryDes: "",
    })
    const [fieldErrors, setFieldErrors] = useState({
        categoryName: false,
        categoryIcon: false,
        categoryType: false,
    });

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = () => {
        if (!formData.categoryName || !formData.categoryIcon || !formData.categoryType) {
            alert("Please fill in all required fields.");
            return;
        }
        const uniqId = `${Date.now()}_${formData.categoryName}`
        const updatedFormData = {
            ...formData,
            _id: uniqId
        }
        console.log("user_id", user._id);
        setUserCategories(updatedFormData);
        addCategoryToUser(updatedFormData, user._id)

    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFieldErrors({ ...fieldErrors, [name]: value.trim() === '' });
    };
    return (
        <Modal
            open={open || false}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div>
                    <ModalTitle title="Add New Category" />
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
                            value={formData.categoryName}
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
                            value={formData.categoryIcon}
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
                            value={formData.categoryType}
                            error={fieldErrors.categoryType}
                            onChange={handleChange}
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
                            value={formData.categoryDes}
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

export default AddCategoriesModal