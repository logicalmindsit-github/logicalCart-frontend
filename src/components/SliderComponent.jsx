import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderComponent.css'; // Import your custom CSS file for styling

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    //autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img src="https://i.postimg.cc/W43Y6Y4z/Your-paragraph-text-1200-x-500-px.jpg"  />
        </div>
        <div>
          <img src="https://i.postimg.cc/zDFDVpV6/Your-paragraph-text-1200-x-500-px-1.jpg" />
        </div>
        <div>
          <img src="https://i.postimg.cc/8CQxdQYH/Your-paragraph-text-1200-x-500-px-2.jpg" />
        </div>
      </Slider>
    </div>
  );
};

// Custom arrow components
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-prev" onClick={onClick}>
     
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow slick-next" onClick={onClick}>
      
    </div>
  );
};

export default SliderComponent;
