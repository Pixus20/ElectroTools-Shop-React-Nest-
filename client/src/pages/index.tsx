import HeroSlider from '@/components/MainPage/HeroSlider';
import SeasonalProducts from '@/components/MainPage/SeasonalProducts';
import StoreHistory from '@/components/MainPage/StoreHistory';
import WhyChooseUs from '@/components/MainPage/WhyChooseUs';

export default function Home() {
  return (
    <div className="max-w-[1280px] mx-auto px-4">
      <HeroSlider />
      <StoreHistory />
      <WhyChooseUs />
      <SeasonalProducts />
    </div>
  );
}
