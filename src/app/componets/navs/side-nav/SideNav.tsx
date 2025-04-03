'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { menuItems } from './exportData';
import mainLogo from '../../../../../public/img/logo-inverted.svg';

interface SideNavProps {
  isMobileMenuOpen: boolean;
}

const SideNav: React.FC<SideNavProps> = ({ isMobileMenuOpen }) => {
  const pathname = usePathname();
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <div
      className={`flex flex-col h-screen w-[267px]   bg-brand-primary text-white fixed left-0 top-0 z-10 transition-all ${
        isMobileMenuOpen ? 'translate-x-0 z-40' : '-translate-x-full'
      } xl:translate-x-0 xl:w-[255px]`}
    >
      <div className="flex flex-col p-8 border-b border-brand-primary-light items-center justify-center">
        <Image src={mainLogo} alt="Logo" className="object-contain" />
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <nav className="mt-8 px-3">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className={`flex items-center px-4 py-3 rounded-md text-base  ${
                    pathname === item.path
                      ? ' text-blue-300 font-semibold  bg-brand-primary-light  '
                      : 'text-gray-300 hover:bg-brand-primary-light '
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="p-2 border-t border-brand-primary-light">
        <Link
          href="/profile"
          className="flex items-center px-2 py-2 rounded-md text-white "
        >
          <Icon icon="solar:settings-outline" className="h-6 w-6 mr-3" />
          <span>Settings</span>
        </Link>
      </div>
      <div className="p-4 border-t   border-brand-primary-light">
        <div className="flex items-center justify-between  w-full px-0 py-3 rounded-md text-gray-300 hover:bg-sidebar-hover transition-colors">
          <div className=" flex flex-row items-center">
            <div className="w-10 h-10 rounded-full bg-brand-primary-light flex items-center justify-center mr-3">
              <span className="font-semibold text-sm">EM</span>
            </div>
            <div className=" flex flex-col items-start">
              <span className=" text-sm">Edafe maxwell</span>
              <span className=" text-xs font-medium text-brand-green">
                Acive
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className=" text-gray-300 cursor-pointer"
          >
            <Icon
              icon="material-symbols-light:logout-rounded"
              className="h-6 w-6 "
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
