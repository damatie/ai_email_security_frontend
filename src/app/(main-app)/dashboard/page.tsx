'use client';

import { signOut } from 'next-auth/react';

export default function Overview() {
  const handleLogout = async () => {
    // Optionally, specify a callback URL to redirect after logout
    await signOut({ callbackUrl: '/login' });
  };

  return (
    <main className="  h-screen bg-amber-200 text-center">
      <h2 className="text-2xl">This is the Overview page</h2>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white cursor-pointer px-4 py-2 rounded"
      >
        Logout
      </button>
    </main>
  );
}
