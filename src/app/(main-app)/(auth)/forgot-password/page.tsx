'use client';

import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { InputField } from '@/app/componets/common/InputField/InputField';
import { Button } from '@/app/componets/common/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { forgotPassword } from '@/app/lib/api-client-services/auth';
import { useApiErrorHandler } from '@/app/hooks/useApiErrorHandler';
import useCookie from '@/app/hooks/useCookie';
import AuthFormWrapper from '../components/AuthFormWrapper/AuthFormWrapper';

// Types
export interface ForgotPasswordValues {
  email: string;
}

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('*Invalid email address')
    .required('*Email is required'),
});

export default function LoginPage() {
  const router = useRouter();
  const { handleApiError } = useApiErrorHandler();
  const { set: setEmail } = useCookie('vr_e');

  const initialValues: ForgotPasswordValues = {
    email: '',
  };

  // Set cookie
  const handleCookie = (email: string) => {
    setEmail(email);
  };

  // Handle form submission
  const handleSubmit = async (
    values: ForgotPasswordValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordValues>
  ) => {
    try {
      const payload = {
        email: values.email,
      };
      const res = await forgotPassword(payload);
      if (res.status === 200) {
        handleCookie(payload.email);

        router.push('/reset-password');
      }
    } catch (error: unknown) {
      handleApiError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthFormWrapper
      mainTitle="Forgot Password"
      subContent={`Enter the email address associated with your account`}
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
                id="email"
                label="Email"
                type="email"
                onBlur={handleBlur}
                placeholder="Enter your email"
                value={values.email}
                onChange={(e) => setFieldValue('email', e.target.value)}
                error={touched.email && errors.email ? errors.email : ''}
              />
              <Button
                label={isSubmitting ? 'Processing...' : 'Recover Password'}
                type="submit"
                className="mb-[10px]"
                disabled={isButtonDisabled}
              />
              <div className="flex flex-col w-full justify-items-end text-base items-center  font-medium text-blue-400">
                <Link href="/login">Back to Log in</Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </AuthFormWrapper>
  );
}
