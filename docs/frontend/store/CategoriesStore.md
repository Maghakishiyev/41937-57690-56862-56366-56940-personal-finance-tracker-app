Overview
The CategoriesStore is a state management solution using Valtio to manage category-related data in your application. It provides functionalities to fetch, add, update, and delete categories, as well as to handle loading states and errors.


export interface ICategoryContent {
    name: string;
    icon: string;
    type: string; // 'Income' or 'Expense'
    description?: string;
}
ICategory
Extends ICategoryContent by adding _id and userId fields.


export interface ICategory extends ICategoryContent {
    _id: string;
    userId: string;
}
### CategorySummary
Represents a summary of a category with additional calculated fields.


export interface CategorySummary {
    icon?: string;
    name: string;
    category: string;
    totalAmount: number;
    percentage?: number; // This will be calculated later
    color?: string;
}
### ICategoryState
Represents the state structure for categories, including loading and error states.


export interface ICategoryState {
    categories: ICategory[];
    loading: boolean;
    error: string | null;
}
### State
The CategoriesState is a proxy state managed by Valtio.


export const CategoriesState = proxy<ICategoryState>({
    categories: [],
    loading: false,
    error: null,
});
### Store Methods
resetErrors
Resets the loading and error states.


resetErrors: () => {
    CategoriesState.loading = false;
    CategoriesState.error = null;
},
resetCategories
Resets the categories array and the loading and error states.


resetCategories: () => {
    CategoriesState.categories = [];
    CategoriesState.loading = false;
    CategoriesState.error = null;
},
### fetchCategories
Fetches the categories from the API and updates the state. Handles loading and error states.


fetchCategories: async function () {
    CategoriesState.loading = true;
    CategoriesState.error = null;
    try {
        const data = await getCategories();
        CategoriesState.categories = data; // Assuming the API returns an array of categories
        CategoriesState.loading = false;
    } catch (error: any) {
        CategoriesState.error = error.message;
        CategoriesState.loading = false;
    }
},
### addCategory
Adds a new category to the state and handles loading and error states.


addCategory: async function (category: ICategoryContent) {
    CategoriesState.loading = true;
    CategoriesState.error = null;
    try {
        const addedCategory = await addCategory(category);
        CategoriesState.categories.push(addedCategory); // Add the new category to the state
        CategoriesState.loading = false;
    } catch (error: any) {
        CategoriesState.error = error.message;
        CategoriesState.loading = false;
    }
},
### updateCategory
Updates an existing category in the state and handles loading and error states.


updateCategory: async function (category: ICategory) {
    CategoriesState.loading = true;
    CategoriesState.error = null;
    try {
        const updatedCategory = await updateCategory(category);
        const index = CategoriesState.categories.findIndex(
            (cat) => cat._id === category._id
        );
        if (index !== -1) {
            CategoriesState.categories[index] = updatedCategory;
        }
        CategoriesState.loading = false;
    } catch (error: any) {
        CategoriesState.error = error.message;
        CategoriesState.loading = false;
    }
},
### deleteCategory
Deletes a category from the state and handles loading and error states.


deleteCategory: async function (categoryId: string) {
    CategoriesState.loading = true;
    CategoriesState.error = null;
    try {
        await deleteCategory(categoryId);
        CategoriesState.categories = CategoriesState.categories.filter(
            (cat) => cat._id !== categoryId
        );
        CategoriesState.loading = false;
    } catch (error: any) {
        CategoriesState.error = error.message;
        CategoriesState.loading = false;
    }
},
Usage
To use the CategoriesStore in your application, import it and utilize its methods to manage category-related data. Below is an example of how to fetch categories and display them in a React component.


import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import CategoriesStore from '@/store/CategoriesStore';

const CategoriesComponent: React.FC = () => {
    const { categories, loading, error } = useSnapshot(CategoriesStore.CategoriesState);

    useEffect(() => {
        CategoriesStore.fetchCategories();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category._id}>
                        {category.name} ({category.type})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoriesComponent;