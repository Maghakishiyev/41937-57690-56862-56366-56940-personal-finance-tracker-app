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
            const dataValue = Number((params?.value as string).split(' ')?.[0]);
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

export interface IRows {
    id: number;
    category: string;
    amount: string;
    date: string;
    description?: string;
}

export const rows: IRows[] = [
    {
        id: 1,
        category: 'Category A',
        amount: '+10.8 $',
        date: '10.04.2020',
        description: 'Lorom Ipsum Dolor sit amert',
    },
    {
        id: 2,
        category: 'Category A',
        amount: '+10.8 $',
        date: '10.04.2020',
        description: 'Lorom Ipsum Dolor sit amert',
    },
    {
        id: 3,
        category: 'Category A',
        amount: '-10.8 $',
        date: '10.04.2020',
        description: 'Lorom Ipsum Dolor sit amert',
    },
    {
        id: 4,
        category: 'Category B',
        amount: '+10.8 $',
        date: '10.04.2020',
        description: 'Lorom Ipsum Dolor sit amert',
    },
    {
        id: 5,
        category: 'Category C',
        amount: '+10.8 $',
        date: '10.04.2020',
        description: 'Lorom Ipsum Dolor sit amert',
    },
    {
        id: 6,
        category: 'Category A',
        amount: '-10.8 $',
        date: '10.04.2020',
        description: 'Lorom Ipsum Dolor sit amert',
    },
    {
        id: 7,
        category: 'Category B',
        amount: '-10.8 $',
        date: '10.04.2020',
        description: 'Lorom Ipsum Dolor sit amert',
    },
    {
        id: 8,
        category: 'Category C',
        amount: '+10.8 $',
        date: '10.04.2020',
        description: 'Lorom Ipsum Dolor sit amert',
    },
    {
        id: 9,
        category: 'Category C',
        amount: '+10.8 $',
        date: '10.04.2020',
        description: 'Lorom Ipsum Dolor sit amert',
    },
];
