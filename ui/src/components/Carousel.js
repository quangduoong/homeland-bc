import React from "react";
import { apiUrl } from "../assets/utils/constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function CarouselImg({ images, owner }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      responsive={responsive}
      ssr={false} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="transform ease-in-out"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      partialVisible={true}
    >
      {images?.map((image, idx) => (
        <div key={idx}>
          <img
            src={`${apiUrl}/listings/${owner}/${image}`}
            alt=""
            className="w-full h-[559px]"
          />
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselImg;
