import { render, screen } from '@testing-library/react';
import ModalTitle from './ModalTitle';

describe('ModalTitle', () => {
    it('renders the title with default styling', () => {
        const testTitle = 'Test Title';
        render(<ModalTitle title={testTitle} />);

        const titleElement = screen.getByText(testTitle);
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveClass(
            'flex justify-center items-center font-semibold text-2xl text-black'
        );
    });

    it('renders the title with custom styling', () => {
        const testTitle = 'Custom Style Title';
        const customClass = 'text-center text-red-500';
        render(<ModalTitle title={testTitle} className={customClass} />);

        const titleElement = screen.getByText(testTitle);
        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveClass(customClass);
    });
});
