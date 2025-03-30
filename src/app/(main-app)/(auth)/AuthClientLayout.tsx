'use client';

import Image from 'next/image';
import mainImg from '../../../../public/img/auth-image.png';
import mainLogo from '../../../../public/img/logo.svg';

export default function AuthClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-row w-full md:min-h-screen">
      <div className="flex flex-col w-full bg-white px-7 pt-10 md:px-[65px] md:pt-[65px] items-center">
        <section className="flex flex-col w-full max-w-[600px]">
          <Image src={mainLogo} alt="Logo" className="object-contain" />
        </section>
        <section className="flex flex-col justify-items-center items-center w-full  md:max-w-[420px] mt-12 md:mt-[120px] lg:mt-[157px]">
          {children}
        </section>
      </div>
      <section className="w-full bg-brand-primary hidden lg:flex lg:flex-col max-w-[871px] lg:items-end lg:justify-end">
        <Image
          src={mainImg}
          alt="Welcome picture"
          className="object-contain"
          height={649}
        />
      </section>
    </main>
  );
}
