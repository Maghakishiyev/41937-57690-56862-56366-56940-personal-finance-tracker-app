import { render, screen } from '@testing-library/react';
import { MainSection } from './MainSection';
import '@testing-library/jest-dom';

describe('MainSection', () => {
    beforeEach(() => {
        render(<MainSection />);
    });

    it('renders the main headings', () => {
        expect(screen.getByText('CashTrack')).toBeInTheDocument();
        expect(
            screen.getByText('Efficient Money')
        ).toBeInTheDocument();
        expect(
            screen.getByText('Total money spent for the period')
        ).toBeInTheDocument();
    });

    it('renders the sign-in and sign-up links', () => {
        expect(screen.getByText('Sign In Now!')).toHaveAttribute(
            'href',
            '/login'
        );
        expect(screen.getByText('Sign Up')).toBeInTheDocument(); // This checks for text; further testing would be needed to verify the Link component functionality
    });

    it('renders the consumptions correctly', () => {
        const consumptions = ['Groceries', 'Medicine', 'Restaurants & Food'];
        consumptions.forEach((consumption) => {
            expect(screen.getByText(consumption)).toBeInTheDocument();
        });
    });

    it('renders the image with correct props', () => {
        const image = screen.getByAltText('graph');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute(
            'src',
            expect.stringContaining('component2.png')
        );
    });

    it('renders dropdown with correct default year selected', () => {
        const select = screen.getByDisplayValue('Period: 2024');
        expect(select).toBeInTheDocument();
    });
});
