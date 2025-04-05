'use client';
import React from 'react';

export interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  /**
   * Override the default variant styling.
   * Provide an object with keys for each variant.
   * Example:
   * {
   *   primary: 'bg-green-500 hover:bg-green-600 text-white',
   *   outline: 'border border-green-500 text-green-500 hover:bg-green-100',
   * }
   */
  customVariantClasses?: Partial<
    Record<'primary' | 'outline' | 'ghost', string>
  >;
}

/**
 * Button component.
 *
 * This component supports three variants: "primary", "outline", and "ghost".
 * It can also be rendered as full width or auto width based on the `fullWidth` prop.
 *
 * The default styling for each variant is defined internally. To override these defaults,
 * you can pass in a `customVariantClasses` prop with your desired Tailwind class names.
 *
 * @example
 * // Default usage:
 * <Button label="Click Me" onClick={() => console.log('clicked')} />
 *
 * @example
 * // Custom usage (overriding primary variant):
 * <Button
 *   variant="primary"
 *   label="Custom Primary"
 *   customVariantClasses={{ primary: 'bg-green-500 hover:bg-green-600 text-white' }}
 *   onClick={() => console.log('Custom clicked')}
 * />
 */
export function Button({
  label,
  children,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  variant = 'primary',
  fullWidth = true,
  customVariantClasses,
}: ButtonProps) {
  // Base styling applied to every button
  const baseClasses =
    'font-semibold h-[48px] text-base py-2 px-4 rounded-md transition-colors duration-200';

  // Default styling for each variant
  const variantClasses = {
    primary: 'bg-brand-primary hover:bg-brand-primary-light text-gray-200',
    outline:
      'border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-gray-200',
    ghost: 'bg-transparent text-brand-primary hover:bg-gray-100',
  };

  // Use custom variant styling if provided, otherwise use default variant styling
  const computedVariantClasses =
    customVariantClasses && customVariantClasses[variant]
      ? customVariantClasses[variant]
      : variantClasses[variant];

  // Determine the width class based on the fullWidth prop
  const widthClass = fullWidth ? 'w-full' : 'w-auto';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${widthClass} ${baseClasses} ${computedVariantClasses} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      <div className="flex items-center justify-center gap-1">
        {/* If a label is provided, render it. */}
        {label && <span>{label}</span>}
        {/* Render any additional children (e.g., icons) */}
        {children}
      </div>
    </button>
  );
}
