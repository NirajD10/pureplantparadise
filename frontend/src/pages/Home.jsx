import React from "react";

import CarouselSlider from "@/components/common/CarouselSlider/CarouselSlider";
import Features from "@/components/common/Features/Features";
import CategoriesList from "@/components/common/CategoriesList/CategoriesList";
import CompanyBanner from "../components/common/CompanyBanner/CompanyBanner";
import Testimonial from "../components/common/Testimonial/Testimonial";
import LastestSellingProducts from "../components/common/Products/LastestSellingProducts";
import ShopProvider from "../context/shop-context";

function Home() {
  return (
    <main className="container my-10 px-4 sm:px-0 md:px-4">
      <ShopProvider>
        <CarouselSlider />
        <Features />
        <CategoriesList />
        {/* <BestSellingProducts /> */}
        <LastestSellingProducts />
        <CompanyBanner />
        <Testimonial />
      </ShopProvider>
    </main>
  );
}

export default Home;
