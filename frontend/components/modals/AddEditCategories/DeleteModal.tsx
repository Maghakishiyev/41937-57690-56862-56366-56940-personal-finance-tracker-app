import React, { Dispatch, SetStateAction } from 'react';
import { Box, Button, Dialog, DialogActions } from '@mui/material';
import ModalTitle from '@/components/layout/ModalTitle';
import { useSnapshot } from 'valtio';
import CategoriesStore, { ICategory } from '@/store/CategoriesStore';

interface IDeleteModal {
    deleteCategoryId: string;
    showDeleteModal: boolean;
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
    setSelectedCategory: Dispatch<SetStateAction<ICategory | undefined>>;
}

const DeleteModal: React.FC<IDeleteModal> = ({
    deleteCategoryId,
    setShowDeleteModal,
    showDeleteModal,
    setSelectedCategory,
}) => {
    const { deleteCategory, resetErrors, CategoriesState } = CategoriesStore;
    const { error } = useSnapshot(CategoriesState);

    const handleClose = () => {
        setShowDeleteModal(false);
        setSelectedCategory(undefined);
    };

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

    return (
        <Dialog
            open={showDeleteModal}
            onClose={handleClose}
            aria-labelledby='delete-category-modal-title'
            aria-describedby='delete-category-modal-description'
        >
            <Box sx={{ p: 2 }}>
                <ModalTitle title='Delete Category' />
                <div className='w-full text-lg font-semibold'>
                    Are you sure you want to delete this account?
                </div>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color='secondary' autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default DeleteModal;
