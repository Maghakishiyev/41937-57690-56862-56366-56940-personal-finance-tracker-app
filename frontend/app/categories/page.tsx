'use client';

import { useEffect, useState } from 'react';
import { Add } from '@mui/icons-material';
import { useSnapshot } from 'valtio';
import { Button, Tab, Tabs } from '@mui/material';
import { TabPanel } from '@/components/layout/TabComponents';
import CategoriesStore, {
    ICategory,
    ICategoryState,
} from '@/store/CategoriesStore';
import AddCategoriesModal from '@/components/modals/AddEditCategories/AddCategoriesModal';
import EditCategoriesModal from '@/components/modals/AddEditCategories/EditModal';
import DeleteModal from '@/components/modals/AddEditCategories/DeleteModal';
import { CategoryTable } from '@/components/CategoriesTable';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CategoriesPage = () => {
    const [tabValue, setTabValue] = useState<number>(0);
    const [selectedCategory, setSelectedCategory] = useState<
        ICategory | undefined
    >(undefined);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const { CategoriesState, fetchCategories } = CategoriesStore;
    const { categories } = useSnapshot(CategoriesState) as ICategoryState;

    useEffect(() => {
        fetchCategories(); // Fetch categories on component mount
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleOpenAddModal = () => {
        setOpen(true);
    };

    const handleEditCategory = (category: ICategory) => {
        setOpenEditModal(true);
        setSelectedCategory(category);
    };

    const handleDeleteCategory = (category: ICategory) => {
        setOpenDeleteModal(true);
        setSelectedCategory(category);
    };

    const handleCloseEditModal = () => {
        setSelectedCategory(undefined);
        setOpenEditModal(false);
    };

    return (
        <section className='flex flex-col gap-y-4 items-center bg-white rounded shadow-md mx-auto my-16 px-6 py-4 max-w-max'>
            <div className='font-semibold text-2xl'>Manage Categories</div>
            <div className='flex flex-row justify-between w-[420px]'>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    textColor='primary'
                    indicatorColor='primary'
                >
                    <Tab label='Expense' {...a11yProps(0)} />
                    <Tab label='Income' {...a11yProps(1)} />
                </Tabs>
                <Button
                    variant='outlined'
                    className='text-[16px] py-1.5 px-2 shadow-lg border-[#7D8395] text-black'
                    onClick={handleOpenAddModal}
                >
                    Add New <Add />
                </Button>
            </div>
            <TabPanel value={tabValue} index={0}>
                <CategoryTable
                    type='expense'
                    categories={categories}
                    handleEditCategory={handleEditCategory}
                    handleDeleteCategory={handleDeleteCategory}
                />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <CategoryTable
                    type='income'
                    categories={categories}
                    handleEditCategory={handleEditCategory}
                    handleDeleteCategory={handleDeleteCategory}
                />
            </TabPanel>
            <AddCategoriesModal open={open} setOpen={setOpen} />
            {selectedCategory && (
                <EditCategoriesModal
                    open={openEditModal}
                    category={selectedCategory}
                    onClose={handleCloseEditModal}
                />
            )}
            {selectedCategory && (
                <DeleteModal
                    deleteCategoryId={selectedCategory?._id}
                    setShowDeleteModal={setOpenDeleteModal}
                    showDeleteModal={openDeleteModal}
                    setSelectedCategory={setSelectedCategory}
                />
            )}
        </section>
    );
};

export default CategoriesPage;
