import { proxy } from 'valtio';
import {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
} from '../app/categories/api'; // Adjust the import path according to your project structure

export interface ICategoryContent {
    name: string;
    icon: string;
    type: string; // 'Income' or 'Expense'
    description?: string;
}

export interface ICategory extends ICategoryContent {
    _id: string;
    userId: string;
}

export interface ICategoryState {
    categories: ICategory[];
    loading: boolean;
    error: string | null;
}

export const CategoriesState = proxy<ICategoryState>({
    categories: [],
    loading: false,
    error: null,
});

const CategoriesStore = {
    CategoriesState,
    resetErrors: () => {
        CategoriesState.loading = false;
        CategoriesState.error = null;
    },
    resetCategories: () => {
        CategoriesState.categories = [];
        CategoriesState.loading = false;
        CategoriesState.error = null;
    },
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
};

export default CategoriesStore;
