'use client';
import React from 'react';
import image from './images/image.jpg';
import Image from 'next/image';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="landing-page bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen flex items-center justify-center">
      {/* Main Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 p-12 bg-white shadow-xl rounded-3xl max-w-6xl mx-auto transform hover:scale-105 transition duration-500 ease-in-out">
        
        {/* Text Content */}
        <div className="space-y-6 flex flex-col justify-center">
          <h1 className="text-6xl font-extrabold text-gray-800 leading-tight tracking-tight">
            Welcome to <span className="text-blue-600">HealthLink</span>
          </h1>
          <h2 className="text-4xl text-blue-600">Smart Health Care System</h2>
          <p className="text-lg text-gray-600">
            Your Health, Our Priority
          </p>
          <p className="text-gray-500 leading-relaxed">
            Comprehensive Care at Your Fingertips. Explore our wide range of services, from primary care and specialty treatments to modern healthcare management tools.
          </p>
            <Link href="/login">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full shadow-lg transform hover:scale-110 transition duration-300">
              Get Started
              </button>
            </Link>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-[400px] md:h-[500px] flex justify-center items-center overflow-hidden rounded-3xl shadow-lg">
          <Image
            src={image}
            alt="Doctor"
            className="rounded-3xl object-cover"
            layout="fill"
            quality={100} 
            priority // Ensures the image loads faster
          />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
