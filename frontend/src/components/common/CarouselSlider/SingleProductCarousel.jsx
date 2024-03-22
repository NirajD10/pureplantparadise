import React, { useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./splide-custom.css";

const prope = {
  img_one:
    "https://images.creativefabrica.com/products/previews/2023/05/11/zZEZKFvQo/2Pdr8is8AS0vymhPaFPB1WOZ7DF-desktop.jpg",
  img_two:
    "https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111-1500x1000.jpg",
  img_alt: "image_alt",
};

function SingleProductCarousel({ media, alt }) {
  const mainRef = useRef(null);
  const thumbnailsRef = useRef();

  useEffect(() => {
    if (
      mainRef.current &&
      thumbnailsRef.current &&
      thumbnailsRef.current.splide
    ) {
      mainRef.current.sync(thumbnailsRef.current.splide);
    }
  }, []);
  return (
    <div className="flex flex-col items-center px-4">
      <Splide
        aria-label="product-carousel"
        options={{
          type: "loop",
          gap: "1rem",
          pagination: false,
          width: "38rem",
          height: "34rem",
        }}
        ref={mainRef}
        className="mb-4 rounded-lg"
      >
        {media?.map((img, index) => (
          <SplideSlide key={index}>
            <img src={img} alt={alt} className="bg-cover rounded-lg" />
          </SplideSlide>
        ))}

        {/* <SplideSlide>
          <img
            src={prope.img_two}
            alt={prope.img_alt}
            className="bg-cover rounded-lg"
          />
        </SplideSlide> */}
      </Splide>
      <Splide
        options={{
          type: "slide",
          rewind: true,
          gap: "0.5rem",
          pagination: false,
          fixedWidth: 110,
          fixedHeight: 70,
          cover: true,
          isNavigation: true,
          arrows: false,
          breakpoints: {
            600: {
              fixedWidth: 60,
              fixedHeight: 44,
            },
          },
        }}
        ref={thumbnailsRef}
        aria-label="The carousel with thumbnails. Selecting a thumbnail will change the main carousel"
        className="mb-5"
      >
        {media?.map((img, index) => (
          <SplideSlide key={index}>
            <img src={img} alt={alt} className="bg-cover" />
          </SplideSlide>
        ))}

        {/* <SplideSlide>
          <img src={prope.img_two} alt={prope.img_alt} className="bg-cover" />
        </SplideSlide> */}
      </Splide>
    </div>
  );
}

export default SingleProductCarousel;
