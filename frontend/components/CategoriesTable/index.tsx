import React from 'react';
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICategory } from '@/store/CategoriesStore'; // Adjust path as needed

interface CategoryTableProps {
    type: string;
    categories: ICategory[];
    handleEditCategory: (category: ICategory) => void;
    handleDeleteCategory: (category: ICategory) => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({
    type,
    categories,
    handleEditCategory,
    handleDeleteCategory,
}) => {
    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 400 }}
                size='small'
                aria-label='a dense table'
            >
                <TableBody>
                    {categories
                        .filter(
                            (c) => c.type?.toLowerCase() === type?.toLowerCase()
                        )
                        .map((category) => (
                            <TableRow key={category._id}>
                                <TableCell padding='checkbox'>
                                    {category.icon}
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                    {category.name}
                                </TableCell>
                                <TableCell align='right'>
                                    <IconButton
                                        aria-label='edit'
                                        onClick={() =>
                                            handleEditCategory(category)
                                        }
                                    >
                                        <EditIcon color='primary' />
                                    </IconButton>
                                    <IconButton
                                        aria-label='delete'
                                        onClick={() =>
                                            handleDeleteCategory(category)
                                        }
                                    >
                                        <DeleteIcon color='secondary' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
