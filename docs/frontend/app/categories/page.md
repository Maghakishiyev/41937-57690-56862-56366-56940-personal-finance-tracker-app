# CategoriesPage Component Documentation

## Overview

The `CategoriesPage` component is a React component designed for managing categories, supporting both expense and income categories. It includes functionality to add, edit, and delete categories, with state management using Valtio.

## Dependencies

- `react`
- `@mui/icons-material`
- `@mui/material`
- `valtio`
- `@/components/layout/TabComponents`
- `@/components/modals/AddEditCategories/AddCategoriesModal`
- `@/components/modals/AddEditCategories/EditModal`
- `@/components/modals/AddEditCategories/DeleteModal`
- `@/components/CategoriesTable`
- `@/store/CategoriesStore`

## Components and Functions

### Imported Components and Functions

- `useEffect`, `useState` from `react`
- `Add` from `@mui/icons-material`
- `Button`, `Tab`, `Tabs` from `@mui/material`
- `TabPanel` from `@/components/layout/TabComponents`
- `CategoriesStore`, `ICategory`, `ICategoryState` from `@/store/CategoriesStore`
- `AddCategoriesModal` from `@/components/modals/AddEditCategories/AddCategoriesModal`
- `EditCategoriesModal` from `@/components/modals/AddEditCategories/EditModal`
- `DeleteModal` from `@/components/modals/AddEditCategories/DeleteModal`
- `CategoryTable` from `@/components/CategoriesTable`

### Component: `CategoriesPage`

#### State Variables

- `tabValue`: Current tab index for expense or income categories.
- `selectedCategory`: Currently selected category for editing or deletion.
- `openEditModal`: Boolean state to control the visibility of the edit category modal.
- `openDeleteModal`: Boolean state to control the visibility of the delete category modal.
- `open`: Boolean state to control the visibility of the add category modal.
- `CategoriesState`, `fetchCategories` from `CategoriesStore`.
- `categories`: List of categories derived from `CategoriesState`.

#### Effects

- `useEffect`: Fetches categories from the store on component mount.

#### Event Handlers

- `handleChange(event: React.SyntheticEvent, newValue: number)`: Handles tab change between expense and income categories.
- `handleOpenAddModal()`: Opens the add category modal.
- `handleEditCategory(category: ICategory)`: Sets the selected category and opens the edit category modal.
- `handleDeleteCategory(category: ICategory)`: Sets the selected category and opens the delete category modal.
- `handleCloseEditModal()`: Closes the edit category modal and resets the selected category.

#### Rendering

The component renders a section containing:

- A title "Manage Categories".
- Tabs for expense and income categories.
- A button to add a new category.
- Two `CategoryTable` components for displaying and managing expense and income categories.
- `AddCategoriesModal`, `EditCategoriesModal`, and `DeleteModal` components for adding, editing, and deleting categories respectively.

### Example Usage

```javascript
import CategoriesPage from './path/to/CategoriesPage';

function App() {
    return (
        <div className="App">
            <CategoriesPage />
        </div>
    );
}

export default App;

## Notes
Ensure all imported components and modules are available and correctly path-referenced.
Adjust the styles and UI components as per your project's design requirements.

##  Error Handling
Error handling for category operations should be implemented within respective modals and actions to provide meaningful feedback to users.
