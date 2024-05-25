import React from 'react'

interface CustomTitleProps {
    title: string;
    className?: string;
}
const ModalTitle = ({ title, className = 'flex justify-center items-center font-semibold text-2xl text-black' }: CustomTitleProps) => {
    return (
        <div className={className}>{title}</div>
    )
}

export default ModalTitle