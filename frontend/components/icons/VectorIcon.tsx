import React from "react";
type VectorIconProps = {
  className?: string;
};

export default function VectorIcon({ className = "w-6 h-6" }: VectorIconProps) {
  return (
    <svg
      className={className} 
      width="109"
      height="60"
      viewBox="0 0 109 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="60" height="60" rx="30" fill="#96BFFF" fill-opacity="0.67"/>
        <path d="M15 21L25.125 31.125L31.554 24.696C34.7174 27.1054 36.9896 30.4985 38.013 34.341L39.177 38.688M39.177 38.688L43.95 30.4215M39.177 38.688L30.9105 33.915" stroke="#FCFDFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="49" width="60" height="60" rx="30" fill="#2D76E9"/>
        <path d="M64.375 39L74.5 28.875L80.959 35.334C82.8264 31.6533 85.9068 28.7297 89.68 27.057L93.79 25.227M93.79 25.227L84.88 21.8055M93.79 25.227L90.37 34.137" stroke="#FEFCFB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}