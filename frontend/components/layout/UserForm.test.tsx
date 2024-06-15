import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserForm from './UserForm';

describe('UserForm', () => {
    const initialFormData = {
        firstName: '',
        lastName: '',
        userName: '',
        email: 'test@example.com',
        birthday: '',
    };

    const initialFieldErrors = {
        firstName: false,
        lastName: false,
        userName: false,
        email: false,
        birthday: false,
    };

    let setFormData: jest.Mock;
    let setFieldErrors: jest.Mock;

    beforeEach(() => {
        setFormData = jest.fn();
        setFieldErrors = jest.fn();
    });

    it('renders the form fields', () => {
        render(
            <UserForm
                formData={initialFormData}
                setFormData={setFormData}
                fieldErrors={initialFieldErrors}
                setFieldErrors={setFieldErrors}
            />
        );

        expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/user name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/birthday/i)).toBeInTheDocument();
    });

    it('calls setFormData and setFieldErrors on input change', () => {
        render(
            <UserForm
                formData={initialFormData}
                setFormData={setFormData}
                fieldErrors={initialFieldErrors}
                setFieldErrors={setFieldErrors}
            />
        );

        const firstNameInput = screen.getByLabelText(/first name/i);
        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        expect(setFormData).toHaveBeenCalledWith({
            ...initialFormData,
            firstName: 'John',
        });
        expect(setFieldErrors).toHaveBeenCalledWith({
            ...initialFieldErrors,
            firstName: false,
        });
    });

    it('calls setFormData and setFieldErrors on date change', () => {
        render(
            <UserForm
                formData={initialFormData}
                setFormData={setFormData}
                fieldErrors={initialFieldErrors}
                setFieldErrors={setFieldErrors}
            />
        );

        const birthdayInput = screen.getByLabelText(/birthday/i);
        fireEvent.change(birthdayInput, { target: { value: '2000-01-01' } });
        expect(setFormData).toHaveBeenCalledWith({
            ...initialFormData,
            birthday: '2000-01-01',
        });
        expect(setFieldErrors).toHaveBeenCalledWith({
            ...initialFieldErrors,
            birthday: false,
        });
    });

    it('displays error if field is empty', () => {
        render(
            <UserForm
                formData={initialFormData}
                setFormData={setFormData}
                fieldErrors={{ ...initialFieldErrors, firstName: true }}
                setFieldErrors={setFieldErrors}
            />
        );

        const firstNameInput = screen.getByLabelText(/first name/i);
        expect(firstNameInput).toHaveClass(
            'MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input'
        );
    });

    it('does not allow email input to be changed', () => {
        render(
            <UserForm
                formData={initialFormData}
                setFormData={setFormData}
                fieldErrors={initialFieldErrors}
                setFieldErrors={setFieldErrors}
            />
        );

        const emailInput = screen.getByLabelText(/email/i);
        expect(emailInput).toBeDisabled();
    });
});
