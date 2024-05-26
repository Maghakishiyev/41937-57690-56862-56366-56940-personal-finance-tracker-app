import { ICategory } from "../models/user.interface";

const generateCategoryId = (name: string, type: string) => `${Date.now()}_${name}_${type}`;

export const getDefaultCategories = (): ICategory[] => {
    const types = {
        expense: "0",
        income: "1"
    };
    return [
        { _id: generateCategoryId("Food", types.expense), categoryName: "Food", categoryIcon: "🍔", categoryType: types.expense, categoryDescription: "" },
        { _id: generateCategoryId("SocialLife", types.expense), categoryName: "Social Life", categoryIcon: "🍻", categoryType: types.expense, categoryDescription: "" },
        { _id: generateCategoryId("Transport", types.expense), categoryName: "Transport", categoryIcon: "🚌", categoryType: types.expense, categoryDescription: "" },
        { _id: generateCategoryId("HouseHold", types.expense), categoryName: "HouseHold", categoryIcon: "🏠", categoryType: types.expense, categoryDescription: "" },
        { _id: generateCategoryId("Apparel", types.expense), categoryName: "Apparel", categoryIcon: "👗", categoryType: types.expense, categoryDescription: "" },
        { _id: generateCategoryId("Beauty", types.expense), categoryName: "Beauty", categoryIcon: "💅", categoryType: types.expense, categoryDescription: "" },
        { _id: generateCategoryId("Health", types.expense), categoryName: "Health", categoryIcon: "💊", categoryType: types.expense, categoryDescription: "" },
        { _id: generateCategoryId("Education", types.expense), categoryName: "Education", categoryIcon: "🎓", categoryType: types.expense, categoryDescription: "" },
        { _id: generateCategoryId("Gift", types.expense), categoryName: "Gift", categoryIcon: "🎁", categoryType: types.expense, categoryDescription: "" },
        { _id: generateCategoryId("Other", types.expense), categoryName: "Other", categoryIcon: "🔖", categoryType: types.expense, categoryDescription: "" },
        { _id: generateCategoryId("Allowance", types.income), categoryName: "Allowance", categoryIcon: "🧒", categoryType: types.income, categoryDescription: "" },
        { _id: generateCategoryId("Salary", types.income), categoryName: "Salary", categoryIcon: "💼", categoryType: types.income, categoryDescription: "" },
        { _id: generateCategoryId("PettyCash", types.income), categoryName: "Petty Cash", categoryIcon: "💵", categoryType: types.income, categoryDescription: "" },
        { _id: generateCategoryId("Bonus", types.income), categoryName: "Bonus", categoryIcon: "🎉", categoryType: types.income, categoryDescription: "" },
        { _id: generateCategoryId("Other", types.income), categoryName: "Other", categoryIcon: "➕", categoryType: types.income, categoryDescription: "" }
    ]
}