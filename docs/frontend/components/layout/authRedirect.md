<!-- Overview -->
useAuthRedirect is a custom React hook designed for use with Next.js applications. It handles the redirection of users based on their authentication status. Specifically, it redirects unauthenticated users to the login page while allowing authenticated users to access the intended routes.

<!-- Hook Signature -->

interface UseAuthRedirectProps {
    isUserLoading: boolean;
    isUserLoggedIn: boolean;
}

export const useAuthRedirect = ({ isUserLoading, isUserLoggedIn }: UseAuthRedirectProps): void;


Parameters

isUserLoading: boolean
Indicates whether the user authentication status is still being determined.
isUserLoggedIn: boolean
Indicates whether the user is currently authenticated.

Usage
Importing the Hook
To use the useAuthRedirect hook, import it into your React component along with other necessary hooks from Next.js.

import { useAuthRedirect } from './path/to/useAuthRedirect';
import { useState, useEffect } from 'react';


<!-- Example Usage -->
Here is an example of how to use the useAuthRedirect hook in a Next.js page component.

const ExamplePage = () => {
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    // Simulate fetching user authentication status
    useEffect(() => {
        // Assume we fetch user status here
        const fetchUserStatus = async () => {
            // Simulate loading delay
            setTimeout(() => {
                setIsUserLoading(false);
                setIsUserLoggedIn(false); // Change this to true to simulate a logged-in user
            }, 1000);
        };
        fetchUserStatus();
    }, []);

    useAuthRedirect({ isUserLoading, isUserLoggedIn });

    if (isUserLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome to the Example Page</h1>
        </div>
    );
};

export default ExamplePage;

<!-- How It Works -->

useRouter and usePathname are hooks from Next.js that provide access to the router and the current pathname.
useEffect: The hook runs a side effect whenever isUserLoading, isUserLoggedIn, router, or pathname change.
Redirection Logic:
If the user is not loading (!isUserLoading) and not logged in (!isUserLoggedIn), it checks the current pathname.
If the pathname is not among the allowed paths (/register, /), it redirects the user to the /login page using router.replace('/login').

<!-- Notes -->
This hook assumes that the authentication state (loading and logged-in status) is managed by the parent component or context.
The paths /register and / are excluded from redirection, allowing unauthenticated users to access the registration and home pages.
Adjust the import path for useAuthRedirect and the paths in noRedirectNeeded as needed for your application.

<!-- Dependencies -->
Next.js: This hook utilizes Next.js navigation hooks (useRouter, usePathname).

npm install next react react-dom
# or
yarn add next react react-dom

This custom hook simplifies authentication flow management, ensuring that only authenticated users can access certain routes while redirecting unauthenticated users to the login page.