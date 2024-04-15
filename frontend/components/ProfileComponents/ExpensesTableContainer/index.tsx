import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { columns, rows } from './constantsAndTypes';
import { Tab, Tabs } from '@mui/material';

export const ExpensesTableContainer: React.FC = () => {
    const [value, setValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className='w-full flex-grow shadow-sm border-[#DCDCDC] border bg-white rounded py-4 flex flex-col items-start gap-8'>
            <Tabs
                value={value}
                onChange={handleChange}
                variant='scrollable'
                scrollButtons='auto'
                aria-label='scrollable auto tabs example'
            >
                <Tab label='All Transactions' />
                <Tab label='Category A' />
                <Tab label='Category B' />
                <Tab label='Category C' />
            </Tabs>
            <div className='w-full flex flex-grow'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    sx={{ border: 'none' }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 7 },
                        },
                    }}
                    pageSizeOptions={[7, 10]}
                />
            </div>
        </div>
    );
};
