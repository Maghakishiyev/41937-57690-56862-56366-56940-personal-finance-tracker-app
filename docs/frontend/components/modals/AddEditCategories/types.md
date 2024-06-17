The EditUserInfoModalProps interface defines the props for the EditUserInfoModal component. This modal is used for editing user information.

Properties
open (boolean | null): A boolean value that determines if the modal is open. It can also be null.
setOpen ((open: boolean) => void): A function that sets the open state of the modal.
category (ICategory?): An optional ICategory object representing the category associated with the user information being edited.
Example

export interface EditUserInfoModalProps {
    open: boolean | null;
    setOpen: (open: boolean) => void;
    category?: ICategory;
}
Usage
Here is an example of how to use the EditUserInfoModalProps interface in a React component:


import React from 'react';
import { EditUserInfoModalProps } from '@/types/ModalProps';
import { Modal, Box } from '@mui/material';

const EditUserInfoModal: React.FC<EditUserInfoModalProps> = ({ open, setOpen, category }) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal open={!!open} onClose={handleClose}>
            <Box>
                {/* Modal content here */}
            </Box>
        </Modal>
    );
};

export default EditUserInfoModal;
EditCategoriesProps
The EditCategoriesProps interface defines the props for the EditCategories component. This modal is used for editing category information.

Properties
openEditModal (boolean | null?): An optional boolean value that determines if the edit modal is open. It can also be null.
setOpenEditModal ((open: boolean) => void?): An optional function that sets the open state of the edit modal.
categories (ICategory?): An optional ICategory object representing the category being edited.
Example

export interface EditCategoriesProps {
    openEditModal?: boolean | null;
    setOpenEditModal?: (open: boolean) => void;
    categories?: ICategory;
}
Usage
Here is an example of how to use the EditCategoriesProps interface in a React component:


import React from 'react';
import { EditCategoriesProps } from '@/types/ModalProps';
import { Modal, Box } from '@mui/material';

const EditCategoriesModal: React.FC<EditCategoriesProps> = ({ openEditModal, setOpenEditModal, categories }) => {
    const handleClose = () => setOpenEditModal && setOpenEditModal(false);

    return (
        <Modal open={!!openEditModal} onClose={handleClose}>
            <Box>
                {/* Modal content here */}
            </Box>
        </Modal>
    );
};

export default EditCategoriesModal;