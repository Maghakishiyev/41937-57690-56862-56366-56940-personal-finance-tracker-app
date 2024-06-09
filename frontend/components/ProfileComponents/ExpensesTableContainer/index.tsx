import React, { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IRows, columns } from './constantsAndTypes';
import { Tab, Tabs } from '@mui/material';
import { useSnapshot } from 'valtio';
import TrackStore, { ITrack, ITrackState } from '@/store/TracksStore';
import CategoriesStore, { ICategoryState } from '@/store/CategoriesStore';
import UserAccountsStore, {
    IuserAccountState,
} from '@/store/UserAccountsStore';
import TrackModal from './TrackModal';

export const ExpensesTableContainer: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState<ITrack | null>(null);
    const [value, setValue] = useState<number>(0);

    const { tracks } = useSnapshot(TrackStore.TrackState) as ITrackState;
    const { categories } = useSnapshot(
        CategoriesStore.CategoriesState
    ) as ICategoryState;
    const { accounts } = useSnapshot(
        UserAccountsStore.UserAccountsState
    ) as IuserAccountState;

    useEffect(() => {
        CategoriesStore?.fetchCategories();
        UserAccountsStore?.fetchAccounts();
    }, []);

    useEffect(() => {
        const categoryMap = [
            'All Transactions',
            'Income',
            'Expense',
            'Transfer',
        ];
        let query: any = {};

        if (value > 0) {
            query.type = categoryMap[value]?.toLowerCase();
        }

        TrackStore.fetchTracks(query);
    }, [value]);

    const rows = useMemo(
        () =>
            tracks?.map((track) => {
                const trackCategory = categories?.find(
                    (category) => category._id === track.category
                );

                const fromAccount = accounts?.find(
                    (account) => account._id === track?.from
                );

                const toAccount = accounts?.find(
                    (account) => account._id === track?.to
                );

                return {
                    id: track?._id,
                    category:
                        track?.type === 'transfer'
                            ? `Transfer: ${fromAccount?.emoji} ${fromAccount?.name} ⮕ ${toAccount?.emoji} ${toAccount?.name}`
                            : `${trackCategory?.icon} ${trackCategory?.name}` ??
                              track?.category ??
                              '',
                    amount:
                        (
                            (track?.type === 'expense' ? -1 : 1) *
                            parseFloat(track?.amount ?? '0')
                        ).toFixed(2) + '$',
                    date: track?.date ?? '',
                    description: track?.description ?? '',
                };
            }),
        [tracks, tracks?.length, categories, accounts]
    );

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleRowClick = (params: any, event: any) => {
        const track = tracks.find(
            (track) =>
                track?._id?.toLowerCase() === params?.row?.id?.toLowerCase()
        );
        setSelectedTrack(track ?? null);
        setModalOpen(true);
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
                <Tab label='Income' />
                <Tab label='Expense' />
                <Tab label='Transfers' />
            </Tabs>
            {selectedTrack && modalOpen && (
                <TrackModal
                    track={selectedTrack}
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={(updatedTrack) =>
                        TrackStore.updateTrack(updatedTrack)
                    }
                    onDelete={(trackId) => TrackStore.deleteTrack(trackId)}
                />
            )}
            <div className='w-full flex flex-grow'>
                <DataGrid
                    onRowClick={handleRowClick}
                    rows={rows}
                    columns={columns}
                    sx={{ border: 'none' }}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 7 },
                        },
                    }}
                    pageSizeOptions={[10, 20]}
                />
            </div>
        </div>
    );
};
