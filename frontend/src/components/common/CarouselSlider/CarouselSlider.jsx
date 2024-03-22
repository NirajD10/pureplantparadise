import React, { useContext } from "react";
import banner1 from "@/assets/Banner/Banner1.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import "./splide-custom.css";
import { ShopContext } from "@/context/shop-context";

function CarouselSlider() {
  const ctx = useContext(ShopContext);
  return (
    <Splide
      options={{
        rewind: true,
        autoplay: true,
        type: "fade",
        pauseOnHover: true,
        autoHeight: true,
      }}
      aria-label="Banner"
      className="my-12"
    >
     {ctx?.data?.home_banner_url.map((imageUrl, index) => (
        <React.Fragment key={index}>
          <SplideSlide>
            <img
              src={imageUrl}
              height={628}
              width={1200}
              alt={`banner${index}`}
              className="bg-fixed rounded-2xl"
            />
          </SplideSlide>
        </React.Fragment>
      ))}
    </Splide>
  );
}

export default CarouselSlider;
