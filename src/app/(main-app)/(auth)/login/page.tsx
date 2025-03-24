'use client';

import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '@/app/componets/common/InputField/InputField';
import { Button } from '@/app/componets/common/Button/Button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/app/componets/common/toast/ToastContext';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().trim().required('Password is required'),
});

export default function LoginPage() {
  const router = useRouter();

  const initialValues = {
    email: '',
    password: '',
  };

  const { showToast } = useToast();

  const handleSubmit = async (
    values: { email: string; password: string },
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setErrors: (errors: any) => void;
    }
  ) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        showToast(
          'Invalid Login details. Please enter  your correct email and password',
          'error',
          {
            className: 'custom-toast',
          }
        );
      } else {
        router.refresh(); // This triggers a re-evaluation of the middleware
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('An error occurred during login', 'error');

      // setErrors({ password: 'An error occurred during login' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="w-full flex flex-col gap-[32px] row-start-2 text-br sm:items-start">
      <div className="flex flex-col gap-[3px]">
        <h2 className="text-[24px] text-brand-primary font-semibold p-0">
          Welcome Back!
        </h2>
        <p className="text-base text-brand-secondary">
          Use Inqlo to keep your mail box safe. Dont have an account yet?{' '}
          <Link href="/register" className="text-blue-400">
            Create an account
          </Link>
        </p>
      </div>
      <div className="w-full text-4xl text-gray-200">
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
              !!errors.email ||
              !!errors.password ||
              !values.email ||
              !values.password;
            return (
              <Form className="w-full max-w-sm">
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
                  className="!mb-[12]"
                />
                <div className="flex flex-col w-full justify-items-end text-base items-end underline text-blue-400">
                  <Link href="/forgot-password">Forgot password?</Link>
                </div>
                <Button
                  label={isSubmitting ? 'Processing...' : 'Login'}
                  type="submit"
                  className="mt-4"
                  disabled={isButtonDisabled}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
    </main>
  );
}
