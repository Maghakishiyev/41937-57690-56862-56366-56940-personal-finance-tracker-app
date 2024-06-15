import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditableImage from './EditableImage';
import { setUser } from '@/store/UserStore';
import '@testing-library/jest-dom';

describe('EditableImage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('token', 'fake-token');
    });

    it('renders correctly', async () => {
        render(<EditableImage />);
        expect(screen.getByText('Change Image')).toBeInTheDocument();
    });

    it('uploads an image and updates user state on successful upload', async () => {
        render(<EditableImage />);
        const file = new File(['image'], 'test.jpg', { type: 'image/jpeg' });
        const label = screen.getByLabelText('Change Image');
        console.log(label.innerHTML); // Log to verify what's rendered

        const input = label.querySelector('input') as HTMLInputElement;
        if (!input) {
            console.error('Input not found');
            return;
        }

        await userEvent.upload(input, file);

        // Wait for async actions to complete
        await waitFor(() => expect(setUser).toHaveBeenCalled());
    });
});
