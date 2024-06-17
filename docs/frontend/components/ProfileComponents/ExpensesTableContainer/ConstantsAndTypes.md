# Columns Configuration for Data Grid

## Overview
This document provides the configuration details for the columns of a data grid using `@mui/x-data-grid` in a React project. The `columns` array defines the structure and behavior of each column, including custom styling and specific properties for the grid cells.

## Dependencies
- **Material-UI Data Grid**: `@mui/x-data-grid`
- **clsx**: `clsx` for conditional class names

## Columns Configuration
### Columns Definition
The `columns` array contains four objects, each representing a column in the data grid: Category, Amount, Date, and Description.

```typescript
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import clsx from 'clsx';

export const columns: GridColDef[] = [
    {
        field: 'category',
        headerName: 'Category',
        type: 'string',
        disableColumnMenu: true,
        flex: 0.4,
        cellClassName: 'text-[#3F434E] text-sm font-normal',
        headerClassName:
            'bg-[#D9D9D9] bg-opacity-20 font-semibold text-black text-sm',
    },
    {
        field: 'amount',
        headerName: 'Amount',
        type: 'string',
        flex: 0.1,
        disableColumnMenu: true,
        cellClassName: (params: GridCellParams<any>) => {
            const dataValue = Number((params?.value as string).split('$')?.[0]);
            return clsx('text-sm font-normal', {
                'text-[#FF0000]': dataValue < 0,
                'text-[#27B867]': dataValue > 0,
            });
        },
        headerClassName:
            'bg-[#D9D9D9] bg-opacity-20 font-semibold text-black text-sm',
    },
    {
        field: 'date',
        headerName: 'Date',
        type: 'string',
        disableColumnMenu: true,
        flex: 0.1,
        cellClassName: 'text-[#3F434E] text-sm font-normal',
        headerClassName:
            'bg-[#D9D9D9] bg-opacity-20 font-semibold text-black text-sm',
    },
    {
        field: 'description',
        headerName: 'Description',
        type: 'string',
        flex: 0.4,
        disableColumnMenu: true,
        cellClassName:
            'text-[#3F434E] text-sm font-normal text-right w-full flex items-center justify-end',
        headerClassName:
            'bg-[#D9D9D9] bg-opacity-20 text-right w-full flex items-center justify-end font-semibold text-black text-sm',
    },
];
Field Descriptions
Category

field: The unique identifier for the column.
headerName: The display name for the column header.
type: The data type of the column.
disableColumnMenu: Disables the column menu for this column.
flex: Defines how the column should grow relative to other columns.
cellClassName: Custom styling for the cell content.
headerClassName: Custom styling for the header cell.
Amount

field: The unique identifier for the column.
headerName: The display name for the column header.
type: The data type of the column.
flex: Defines how the column should grow relative to other columns.
disableColumnMenu: Disables the column menu for this column.
cellClassName: Uses a function to conditionally style the cell based on its value. Positive values are green, and negative values are red.
headerClassName: Custom styling for the header cell.
Date

field: The unique identifier for the column.
headerName: The display name for the column header.
type: The data type of the column.
disableColumnMenu: Disables the column menu for this column.
flex: Defines how the column should grow relative to other columns.
cellClassName: Custom styling for the cell content.
headerClassName: Custom styling for the header cell.
Description

field: The unique identifier for the column.
headerName: The display name for the column header.
type: The data type of the column.
disableColumnMenu: Disables the column menu for this column.
flex: Defines how the column should grow relative to other columns.
cellClassName: Custom styling for the cell content, including text alignment and flex properties.
headerClassName: Custom styling for the header cell, including text alignment and flex properties.
Rows Interface
The IRows interface defines the structure of the data that will populate the grid.

typescript
export interface IRows {
    id: number;
    category: string;
    amount: string;
    date: string;
    description?: string;
}
Fields
id: Unique identifier for each row.
category: Category of the expense.
amount: Amount of the expense.
date: Date of the expense.
description: Optional description of the expense.
Usage
To use these columns and rows in a data grid, import the columns array and the IRows interface into your component and pass them as props to the DataGrid component.

typescript
import { DataGrid } from '@mui/x-data-grid';
import { columns, IRows } from './path/to/columns';

const rows: IRows[] = [
    { id: 1, category: 'Food', amount: '$50', date: '2023-06-15', description: 'Groceries' },
    { id: 2, category: 'Transport', amount: '$20', date: '2023-06-16' },
    // More rows...
];

const MyDataGridComponent = () => (
    <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
);
Ensure you have the necessary styling and CSS configurations to match the class names defined in the columns configuration.