// modern_ui_page.tsx
"use client";
import React from "react";
import Image from "next/image";
import nextJsLogo from "/public/nextjs-logo.png";
import { useRouter } from "next/navigation";

const AboutPage = () => {

  const router = useRouter();

  const handleSignUp = () => {
    router.push("/signup"); // Redirects to the signup page
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="flex justify-start mb-4">
          <Image src={nextJsLogo} alt="Next.js Logo" width={150} height={150} />
        </div>
        <h1 className="text-2xl font-bold italic text-gray-800 dark:text-gray-200 mb-4">
          Email Authentication System
        </h1>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm italic mb-4">
          This project is an advanced email authentication system designed to
          provide users with a seamless and secure SignUp and Login experience.
        </p>
        <div className="flex ">
          <button
            onClick={handleSignUp}
            className="px-6 py-2 bg-gray-800 text-white border border-blue-500 rounded-md shadow-lg dark:bg-gray-900 dark:border-neon-blue hover:bg-blue-500 hover:text-white focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-neon-blue transition-all duration-300 transform hover:scale-105"
          >
            Go to Sign-Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
