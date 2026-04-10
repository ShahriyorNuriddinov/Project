import Icons from "@/components/companyicons/icons";
import Swiper from "../../../components/swiper/swiper";
import News from "@/components/news/news";
import Review from "@/components/swiper/swiper-text";
import Feauters from "@/components/save/save";
import ProductCarousel from "@/components/Product/ProductSwiper";

import ZipBanner from "@/components/zip/zip-banner";

const Home = () => {
  return (
    <div>
      <Swiper />
      <ProductCarousel />
      <ZipBanner />
      <Icons />
      <News />
      <Review />
      <Feauters />
    </div>
  );
};

export default Home;