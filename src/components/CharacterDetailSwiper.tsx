'use client'
import React, { useRef, useState } from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/swiper.css';
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

interface Slide {
  src: string;
  alt: string;
}

interface CardSwiperProps {
  slides: Slide[];
}

const CharacterDetailSwiper: React.FC<CardSwiperProps> = ({ slides }) => {
  return (
    <section>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper px-6 pb-10 drop-shadow-md"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Image
              width={0}
              height={0}
              src={slide.src}
              alt={slide.alt}
              className='rounded-lg h-[230px] w-[800px] object-cover sm:h-[500px] md:h-[800px] sm:w-[1232px]'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
export default CharacterDetailSwiper;