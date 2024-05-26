import { IUserAccount } from '@/store/UserAccountsStore';
import { Dispatch, SetStateAction } from 'react';

export interface EditUserInfoModalProps {
    open: boolean | null;
    setOpen: (open: boolean) => void;
    account?: IUserAccount;
    setSelectedAccount: Dispatch<SetStateAction<IUserAccount | undefined>>;
}
