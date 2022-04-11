import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Slider = () => {
  return (
    <Carousel showArrows={true}>
      <div>
        <img src="./images/slider/slider-3.png" alt="action camera" />
      </div>
      <div>
        <img src="./images/slider/slider-2.png" alt={"action camera"} />
      </div>
      <div>
        <img src="./images/slider/slider-1.png" alt="action camera" />
      </div>
    </Carousel>
  );
};

export default Slider;
