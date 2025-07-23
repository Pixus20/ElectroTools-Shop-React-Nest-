'use client';
import Image from 'next/image';
import Slider from 'react-slick';



const images = [
  '/images/banner1.jpg',
  '/images/banner1.jpg',
  '/images/banner1.jpg'
];

export default function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Slider {...settings}>
      {images.map((src, i) => (
        <div key={i}>
          <Image src={src} alt={`slide-${i}`} width={1200} height={500} className="w-full h-[500px] object-cover rounded-xl" />
        </div>
      ))}
    </Slider>
  );
}
