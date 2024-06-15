import React from 'react';
import { render, screen } from '@testing-library/react';
import { TabPanel, a11yProps } from './TabComponents';
import { Typography } from '@mui/material';

describe('TabPanel', () => {
    const childText = 'Test Child Content';

    it('renders the children only when value matches index', () => {
        const { rerender } = render(
            <TabPanel value={0} index={0}>
                <Typography>{childText}</Typography>
            </TabPanel>
        );

        // Check if children are rendered
        expect(screen.getByText(childText)).toBeInTheDocument();

        // Re-render with non-matching value and index
        rerender(
            <TabPanel value={1} index={0}>
                <Typography>{childText}</Typography>
            </TabPanel>
        );

        // Children should not be visible
        expect(screen.queryByText(childText)).not.toBeInTheDocument();
    });

    it('sets proper accessibility attributes', () => {
        const index = 0;
        render(<TabPanel value={index} index={index} {...a11yProps(index)} />);

        const tabPanel = screen.getByRole('tabpanel', { hidden: true });
        expect(tabPanel).toHaveAttribute('id', `simple-tab-${index}`);
        expect(tabPanel).toHaveAttribute(
            'aria-labelledby',
            `simple-tab-${index}`
        );
    });

    it('applies hidden attribute correctly based on value and index', () => {
        const { rerender } = render(
            <TabPanel value={1} index={0}>
                <div>Content</div>
            </TabPanel>
        );

        // The tab panel should be hidden because value does not match index
        expect(screen.getByRole('tabpanel', { hidden: true })).toHaveAttribute(
            'hidden'
        );

        // Rerender with matching value and index
        rerender(
            <TabPanel value={0} index={0}>
                <div>Content</div>
            </TabPanel>
        );

        // Now the tab panel should be visible
        expect(
            screen.getByRole('tabpanel', { hidden: true })
        ).not.toHaveAttribute('hidden');
    });
});
