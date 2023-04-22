import Slider from "react-slick";
import Card from "./Card";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CardSlider.css";

export default function CardSlider({ data, heading, className }) {
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={`slider_container ${className}`}>
      <h2 className="slider_header">{heading}</h2>
      <div className="slider_content">
        <Slider {...settings}>
          {data.map((item) => (
            <Card data={item} key={item.id} />
          ))}
        </Slider>
      </div>
    </div>
  );
}
