'use client';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Slider from 'react-slick';


const images = [
  '/images/banner1.jpg',
  '/images/banner1.jpg',
  '/images/banner1.jpg'
];

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 50.7466,   
  lng: 25.3254,
};

export default function AboutUs() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API as String, 
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Про нашу компанію</h1>

      <div className="mb-10">
        <Slider {...sliderSettings}>
          {images.map((src, index) => (
            <div key={index}>
              <img
                src={src}
                alt={`Фото ${index + 1}`}
                className="w-full h-80 object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="mb-10">
        <p className="text-lg leading-relaxed">
        Ласкаво просимо до нашого магазину — місця, де якість зустрічається з турботою про клієнта. Ми пропонуємо широкий вибір товарів, обраних з урахуванням ваших потреб і сучасних трендів.

Для нас важливо не просто продавати, а допомагати кожному знайти саме те, що зробить життя комфортнішим і приємнішим. Ми ретельно відбираємо асортимент, співпрацюємо з надійними постачальниками і постійно оновлюємо наші пропозиції.

Завдяки швидкому сервісу, зручній доставці та дружньому підходу ми прагнемо зробити ваш досвід покупок максимально приємним і простим.

Обирайте найкраще — обирайте нас!
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-4xl font-bold mb-6 text-center">Де нас знайти</h2>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={14}
          >
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <p>Завантаження карти...</p>
        )}
      </div>
    </div>
  );
}
