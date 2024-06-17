The EditCategoriesModal component is a React functional component that provides a modal dialog for editing an existing category. It leverages Material-UI components for the modal, form inputs, and buttons, and integrates with a state store managed by Valtio for category data.

Usage
Import the Component
To use the EditCategoriesModal component in your project, first import it:


import EditCategoriesModal from '@/components/EditCategoriesModal';
Ensure that the path matches the directory structure of your project.

Include the Component
You can include the EditCategoriesModal component in your application as follows:


const [openEditModal, setOpenEditModal] = useState(false);
const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>(undefined);

const handleEditCategory = (category: ICategory) => {
    setSelectedCategory(category);
    setOpenEditModal(true);
};

<EditCategoriesModal
    category={selectedCategory}
    open={openEditModal}
    onClose={() => setOpenEditModal(false)}
/>;
Example

import React, { useState } from 'react';
import EditCategoriesModal from '@/components/EditCategoriesModal';
import { ICategory } from '@/store/CategoriesStore';

const CategoriesManagementPage = () => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>(undefined);

    const categories: ICategory[] = [
        // Sample categories
        { id: '1', name: 'Salary', icon: '💼', type: 'income', description: 'Monthly salary' },
        { id: '2', name: 'Groceries', icon: '🛒', type: 'expense', description: 'Weekly groceries' },
    ];

    const handleEditCategory = (category: ICategory) => {
        setSelectedCategory(category);
        setOpenEditModal(true);
    };

    return (
        <div>
            <h1>Categories Management</h1>
            {categories.map((category) => (
                <div key={category.id}>
                    <span>{category.name}</span>
                    <button onClick={() => handleEditCategory(category)}>Edit</button>
                </div>
            ))}
            {selectedCategory && (
                <EditCategoriesModal
                    category={selectedCategory}
                    open={openEditModal}
                    onClose={() => setOpenEditModal(false)}
                />
            )}
        </div>
    );
};

export default CategoriesManagementPage;
Props
category (ICategory, required): The category object to be edited.
open (boolean, required): Controls the visibility of the modal.
onClose (function, required): Function to close the modal.
Functions
handleChange
Handles changes to the text fields and updates the editedCategory state:


const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
    setEditedCategory({
        ...editedCategory,
        [event.target.name]: event.target.value,
    });
};
handleSelectChange
Handles changes to the select field and updates the editedCategory state:


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
handleSave
Saves the edited category and handles errors:


const handleSave = async () => {
    await updateCategory(editedCategory)?.then(() =>
        alert('You have successfully saved category')
    );

    if (error) {
        console.log('Error while updating new category', error);
        alert(error);
        resetErrors();
    }

    onClose();
};
Dependencies
React: Utilizes React functional component syntax and hooks (useState).
Material-UI (@mui/material): Incorporates Material-UI components (Modal, Box, Button, TextField, Select, MenuItem) for modal functionality and form inputs.
Valtio: Uses the useSnapshot hook from Valtio for state management integration with the external CategoriesStore.
Styling
The component uses inline styling for the modal content box:


<Box
    sx={{
        margin: 'auto',
        p: 2,
        width: '400px',
        backgroundColor: 'white',
    }}
>