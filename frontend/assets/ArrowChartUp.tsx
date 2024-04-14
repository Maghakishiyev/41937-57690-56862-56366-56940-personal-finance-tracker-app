import React from 'react';

export interface IArrowChartUp {
    className?: string;
    fillColor?: string;
}

export const ArrowChartUp: React.FC<IArrowChartUp> = ({
    className = 'w-6 h-6 flex-shrink-0',
    fillColor = 'currentColor',
}) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke={fillColor}
            className={className}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941'
            />
        </svg>
    );
};
