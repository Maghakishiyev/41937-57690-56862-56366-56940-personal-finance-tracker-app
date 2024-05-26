import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react";
interface UseAuthRedirectProps {
    isUserLoading: boolean;
    isUserLoggedIn: boolean;
}

export const useAuthRedirect = ({ isUserLoading, isUserLoggedIn }: UseAuthRedirectProps): void => {
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        const mustRedirect = !isUserLoading && !isUserLoggedIn;
        const noRedirectNeeded = ['/register', '/'];

        if (mustRedirect && !noRedirectNeeded.includes(pathname)) {
            router.replace('/login');
        }
    }, [isUserLoading, isUserLoggedIn, router, pathname])
}