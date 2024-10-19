'use client';
import Link from 'next/link';
import image from './logo.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    setIsLoggedIn(!!userID);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userID');
    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-blue-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2">
              <Image src={image} alt="HLink" className="h-8" />
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-200 text-red-600 font-bold px-4 py-2 rounded hover:bg-red-600 hover:text-white"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login">
                  <button className="bg-blue-200 text-blue-600 font-bold px-4 py-2 rounded hover:bg-blue-600 hover:text-white">
                    Login
                  </button>
                </Link>
              )}
            </a>
          </div>
          <div className="flex space-x-8">
            <a href="/digital-card-issuance" className="text-gray-500 hover:text-blue-600 flex items-center">
              <span className="inline-block ml-1">My Profile</span>
            </a>
            <a href="/appointment-management" className="text-gray-500 hover:text-blue-600 flex items-center">
              <span className="inline-block ml-1">Appointments</span>
            </a>
            <a href="/recode-management" className="text-gray-500 hover:text-blue-600 flex items-center">
              <span className="inline-block ml-1">My Medical Records</span>
            </a>
            <a href="/payment-management" className="text-gray-500 hover:text-blue-600 flex items-center">
              <span className="inline-block ml-1">My Payment History</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
