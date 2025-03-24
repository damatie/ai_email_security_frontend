'use client';
import React from 'react';

export interface ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button({
  label,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full bg-brand-primary hover:bg-brand-primary-light font-semibold h-[48px] text-gray-200 text-base py-2 px-4 rounded-[6px] 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {label}
    </button>
  );
}
