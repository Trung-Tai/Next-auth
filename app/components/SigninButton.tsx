"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  if (session && session.user) {
    return (
      <div className="relative ml-auto">
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 text-white-600 hover:text-yellow-300"
        >
          <span>{session.user.name || session.user.username}</span>
          <svg
            className={`w-4 h-4 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg">
            <div className="p-4">
              <Link href="/watchlist">
                <span className="block px-4 py-2 hover:bg-gray-700">
                  List Follow
                </span>
              </Link>
              <button
                onClick={() => signOut()}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button className="text-white-600 ml-auto">
      <Link href="/sign-in">
        <span>Sign In</span>
      </Link>
    </button>
  );
};

export default SigninButton;
