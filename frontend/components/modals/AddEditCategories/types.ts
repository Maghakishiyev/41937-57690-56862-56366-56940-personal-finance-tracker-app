import { ICategories } from "@/store/UserStore";

export interface EditUserInfoModalProps {
    open: boolean | null;
    setOpen: (open: boolean) => void;
    category?: ICategories;
}

export interface EditCategoriesProps {
    openEditModal?: boolean | null;
    setOpenEditModal?: (open: boolean) => void;
    categories?: ICategories;
}