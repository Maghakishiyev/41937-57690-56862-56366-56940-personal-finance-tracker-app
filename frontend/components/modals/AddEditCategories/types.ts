import { ICategory } from '@/store/CategoriesStore';

export interface EditUserInfoModalProps {
    open: boolean | null;
    setOpen: (open: boolean) => void;
    category?: ICategory;
}

export interface EditCategoriesProps {
    openEditModal?: boolean | null;
    setOpenEditModal?: (open: boolean) => void;
    categories?: ICategory;
}
