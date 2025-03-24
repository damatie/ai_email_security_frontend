'use client';
import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';
import showPwd from '../../../../../public/icons/show.svg';
import hidePwd from '../../../../../public/icons/hide.svg';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
  showLabel?: boolean;
  toggleablePassword?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      id,
      label,
      type = 'text',
      placeholder,
      value,
      error,
      className = '',
      toggleablePassword = false,
      ...props
    },
    ref
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const isPasswordField = type === 'password';
    const inputType =
      isPasswordField && toggleablePassword && passwordVisible ? 'text' : type;

    const handleTogglePassword = () => {
      setPasswordVisible((prev) => !prev);
    };

    return (
      <div className={`mb-4 ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="block text-brand-secondary font-semibold mb-2 text-base"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            {...props}
            ref={ref}
            id={id}
            type={inputType}
            placeholder={placeholder}
            value={value}
            className="w-full px-3 py-2 border h-[48px] text-base text-brand-secondary border-gray-300 rounded-[6px] focus:ring-1 focus:outline-none focus:border-brand-primary"
          />
          {isPasswordField && toggleablePassword && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute inset-y-0 right-0 flex items-center  px-3 text-gray-200 focus:outline-none focus:text-brand-primary"
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              tabIndex={0}
            >
              {passwordVisible ? (
                <Image
                  src={hidePwd}
                  alt="Logo"
                  className=" object-contain h-4 w-4"
                />
              ) : (
                <Image
                  src={showPwd}
                  alt="Logo"
                  className=" object-contain h-4 w-4"
                />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-1 text-[12px]">{error}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
