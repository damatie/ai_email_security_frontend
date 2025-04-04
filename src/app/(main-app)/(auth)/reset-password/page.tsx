'use client';

import React, { useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useApiErrorHandler } from '@/app/hooks/useApiErrorHandler';
import useCookie from '@/app/hooks/useCookie';
import { resetPassword } from '@/app/lib/api-client-services/auth';
import AuthFormWrapper from '../components/AuthFormWrapper/AuthFormWrapper';
import { InputField } from '@/app/components/common/InputField/InputField';
import { Button } from '@/app/components/common/Button/Button';
import { FeedbackCard } from '@/app/components/common/FeedbackCard/FeedbackCard';
import clockIcon from '../../../../../public/icons/clock.svg';

// Types
export interface ResetPasswordValues {
  otp: string;
  new_password: string;
  password_confirmation: string;
}

// Validation Schema
const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .trim()
    .required('OTP is required')
    .matches(/^\d+$/, 'OTP must contain only numbers'),
  new_password: Yup.string()
    .trim()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      'Password must include lowercase, uppercase, and number'
    ),
  password_confirmation: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('new_password')], 'Passwords must match'),
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const { handleApiError } = useApiErrorHandler();
  const { value: email, remove: removeEmail } = useCookie('vr_e');

  const [resetPasswordSession, setResetPasswordSession] =
    useState<boolean>(false);

  if (!email && !resetPasswordSession) {
    return (
      <FeedbackCard
        Icon={clockIcon}
        title="Session Not Found"
        subTitle="You dont have any active reset password session"
        label="Back to Login"
        nextAction={() => {
          router.push('/login');
        }}
      />
    );
  }

  // Check for successful password reset scenario
  if (resetPasswordSession) {
    return (
      <FeedbackCard
        title="Password Reset Successful"
        subTitle="Your password has been reset successfully"
        label="Back to Login"
        nextAction={() => {
          setResetPasswordSession(false);
          router.push('/login');
        }}
      />
    );
  }

  // Initial form values
  const initialValues: ResetPasswordValues = {
    otp: '',
    new_password: '',
    password_confirmation: '',
  };

  // Handle form submission
  const handleSubmit = async (
    values: ResetPasswordValues,
    { setSubmitting }: FormikHelpers<ResetPasswordValues>
  ) => {
    try {
      if (!email) {
        throw new Error('Email is required');
      }

      const payload = {
        ...values,
        email,
      };

      const res = await resetPassword(payload);

      if (res.status === 200) {
        removeEmail();
        setResetPasswordSession(true);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    email && (
      <AuthFormWrapper
        mainTitle="Reset Password"
        subContent="We have sent a password reset code to your email address. 
        Please enter the code below to submit your new password."
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleBlur,
            isSubmitting,
          }) => {
            const isButtonDisabled =
              isSubmitting ||
              Object.keys(errors).length > 0 ||
              Object.values(values).some((value) => !value);

            return (
              <Form className="w-full">
                <InputField
                  id="otp"
                  label="Enter OTP"
                  type="text"
                  onBlur={handleBlur}
                  placeholder="Enter OTP"
                  value={values.otp}
                  onChange={(e) => setFieldValue('otp', e.target.value)}
                  error={touched.otp && errors.otp ? errors.otp : ''}
                />
                <InputField
                  id="new_password"
                  label="New Password"
                  type="password"
                  onBlur={handleBlur}
                  placeholder="Enter new password"
                  value={values.new_password}
                  onChange={(e) =>
                    setFieldValue('new_password', e.target.value)
                  }
                  toggleablePassword
                  error={
                    touched.new_password && errors.new_password
                      ? errors.new_password
                      : ''
                  }
                />
                <InputField
                  id="password_confirmation"
                  label="Confirm Password"
                  type="password"
                  onBlur={handleBlur}
                  placeholder="Confirm new password"
                  value={values.password_confirmation}
                  onChange={(e) =>
                    setFieldValue('password_confirmation', e.target.value)
                  }
                  toggleablePassword
                  error={
                    touched.password_confirmation &&
                    errors.password_confirmation
                      ? errors.password_confirmation
                      : ''
                  }
                />
                <Button
                  label={isSubmitting ? 'Processing...' : 'Reset Password'}
                  type="submit"
                  className="w-full"
                  disabled={isButtonDisabled}
                />
              </Form>
            );
          }}
        </Formik>
      </AuthFormWrapper>
    )
  );
}
