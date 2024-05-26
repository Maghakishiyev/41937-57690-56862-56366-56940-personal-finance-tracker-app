import { ICategories } from "@/store/UserStore";

export interface EditUserInfoModalProps {
    open: boolean | null;
    setOpen: (open: boolean) => void;
    category?: ICategories;
}