import Link from "next/link";
import React from "react";
import Appbar from "@/app/components/Appbar";
const Header: React.FC = () => {
  return (
    <header className="bg-black shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-blue-600">
            {" "}
            <Link href="/" className=" hover:text-white ">
              EAGLE EYE
            </Link>
          </div>
          <nav className="ml-10 space-x-4">
            <Link
              href="/Intensive-Data"
              className="text-yellow-500 hover:text-white"
            >
              Intensive Data
            </Link>
          </nav>
        </div>

        <div>
          <Appbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
