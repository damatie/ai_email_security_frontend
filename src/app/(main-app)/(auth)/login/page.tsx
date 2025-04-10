/* eslint-disable react/no-unescaped-entities */
'use client';

import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { InputField } from '@/app/components/common/InputField/InputField';
import { Button } from '@/app/components/common/Button/Button';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useApiErrorHandler } from '@/app/hooks/useApiErrorHandler';
import AuthFormWrapper from '../components/AuthFormWrapper/AuthFormWrapper';
import { resendVerificationEmail } from '@/app/lib/api-client-services/Auth/auth';
import { useNextAuthErrorHandler } from '@/app/hooks/useNextAuthErrorHandler ';
import useCookie from '@/app/hooks/useCookie';

// Types
interface LoginValues {
  email: string;
  password: string;
}

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('*Invalid email address')
    .required('*Email is required'),
  password: Yup.string().trim().required('*Password is required'),
});

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();
  const { handleApiError } = useApiErrorHandler();
  const { handleNextAuthError } = useNextAuthErrorHandler();
  const { set: setEmail } = useCookie('vr_e');

  const initialValues: LoginValues = {
    email: '',
    password: '',
  };
  // Next auth loading status
  const isLoading = status === 'loading';

  // Set cookie
  const handleCookie = (email: string) => {
    setEmail(email);
  };

  // Handle form submission
  const handleSubmit = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    try {
      const payload = {
        email: values.email,
      };
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        const errCode = handleNextAuthError(result?.error);

        if (errCode === 403) {
          const res = await resendVerificationEmail(payload);
          if (res.status === 200) {
            handleCookie(payload.email);
            router.push('/verify-email');
          }
        }
      } else {
        router.refresh(); // This triggers a re-evaluation of the middleware
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthFormWrapper
      mainTitle=" Welcome Back!"
      subContent={
        <>
          Use Inqlo to keep your mail box safe. Don't have an account yet?{' '}
          <Link href="/register" className="text-blue-400 font-medium">
            Create an account
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
            isLoading ||
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
                id="password"
                label="Password"
                type="password"
                onBlur={handleBlur}
                placeholder="Enter your password"
                value={values.password}
                onChange={(e) => setFieldValue('password', e.target.value)}
                toggleablePassword={true}
                error={
                  touched.password && errors.password ? errors.password : ''
                }
                className="!mb-[10px]"
              />
              <div className="flex flex-col w-full justify-items-end text-base items-end underline font-medium text-blue-400">
                <Link href="/forgot-password">Forgot password?</Link>
              </div>
              <Button
                label={isSubmitting || isLoading ? 'Processing...' : 'Login'}
                type="submit"
                className="mt-4"
                disabled={isButtonDisabled}
              />
            </Form>
          );
        }}
      </Formik>
    </AuthFormWrapper>
  );
}
