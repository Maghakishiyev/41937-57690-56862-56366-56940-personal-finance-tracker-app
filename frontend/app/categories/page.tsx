"use client"
import { useState } from "react";
import { Add, SellOutlined } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSnapshot } from "valtio";
import { Button, IconButton, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableRow, Tabs } from "@mui/material"
import { TabPanel } from "@/components/layout/TabComponents";
import { AccountState, ICategories, IUserState, setShowEditCategoriesModal } from "@/store/UserStore";
import AddCategoriesModal from "@/components/modals/AddEditCategories/AddCategoriesModal";


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const CategoriesPage = () => {
    const [tabValue, setTabValue] = useState<number>(0);
    const [open, setOpen] = useState(false);


    const { user } = useSnapshot(AccountState) as IUserState;

    const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
        setTabValue(newValue);
    };

    const handleEditCategory = (categories: ICategories) => {
        setShowEditCategoriesModal(true, categories)
    }

    return (
        <section className='flex flex-col gap-y-4 items-center bg-white rounded shadow-md mx-auto my-16 px-6 py-4 max-w-max'>
            <div className="font-semibold text-2xl">
                Manage Categories
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-row justify-between w-[420px]">
                    <Tabs value={tabValue} onChange={handleChange} textColor="primary" indicatorColor="primary">
                        <Tab label="Expense" {...a11yProps(0)} />
                        <Tab label="Income" {...a11yProps(1)} />
                    </Tabs>
                    <Button
                        variant="outlined"
                        className="text-[16px] py-1.5 px-2 shadow-lg border-[#7D8395] text-black"
                        onClick={() => setOpen(true)}
                    >
                        Add New
                        <Add />
                    </Button>
                    <AddCategoriesModal open={open} setOpen={setOpen} />
                </div>
                <TabPanel value={tabValue} index={0}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                            <TableBody>
                                {
                                    user.categories.map((categories) => categories.categoryType == "0" && (
                                        <TableRow key={categories.categoryName}>
                                            <TableCell padding="checkbox">
                                                <SellOutlined />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {categories.categoryName}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton aria-label="edit" onClick={() => handleEditCategory(categories)}>
                                                    <EditIcon color="primary" />
                                                </IconButton>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon color="secondary" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                            <TableBody>
                                {
                                    user.categories.map((categories) => categories.categoryType == "1" && (
                                        <TableRow key={categories.categoryName}>
                                            <TableCell padding="checkbox">
                                                <SellOutlined />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {categories.categoryName}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton aria-label="edit" onClick={() => handleEditCategory(categories)} >
                                                    <EditIcon color="primary" />
                                                </IconButton>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon color="secondary" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </div>

        </section>
    )
}

export default CategoriesPage