import { ITrack } from '@/store/TracksStore';
import { generateColors } from './generateColors';
import { CategorySummary, ICategory } from '@/store/CategoriesStore';

export function getCategoryData(
    tracks: ITrack[],
    userCategories: ICategory[]
): CategorySummary[] {
    const categoryMap: Record<
        string,
        { totalAmount: number; entries: number; name: string; icon?: string }
    > = {};

    // Sum up amounts by category
    tracks.forEach((track) => {
        const amount = parseFloat(track.amount);
        if (categoryMap[track.category]) {
            categoryMap[track.category].totalAmount += amount;
            categoryMap[track.category].entries += 1;
        } else {
            const userCategory = userCategories.find(
                (userCategory) => userCategory._id === track.category
            );

            categoryMap[track.category] = {
                totalAmount: amount,
                entries: 1,
                name: userCategory?.name ?? track.category,
                icon: userCategory?.icon,
            };
        }
    });

    const totalAmount = Object.values(categoryMap).reduce(
        (sum, current) => sum + current.totalAmount,
        0
    );

    // Generate colors
    const categories = Object.keys(categoryMap);
    const colors = generateColors(categories.length);

    // Create category summaries
    const categorySummaries: CategorySummary[] = categories.map(
        (categoryId, index) => {
            const category = categoryMap[categoryId];
            return {
                icon: category?.icon,
                name: category.name, // Placeholder name, adjust as needed
                category: categoryId,
                totalAmount: category.totalAmount,
                percentage: parseFloat(
                    ((category.totalAmount / totalAmount) * 100).toFixed(2)
                ),
                color: colors[index], // Assign a color from the generated palette
            };
        }
    );

    return categorySummaries;
}
