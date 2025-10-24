'use client';

import React from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import { FiMenu, FiUser, FiLogOut } from 'react-icons/fi';

export const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useUser();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Frontend Builder
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/builder" className="text-gray-700 hover:text-blue-600">
              Builder
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-blue-600">
              Projects
            </Link>
            <Link href="/analytics" className="text-gray-700 hover:text-blue-600">
              Analytics
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2">
                <FiUser />
                <span className="text-sm">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600"
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
