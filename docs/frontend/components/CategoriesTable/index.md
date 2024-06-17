<!-- Props -->

CategoryTableProps
type: string
The type of categories to be displayed in the table.

categories: ICategory[]
An array of category objects to be displayed. Each category should conform to the ICategory interface.

handleEditCategory: (category: ICategory) => void
A function that will be called when the edit icon is clicked for a category. It receives the category object as an argument.

handleDeleteCategory: (category: ICategory) => void
A function that will be called when the delete icon is clicked for a category. It receives the category object as an argument.

<!-- ICategory Interface -->

The ICategory interface should include at least the following properties:

_id: string
The unique identifier for the category.

name: string
The name of the category.

type: string
The type of the category.

icon: React.ReactNode
The icon representing the category.

<!-- Component Structure -->

TableContainer: Wraps the table in a Material-UI Paper component for styling.

Table: The main container for the table, with a minimum width of 400px and small size.

TableBody: Contains the rows of the table.

TableRow: Represents a single row in the table. Each row is identified by the unique _id of the category.

TableCell: Represents a single cell in a row. Cells include the category icon, name, and action buttons (edit and delete).
Action Buttons

EditIcon: Clicking this icon triggers the handleEditCategory function with the corresponding category object.

DeleteIcon: Clicking this icon triggers the handleDeleteCategory function with the corresponding category object.

<!-- Notes -->

Ensure that the path to the ICategory interface is correctly adjusted based on your project structure.

The CategoryTable component filters the categories based on the type prop, displaying only the categories that match the specified type.

Customize the icons and styles as needed to fit your application's design requirements.