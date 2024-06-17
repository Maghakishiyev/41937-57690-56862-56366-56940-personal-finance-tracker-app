The DeleteModal component is a React functional component designed to provide a modal dialog for deleting a category. It utilizes Material-UI components for the modal and buttons and integrates with an external state store managed by Valtio. This modal allows users to confirm or cancel the deletion of a category.

Usage
Import the Component
To use the DeleteModal component in your project, first import it:


import DeleteModal from '@/components/DeleteModal';
Ensure that the path matches the directory structure of your project.

Include the Component
You can include the DeleteModal component in your application as follows:


const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteCategoryId, setDeleteCategoryId] = useState<string>('');
const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>();

<DeleteModal
    deleteCategoryId={deleteCategoryId}
    showDeleteModal={showDeleteModal}
    setShowDeleteModal={setShowDeleteModal}
    setSelectedCategory={setSelectedCategory}
/>;

import React, { useState } from 'react';
import DeleteModal from '@/components/DeleteModal';
import { ICategory } from '@/store/CategoriesStore';

const CategoriesManagementPage = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<ICategory | undefined>();

    const handleDeleteCategory = (id: string) => {
        setDeleteCategoryId(id);
        setShowDeleteModal(true);
    };

    return (
        <div>
            {/* Button to open delete category modal */}
            <button onClick={() => handleDeleteCategory('category-id')}>
                Delete Category
            </button>
            
            <DeleteModal
                deleteCategoryId={deleteCategoryId}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                setSelectedCategory={setSelectedCategory}
            />
        </div>
    );
};

export default CategoriesManagementPage;
Props
deleteCategoryId (string, required): The ID of the category to be deleted.
showDeleteModal (boolean, required): Controls the visibility of the modal.
setShowDeleteModal (function, required): Function to toggle the modal's open/close state.
setSelectedCategory (function, required): Function to reset the selected category state.
Functions
handleClose
Closes the modal and resets the selected category:


const handleClose = () => {
    setShowDeleteModal(false);
    setSelectedCategory(undefined);
};
handleDelete
Deletes the category if the ID is valid. If an error occurs during the deletion, it alerts the user:


const handleDelete = async () => {
    if (deleteCategoryId) {
        await deleteCategory(deleteCategoryId);

        if (error) {
            console.log('Error while deleting new category', error);
            alert(error);
            resetErrors();
        }

        handleClose();
    }
};
Dependencies
React: Utilizes React functional component syntax and hooks (useState, Dispatch, SetStateAction).
Material-UI (@mui/material): Incorporates Material-UI components (Dialog, Box, Button, DialogActions) for modal functionality and buttons.
Valtio: Uses the useSnapshot hook from Valtio for state management integration with the external CategoriesStore.
Styling
The component uses custom styles defined within the component:

<Box sx={{ p: 2 }}>