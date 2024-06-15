// Import the necessary types
import { ITrack } from '@/store/TracksStore';
import { ICategory } from '@/store/CategoriesStore';
import { getCategoryData } from './getCategoryData';
import * as colorModule from './generateColors';

// Type the mock to satisfy TypeScript
jest.mock('./generateColors', () => ({
    generateColors: jest.fn(),
}));

describe('getCategoryData', () => {
    beforeEach(() => {
        // Clear previous mocks and set a new return value
        (colorModule.generateColors as jest.Mock).mockClear();
        (colorModule.generateColors as jest.Mock).mockReturnValue([
            'red',
            'blue',
        ]);
    });

    it('should return an empty array when no tracks are provided', () => {
        const tracks: ITrack[] = [];
        const categories: ICategory[] = [];
        const result = getCategoryData(tracks, categories);
        expect(result).toEqual([]);
    });

    // Additional tests follow...

    it('should handle tracks and categorize them correctly', () => {
        const tracks: ITrack[] = [
            {
                _id: 't1',
                userId: 'u1',
                category: 'c1',
                amount: '20',
                type: 'Expense',
                date: '2021-01-01',
            },
            {
                _id: 't2',
                userId: 'u1',
                category: 'c1',
                amount: '30',
                type: 'Expense',
                date: '2021-01-02',
            },
            {
                _id: 't3',
                userId: 'u1',
                category: 'c2',
                amount: '50',
                type: 'Expense',
                date: '2021-01-03',
            },
        ];
        const userCategories: ICategory[] = [
            {
                _id: 'c1',
                userId: 'u1',
                name: 'Food',
                icon: 'food_icon',
                type: 'Expense',
            },
            {
                _id: 'c2',
                userId: 'u1',
                name: 'Transport',
                icon: 'transport_icon',
                type: 'Expense',
            },
        ];

        const result = getCategoryData(tracks, userCategories);
        expect(result).toEqual([
            {
                category: 'c1',
                icon: 'food_icon',
                name: 'Food',
                totalAmount: 50,
                percentage: 50.0,
                color: 'red',
            },
            {
                category: 'c2',
                icon: 'transport_icon',
                name: 'Transport',
                totalAmount: 50,
                percentage: 50.0,
                color: 'blue',
            },
        ]);
    });
});
