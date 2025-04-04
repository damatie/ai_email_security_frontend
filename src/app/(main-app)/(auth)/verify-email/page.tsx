'use client';

import React, { useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useApiErrorHandler } from '@/app/hooks/useApiErrorHandler';
import useCookie from '@/app/hooks/useCookie';
import {
  resendVerificationEmail,
  verifyEmail,
} from '@/app/lib/api-client-services/auth';
import AuthFormWrapper from '../components/AuthFormWrapper/AuthFormWrapper';
import { InputField } from '@/app/components/common/InputField/InputField';
import { Button } from '@/app/components/common/Button/Button';
import { FeedbackCard } from '@/app/components/common/FeedbackCard/FeedbackCard';
import clockIcon from '../../../../../public/icons/clock.svg';
import { ResendButton } from './logic/ResendButton';

// Types
export interface VerifyEmailValues {
  otp: string;
}

// Validation Schema
const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .trim()
    .required('OTP is required')
    .matches(/^\d+$/, 'OTP must contain only numbers'),
});

export default function VerifyEmailPage() {
  const router = useRouter();
  const { handleApiError } = useApiErrorHandler();
  const { value: email, remove: removeEmail } = useCookie('vr_e');
  const [verifyEmailSession, setVerifyEmailSession] = useState<boolean>(false);

  if (!email && !verifyEmailSession) {
    return (
      <FeedbackCard
        Icon={clockIcon}
        title=" Session Not Found"
        subTitle="You dont have any active email verification session"
        label="Back to Login"
        nextAction={() => {
          router.push('/login');
        }}
      />
    );
  }

  // Check for successful verify email scenario
  if (verifyEmailSession) {
    return (
      <FeedbackCard
        title="Email Verification Successful"
        subTitle="Your email has been verified successfully"
        label="Back to Login"
        nextAction={() => {
          setVerifyEmailSession(false);
          router.push('/login');
        }}
      />
    );
  }

  // Initial form values
  const initialValues: VerifyEmailValues = {
    otp: '',
  };

  // Handle form submission
  const handleSubmit = async (
    values: VerifyEmailValues,
    { setSubmitting }: FormikHelpers<VerifyEmailValues>
  ) => {
    try {
      if (!email) {
        throw new Error('Email is required');
      }

      const payload = {
        ...values,
        email,
      };

      const res = await verifyEmail(payload);

      if (res.status === 200) {
        removeEmail();
        setVerifyEmailSession(true);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle resend code
  const handleResendCode = async () => {
    try {
      const res = await resendVerificationEmail({ email });
      return res?.status === 200;
    } catch (err) {
      console.error('Resend email failed:', err);
      return false;
    }
  };

  return (
    email && (
      <AuthFormWrapper
        mainTitle="Verify Email"
        subContent=" We have sent a verification code to your email address, input the
              code below to continue."
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
                <Button
                  label={isSubmitting ? 'Processing...' : 'Verify Email'}
                  type="submit"
                  className=" w-full"
                  disabled={isButtonDisabled}
                />

                <div className=" text-center w-full">
                  <ResendButton onResend={handleResendCode} cooldownTime={60} />
                </div>
              </Form>
            );
          }}
        </Formik>
      </AuthFormWrapper>
    )
  );
}
