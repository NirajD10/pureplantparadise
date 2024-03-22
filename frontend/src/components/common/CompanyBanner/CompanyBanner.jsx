import React from "react";
import { HandCoins, Sparkle, ChartLineUp } from "@phosphor-icons/react";
import businessbannerimage from "@/assets/Images/plants/plants_business.jpg";

function CompanyBanner() {
  return (
    <div className="bg-bgprimary rounded-2xl grid grid-cols-1 lg:grid-cols-2 my-16 lg:my-24 overflow-hidden">
      <div className="flex flex-col justify-center items-center px-3">
        <p className="font-normal text-3xl sm:text-7xl mt-5 mb-8 text-center text-whiteprimary">
          Why you should buy <br />
          at Pureplantparadise?
        </p>
        <div className="flex flex-row justify-center content-center">
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-center mb-6 lg:my-0">
            <div className="w-56 md:w-32 flex flex-row gap-6 md:gap-0 md:flex-col items-center">
              <div className="w-[64px] bg-whiteprimary py-3 rounded-full flex flex-row justify-center items-center">
                <HandCoins size={42} color="#003e29" />
              </div>
              <p className="font-bold text-base sm:text-lg my-2 text-whiteprimary text-center">
                Low price
              </p>
            </div>
            <div className="w-56 md:w-32 flex flex-row gap-4 md:gap-0 md:flex-col items-center">
              <div className="w-[64px] bg-whiteprimary py-3 rounded-full flex flex-row justify-center items-center">
                <Sparkle size={42} color="#003e29" />
              </div>
              <p className="font-bold text-base sm:text-lg my-2 text-whiteprimary text-center truncate">
                Happy Customer
              </p>
            </div>
            <div className="w-56 md:w-32 flex flex-row gap-6 md:gap-0 md:flex-col items-center">
              <div className="w-[64px] bg-whiteprimary py-3 rounded-full flex flex-row justify-center items-center">
                <ChartLineUp size={42} color="#003e29" />
              </div>
              <p className="font-bold text-base sm:text-lg my-2 text-whiteprimary text-center">
                10k+ Sales
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img
          src={businessbannerimage}
          alt="PurePlantsParadise Benefits"
          height={375}
        />
      </div>
    </div>
  );
}

export default CompanyBanner;
