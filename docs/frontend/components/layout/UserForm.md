Overview
The UserForm component is a React functional component designed to facilitate user input and data submission within a form interface. It provides fields for entering user details such as first name, last name, username, email, and birthday. The component handles user input changes, validates input data, and updates form state accordingly.

Props
formData (required): Object holding the current state of form data.
setFormData (required): Function to update the formData state based on user input.
fieldErrors (required): Object containing boolean flags for validation errors associated with form fields.
setFieldErrors (required): Function to update the fieldErrors state based on input validation.

<!-- Example -->

<!-- import React, { useState } from 'react';
import UserForm from '@/components/UserForm';

const UserProfilePage = () => {
    const initialFormData = {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        birthday: '',
    };
    const [formData, setFormData] = useState(initialFormData);
    const [fieldErrors, setFieldErrors] = useState({
        firstName: false,
        lastName: false,
        userName: false,
        email: false,
        birthday: false,
    });

    return (
        <div>
            <UserForm formData={formData} setFormData={setFormData} fieldErrors={fieldErrors} setFieldErrors={setFieldErrors} />
            {/* Additional UI components or functionality */}
        </div>
    );
};

export default UserProfilePage; -->


Dependencies
React: The component uses React functional component syntax, state management (useState), and JSX for rendering.
Material-UI (@mui/material): Utilizes Material-UI TextField component for input fields with validation and styling.

Functionality
Input Handling: Manages user input changes (handleChange and formatDateISO functions) for fields like first name, last name, username, email, and birthday.
Validation: Checks for empty values (value.trim() === '') to update fieldErrors state for error display.
Disabled Field: Disables the email field to prevent user modification (disabled prop).
Styling: Applies custom styling (className='w-[80%]') using Tailwind CSS classes for consistent UI appearance.

Notes
Ensure all dependencies (React, @mui/material, Tailwind CSS) are correctly installed and imported into your project.
Customize the formData structure and validation logic (fieldErrors) to fit your specific form requirements and validation rules.
Adjust the handleChange and formatDateISO functions as needed for additional or modified form fields.
