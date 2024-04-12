import React from "react";
type PlusIconProps = {
  className?: string;
};

export default function PlusIcon({ className = "w-6 h-6" }: PlusIconProps) {
  return (
    <svg
      className={className} 
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4.5V19.5M19.5 12H4.5"
        stroke="#070707"
        strokeWidth="1.5" // Changed to camelCase
        strokeLinecap="round" // Changed to camelCase
        strokeLinejoin="round" // Changed to camelCase
      />
    </svg>
  );
}
