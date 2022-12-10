import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function Carousel(){
    return (
        <div className="w-full mx-auto ">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img
                        className="w-[80rem] mx-auto"
                        src="./images/carousel/carousel-1.webp"
                        alt="image slide 1"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="w-[80rem] mx-auto"
                        src="./images/carousel/carousel-2.webp"
                        alt="image slide 2"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        className="w-[80rem] mx-auto"
                        src="./images/carousel/carousel-3.webp"
                        alt="image slide 3"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
