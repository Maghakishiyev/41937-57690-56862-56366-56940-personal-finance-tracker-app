Dependencies
React: import React from 'react';
Material UI: import { Avatar, Button } from '@mui/material';
Valtio: import { useSnapshot } from 'valtio';
Icons: import { CloudUpload } from '@mui/icons-material';
Custom State Management: import { UserState, IUser, IUserState, setUser } from '@/store/UserStore';
Description
The EditableImage component provides a user interface for changing the user's profile image. It displays the current image using the Avatar component and includes an input element for file selection. When a new image is selected, it uploads the image to a server and updates the user's state with the new image URL.

Props
This component does not accept any props.

Usage

Importing the Component
To use the EditableImage component, import it into your React component.

import EditableImage from './path/to/EditableImage';

const UserProfilePage = () => {
    return (
        <div>
            <h1>User Profile</h1>
            <EditableImage />
        </div>
    );
};

export default UserProfilePage;


How It Works

State Management: The component uses the valtio library to manage state. It takes a snapshot of the UserState using the useSnapshot hook.
File Selection: An input element of type file is hidden and triggered by clicking the Button component. This input only accepts image files.
File Upload: When a file is selected, the handleImageChange function is called. This function:
Creates a FormData object and appends the selected file.
Retrieves the authentication token from localStorage.
Sends a POST request to the server with the image file and the token for authentication.
On successful upload, updates the user state with the new image URL using the setUser function.
Display: The selected image is displayed using the Avatar component.


Handling Image Change
The handleImageChange function manages the process of uploading the selected image and updating the user state.

const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('imageFile', file);
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(
                    'http://localhost:8080/upload/img',
                    {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    }
                );
                const data = await response.json();
                const updatedUser: IUser = {
                    ...state.user,
                    imageFile: data.url,
                };
                setUser(updatedUser);
            } catch (error) {
                console.error('Upload error:', error);
            }
        }
    } else {
        console.log('No file selected');
    }
};

Notes
Ensure the backend endpoint for image upload (http://localhost:8080/upload/img) is correctly configured and running.
The authentication token must be stored in localStorage for the upload to work.
Adjust the import paths for UserStore as necessary for your project structure.
