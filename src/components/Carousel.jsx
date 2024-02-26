import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import g1 from '../assets/g1.jpeg';
import g2 from '../assets/g2.jpeg';
import g3 from '../assets/g3.jpeg';

const Carousel = () => {
  // Componente personalizado para el botón de siguiente
  const NextArrow = ({ onClick }) => {
    return (
      <button
        className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-white rounded-full w-12 h-12 flex items-center justify-center"
        onClick={onClick}
      >
        {'>'}
      </button>
    );
  };

  // Componente personalizado para el botón de anterior
  const PrevArrow = ({ onClick }) => {
    return (
      <button
        className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-white rounded-full w-12 h-12 flex items-center justify-center"
        onClick={onClick}
      >
        {'<'}
      </button>
    );
  };

  const settings = {
    dots: true,
    dotsClass: 'slick-dots', // Clase predeterminada de los botones de navegación
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />, // Componente personalizado para el botón de siguiente
    prevArrow: <PrevArrow />, // Componente personalizado para el botón de anterior
  };

  return (
    <div className='p-6'>
      <Slider {...settings}>
        <div>
          <img
            src={g1} 
            alt="Slide 1"
            className="w-full h-auto max-h-screen object-contain "
          />
        </div>
        <div>
          <img
            src={g2}
            alt="Slide 2"
            className="w-full h-auto max-h-screen object-contain "
          />
        </div>
        <div>
          <img
            src={g3}
            alt="Slide 3"
            className="w-full h-auto max-h-screen object-contain "
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
