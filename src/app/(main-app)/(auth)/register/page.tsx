'use client';

import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useApiErrorHandler } from '@/app/hooks/useApiErrorHandler';
import useCookie from '@/app/hooks/useCookie';
import AuthFormWrapper from '../components/AuthFormWrapper/AuthFormWrapper';
import { InputField } from '@/app/components/common/InputField/InputField';
import { Button } from '@/app/components/common/Button/Button';
import { creatAccount } from '@/app/lib/api-client-services/Auth/auth';
import Link from 'next/link';

// Types
export interface CreateAccountValues {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('*Invalid email address')
    .required('*Email is required'),
  first_name: Yup.string().trim().required('*First name is required'),
  last_name: Yup.string().trim().required('*Last name is required'),
  password: Yup.string()
    .trim()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      'Password must include lowercase, uppercase, and number'
    ),
});

export default function CreateAccountPage() {
  const router = useRouter();
  const { handleApiError } = useApiErrorHandler();
  const { set: setEmail } = useCookie('vr_e');

  // Initial form values
  const initialValues: CreateAccountValues = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  };

  // Set cookie
  const handleCookie = (email: string) => {
    setEmail(email);
  };

  // Handle form submission
  const handleSubmit = async (
    values: CreateAccountValues,
    { setSubmitting }: FormikHelpers<CreateAccountValues>
  ) => {
    try {
      const payload = {
        ...values,
      };
      const res = await creatAccount(payload);
      if (res.status === 201) {
        handleCookie(payload.email);

        router.push('/verify-email');
      }
    } catch (error: unknown) {
      handleApiError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthFormWrapper
      mainTitle="Reset Password"
      subContent={
        <>
          Use Inqlo to keep you mail box safe. Already have an account{' '}
          <Link href="/login" className="text-blue-400 font-medium">
            Login
          </Link>
        </>
      }
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
              <InputField
                id="first_name"
                label="First Name"
                type="text"
                onBlur={handleBlur}
                placeholder="Enter first name"
                value={values.first_name}
                onChange={(e) => setFieldValue('first_name', e.target.value)}
                error={
                  touched.first_name && errors.first_name
                    ? errors.first_name
                    : ''
                }
              />
              <InputField
                id="last_name"
                label="Last Name"
                type="text"
                onBlur={handleBlur}
                placeholder="Enter last name"
                value={values.last_name}
                onChange={(e) => setFieldValue('last_name', e.target.value)}
                error={
                  touched.last_name && errors.last_name ? errors.last_name : ''
                }
              />
              <InputField
                id="password"
                label="Password"
                type="password"
                onBlur={handleBlur}
                placeholder="Enter password"
                value={values.password}
                onChange={(e) => setFieldValue('password', e.target.value)}
                toggleablePassword
                error={
                  touched.password && errors.password ? errors.password : ''
                }
              />
              <Button
                label={isSubmitting ? 'Processing...' : 'Create Account'}
                type="submit"
                className="mt-4 w-full"
                disabled={isButtonDisabled}
              />
            </Form>
          );
        }}
      </Formik>
    </AuthFormWrapper>
  );
}
