'use client';

import PieChart from '@/components/PieChart';
import { TabPanel } from '@/components/layout/TabComponents';
import CategoriesStore, {
    CategorySummary,
    ICategoryState,
} from '@/store/CategoriesStore';
import TrackStore, { ITrackState } from '@/store/TracksStore';
import { getCategoryData } from '@/utils/getCategoryData';
import {
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Tabs,
    Tab,
} from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function StatsPage() {
    const { TrackState, fetchTracks } = TrackStore;
    const { CategoriesState, fetchCategories } = CategoriesStore;
    const { categories } = useSnapshot(CategoriesState) as ICategoryState;
    const { tracks } = useSnapshot(TrackState) as ITrackState;

    const [tabValue, setTabValue] = useState<number>(0);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [categorySummaryData, setCategorySummaryData] = useState<
        CategorySummary[]
    >([]);

    useEffect(() => {
        fetchTracks({
            type: tabValue === 0 ? 'expense' : 'income',
            month: selectedMonth?.toString(),
            year: selectedYear?.toString(),
        });
        if (!categories?.length) {
            fetchCategories();
        }
    }, [selectedMonth, selectedYear, tabValue]);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

    const handleMonthChange = (event: React.ChangeEvent<{ value: number }>) => {
        setSelectedMonth(event.target.value as number);
    };

    const handleYearChange = (event: React.ChangeEvent<{ value: number }>) => {
        setSelectedYear(event.target.value as number);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        const formattedData = getCategoryData(tracks, categories);
        setCategorySummaryData(formattedData);
    }, [tracks, categories]);

    return (
        <section className='flex flex-col gap-y-4 items-center bg-white rounded shadow-md mx-auto my-16 px-6 py-4 max-w-max min-w-[480px]'>
            <div className='font-semibold text-2xl'>
                Monthly Statistics for {months[selectedMonth]} {selectedYear}
            </div>
            <div className='flex items-center justify-between w-[420px]'>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    textColor='primary'
                    indicatorColor='primary'
                >
                    <Tab label='Expense' {...a11yProps(0)} />
                    <Tab label='Income' {...a11yProps(1)} />
                </Tabs>

                <div className='flex items-center justify-between gap-3'>
                    <FormControl
                        variant='outlined'
                        sx={{
                            m: 0,
                            minWidth: 80,
                            width: 'auto',
                            '& .MuiInputBase-root': {
                                height: 40,
                                padding: '0 0px',
                            },
                            '& .MuiInputLabel-root': {
                                transform: 'translate(14px, 12px) scale(1)',
                            },
                            '& .MuiInputLabel-shrink': {
                                transform: 'translate(14px, -6px) scale(0.75)',
                            },
                        }}
                    >
                        <InputLabel>Month</InputLabel>
                        <Select
                            value={selectedMonth}
                            onChange={handleMonthChange as any}
                            label='Month'
                        >
                            {months.map((month, index) => (
                                <MenuItem key={month} value={index}>
                                    {month}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        variant='outlined'
                        sx={{
                            m: 0,
                            minWidth: 80,
                            width: 'auto',
                            '& .MuiInputBase-root': {
                                height: 40,
                                padding: '0 0px',
                            },
                            '& .MuiInputLabel-root': {
                                transform: 'translate(14px, 12px) scale(1)',
                            },
                            '& .MuiInputLabel-shrink': {
                                transform: 'translate(14px, -6px) scale(0.75)',
                            },
                        }}
                    >
                        <InputLabel>Year</InputLabel>
                        <Select
                            value={selectedYear}
                            onChange={handleYearChange as any}
                            label='Year'
                        >
                            {years.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </div>
            {categorySummaryData?.length ? (
                <>
                    <PieChart data={categorySummaryData} />
                    <div className='w-full flex flex-col max-h-[188px] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500'>
                        {categorySummaryData &&
                            categorySummaryData.map(
                                (categorySummary: CategorySummary, index) => (
                                    <div
                                        className='w-full px-3 py-2 flex items-center justify-between border-x border-t border-[#7D8395] border-opacity-40 last:border-b'
                                        key={categorySummary.category}
                                    >
                                        <div className='flex items-center gap-1.5'>
                                            <div>
                                                {categorySummary?.icon ?? '🏷️'}
                                            </div>
                                            <div className='font-semibold text-base text-black'>
                                                {categorySummary?.name}
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <div className='font-semibold text-sm text-black'>
                                                {categorySummary.totalAmount.toFixed(
                                                    2
                                                )}
                                                $
                                            </div>
                                            <div
                                                className='flex items-center justify-center w-20 py-1 rounded text-sm font-semibold text-white'
                                                style={{
                                                    background:
                                                        categorySummary.color,
                                                }}
                                            >
                                                {categorySummary.percentage}%
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                    </div>
                </>
            ) : (
                <div className='min-h-[400px] w-full flex flex-col items-center justify-center text-center px-4'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-20 w-20 text-gray-400 mb-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M9 12h6m-6 4h6m-6-8h6M9 16h6m2 0a9 9 0 110-18H5a9 9 0 1018 0v3H5v12h16v3H5a9 9 0 0116 0z'
                        />
                    </svg>
                    <h1 className='text-xl font-bold text-gray-800 mb-2'>
                        No Data Available
                    </h1>
                    <p className='text-gray-600 mb-4'>
                        You haven&apos;t tracked any{' '}
                        {tabValue === 0 ? 'expenses' : 'income'} for{' '}
                        {months[selectedMonth]} {selectedYear}.
                    </p>
                    <Link
                        href={'/track'}
                        className='px-6 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition duration-300'
                    >
                        Add {tabValue === 0 ? 'Expense' : 'Income'}
                    </Link>
                </div>
            )}
        </section>
    );
}
