The AddCategoriesModal component is a React functional component that provides a modal dialog for adding a new category to the system. It uses Material-UI components for the modal and form elements and integrates with an external state store managed by Valtio. This modal allows users to input the category details such as name, icon, type (income or expense), and description, and then save this new category.

Usage
Import the Component
To use the AddCategoriesModal component in your project, first import it:


import AddCategoriesModal from '@/components/AddCategoriesModal';
Ensure that the path matches the directory structure of your project.

Include the Component
You can include the AddCategoriesModal component in your application as follows:


const [openAddModal, setOpenAddModal] = useState(false);

<AddCategoriesModal
    open={openAddModal}
    setOpen={setOpenAddModal}
/>;
Example

import React, { useState } from 'react';
import AddCategoriesModal from '@/components/AddCategoriesModal';

const CategoriesManagementPage = () => {
    const [openAddModal, setOpenAddModal] = useState(false);

    return (
        <div>
            {/* Button to open add category modal */}
            <button onClick={() => setOpenAddModal(true)}>
                Add Category
            </button>
            
            <AddCategoriesModal
                open={openAddModal}
                setOpen={setOpenAddModal}
            />
        </div>
    );
};

export default CategoriesManagementPage;
Props
open (boolean, required): Controls the visibility of the modal.
setOpen (function, required): Function to toggle the modal's open/close state.
Functions
handleClose
Closes the modal and resets the form data:


const handleClose = () => {
    setOpen(false);
};
handleSave
Validates the form data and adds the category. If an error occurs during the addition, it alerts the user:


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
handleChange
Handles changes in text fields and updates the form data state:


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: value.trim() === '' }));
};
handleSelectChange
Handles changes in the select field for category type and updates the form data state:


const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value?.toLowerCase() }));
    setFieldErrors((prev) => ({ ...prev, [name]: value.trim() === '' }));
};
Dependencies
React: Utilizes React functional component syntax and hooks (useState).
Material-UI (@mui/material): Incorporates Material-UI components (Modal, Box, Button, TextField, Select, MenuItem) for modal functionality and form elements.
Valtio: Uses the useSnapshot hook from Valtio for state management integration with the external CategoriesStore.
Styling
The component uses custom styles defined in AddCategoriesStyles:

StyledDiv: Custom styled div elements for form fields.
StyledLabel: Custom styled labels for form fields.
style: Used for general modal styling.


import { StyledDiv, StyledLabel, style } from './AddCategoriesStyles';