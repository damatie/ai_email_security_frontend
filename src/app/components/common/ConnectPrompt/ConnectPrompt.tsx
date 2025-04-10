'use client';

import { Button } from '../Button/Button';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';

export function ConnectPrompt() {
  const router = useRouter();

  return (
    <main className=" animate-fade-up flex flex-col w-full max-w-[520px]  h-full  md:h-[500px] justify-center p-6 mx-auto text-center items-center">
      <div className="w-20 h-20 bg-gray-200 rounded-full mb-6 p-5">
        <Icon
          icon="oui:email"
          className={`h-full w-full  animate-bounce `}
          aria-hidden="true"
        />
      </div>
      <h2 className="text-2xl font-bold mb-1 text-center text-brand-primary">
        Connect your email to get started
      </h2>
      <p className=" text-base text-brand-secondary mb-4">
        To protect your inbox from phishing and other threats, connect your
        email account first.
      </p>
      <Button
        variant="primary"
        label="Connect Email"
        className="!h-auto !font-normal"
        customVariantClasses={{
          primary:
            'bg-brand-primary   max-w-fit text-white py-2 px-4 rounded-md hover:bg-brand-primary-light transition-colors',
        }}
        onClick={() => router.push('/dashboard/connect')}
      ></Button>
    </main>
  );
}
