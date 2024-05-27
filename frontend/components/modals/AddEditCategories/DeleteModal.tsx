import { Box, Button, Dialog, DialogActions, Modal } from '@mui/material'
import React from 'react'
import ModalTitle from '@/components/layout/ModalTitle'
import { useSnapshot } from 'valtio'
import { AccountState, IUser, setShowDeleteCategoriesModal, setUser } from '@/store/UserStore'
import { deleteCategory } from '@/app/categories/api'

const DeleteModal = () => {
    const { showDeleteCategoriesModal, dataDeleteCategoriesModal, user } = useSnapshot(AccountState);
    const handleClose = () => setShowDeleteCategoriesModal(false)
    const handleDelete = async () => {
        const res = await deleteCategory(dataDeleteCategoriesModal, user._id)
        console.log(res, user);
        const updatedUser: IUser = {
            ...user,
            ...res
        };
        setUser(updatedUser)
        setShowDeleteCategoriesModal(false)
    }
    return (
        <Dialog
            open={showDeleteCategoriesModal || false}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
                <div>
                    <ModalTitle title="Delete Category" />
                </div>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )

}

export default DeleteModal