import React from "react";
import Image from "next/image";
import NavLink from "./NavLink";

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
        <div className="max-w-xl mb-8 lg:mb-0">
          <h2 className="text-blue-600 font-semibold">SIGN UP TODAY</h2>
          <h1 className="text-5xl font-bold text-white mt-4">
            The World <span className="text-blue-600">Fastest Growing</span>{" "}
            Eagle Web
          </h1>
          <p className="text-gray-600 mt-4">
            Buy and sell 200+ cryptocurrencies with 20+ fiat currencies using
            bank transfers or your credit/debit card.
          </p>
        </div>
        <div className="hidden lg:block">
          <Image
            src="/images/card.png"
            alt="Card"
            className="h-96"
            width={600}
            height={600}
          />
        </div>
      </div>
      <h3>
        <main>
          <div className=" bg-gray-900 container mx-auto px-10 text-center">
            <div className="bg-gray-900 text-white min-h-screen p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
            </div>
          </div>
        </main>
      </h3>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-8">
          <div className="md:w-full lg:w-full w-full sm:w-1/2 xl:w-fit sm:px-16 py-6 sm:py-12 border-t sm:border-t xl:border-r border-[#DDDDDD]">
            <ul className="space-y-4">
              <NavLink name="Cryptocurrency" url="#" />
              <NavLink name="Exchanges" url="#" />
              <NavLink name="Watchlist" url="#" />
              <NavLink name="Portfolio" url="#" />
              <NavLink name="NFT" url="#" />
            </ul>
          </div>
          <div className="md:w-full lg:w-full lg:border-r w-full sm:w-1/2 xl:w-fit sm:px-16 py-6 sm:py-12 border-t sm:border-t xl:border-r border-[#DDDDDD]">
            <ul className="space-y-4">
              <NavLink name="Products" url="#" />
              <NavLink name="About Us" url="#" />
              <NavLink name="Careers" url="#" />
              <NavLink name="Blog" url="#" />
              <NavLink name="Security" url="#" />
            </ul>
          </div>
          <div className="md:w-full md:border-t lg:w-full w-full sm:w-1/2 xl:w-fit sm:px-16 py-6 sm:py-12 border-t sm:border-t-0 sm:border-r-0 border-[#DDDDDD]">
            <ul className="space-y-4">
              <NavLink name="Help Center" url="#" />
              <NavLink name="Contact Us" url="#" />
              <NavLink name="System Status" url="#" />
              <NavLink name="Area of Availability" url="#" />
              <NavLink name="Privacy Policy" url="#" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
