import React from 'react';
import Image from 'next/image';
import { Chip } from '@nextui-org/chip';
import { ComicIcon } from '@/../public/Icon';

import CardSwiper from '@/components/CardSwiper';

export default async function Home() {

  return (
    <div>
      <div className='container mx-auto max-w-7xl px-6 flex-grow my-10'>
        <HeaderSection />
        <AboutComic />
        <SelectTypeComic />
      </div>
      <CardSwiper slides={[
        { src: '/img/1.jpg', alt: 'Hero Image 1' },
        { src: '/img/2.jpg', alt: 'Hero Image 2' },
        { src: '/img/3.jpg', alt: 'Hero Image 3' },
        { src: '/img/4.jpg', alt: 'Hero Image 4' },
        { src: '/img/5.jpg', alt: 'Hero Image 5' },
      ]} />
      <div className='container mx-auto max-w-7xl px-6 flex-grow my-10'>
        <CharacterInfo />
      </div>
    </div>
  )
}

const HeaderSection = () => {
  return (
    <section className='text-white mb-20'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8'>
        <div className='text-black flex flex-col items-center justify-center dark:text-white'>
          <ComicIcon />
          <h2 className='text-4xl text-center font-bold mt-4'>
            Welcome to My Comic Book Store
          </h2>
          <p className='text-base text-center mt-4'>
            We have a wide selection of comic books for all ages. Check out our latest arrivals!
          </p>
        </div>
        <div className='w-full flex justify-center'>
          <Image width={0} height={0} src='/img/0.jpg' alt='Hero Image' className='rounded-lg shadow-md h-[250px] w-[800px] object-cover sm:h-[440px]' />
        </div>
      </div>
    </section>
  )
}

const AboutComic = () => {
  const WhisIsGenreItems = [
    { content: 'Slice of life' },
    { content: 'Drama' },
    { content: 'Romantic' },
    { content: 'Comedy' },
  ];
  return (
    <section className='flex justify-center items-center h-auto my-10'>
      <div className='bg-white border-2 border-gray-200 drop-shadow-md rounded-lg p-8 max-w-3xl dark:border-zinc-900 dark:bg-black'>
        <div className='flex justify-center items-center mb-8'>
          <h2 className='text-4xl text-center font-semibold'>&quot;อยู่กับเธอแล้วสบายใจ&quot;</h2>
        </div>
        <div className='text-black text-base dark:text-white'>
          <p className='pb-3'>
            การ์ตูนไทย ที่เล่าเรื่องราวเกี่ยวกับ ชีวิต มิตรภาพ และความสัมพันธ์ ของคนไทย 8 คน ที่ต่างอายุต่างวัยกันโดยเรื่องราวของพวกเค้าเริ่มต้นขึ้น
            ณ ประเทศไทยในปี 2020 ซึ่งกำลังเข้าสู่ยุคที่มีการเปลี่ยนแปลงเกิดขึ้นมากมายในการใช้ชีวิตยุคนึงเลยทีเดียว
          </p>
          <p className='pb-3'>
            โดย 4 ตอนแรกเป็นแนะนำตัวละคร หลังจากตอนที่ 4 ไปแล้ว เรื่องราวของตัวละครทั้งหมดจะยังดำเนินต่อไป
          </p>
        </div>
        <div className='flex flex-wrap justify-center gap-2 mt-4'>
          <p className='pr-1 font-semibold'>Genre :</p>
          {WhisIsGenreItems.map((item, index) => (
            <Chip key={`${item}-${index}`} variant='faded' size='md' radius='sm'>
              {item.content}
            </Chip>
          ))}
        </div>
      </div>
    </section>
  );
};

const SelectTypeComic = () => {
  const Comics = [
    {
      href: '/page/comic/mainComic',
      imgSrc: '/img/mainComic.jpg',
      altText: 'Background',
      title: 'อ่านเนื้อเรื่องหลัก',
      description: 'คลิกเพื่อเริ่มต้นความสนุกกับเนื้อเรื่องหลัก',
    },
    {
      href: '/page/comic/shortComic',
      imgSrc: '/img/shortComic.jpg',
      altText: 'Background',
      title: 'อ่านเนื้อเรื่องเสริม',
      description: 'คลิกเพื่อเริ่มต้นความสนุกกับเนื้อเรื่องเสริม',
    },
  ];
  return (
    <section className='my-20'>
      <div className='space-y-2 mb-5'>
        <div className='flex flex-col items-start justify-center w-full'>
          <h1 className='tracking-tight inline font-bold text-black text-4xl sm:text-5xl md:text-6xl dark:text-white'>ได้เวลาเลือก</h1>
          <div>
            <h1 className='tracking-tight inline font-bold text-4xl sm:text-5xl md:text-6xl from-[#F74F8C] to-[#FF639B] bg-clip-text text-transparent bg-gradient-to-b'>ประเภท&nbsp;</h1>
            <h1 className='tracking-tight inline font-bold text-black text-4xl sm:text-5xl md:text-6xl dark:text-white'>ของเนื้อเรื่อง!</h1>
          </div>
        </div>
        <p className='w-full sm:w-3/4 my-2 text-base lg:text-base font-normal text-default-500 block max-w-full'>
          * สำหรับเนื้อเรื่องเสริม (Short comic) ถูกเขียนขึ้นเพื่อเล่าเรื่องราวที่เป็นดีเทลเล็ก ๆ น้อย ๆ ให้ผู้อ่านได้รู้จักตัวละครมากยิ่งขึ้น
          หรือจะเป็นตอนพิเศษที่มีตามเทศกาล ทั้งนี้ทุกเนื้อเรื่องเสริม ไม่ได้มีผลกระทบต่อเนื้อเรื่องหลัก แต่อย่างใด
        </p>
      </div>
      <div className='flex flex-col md:flex-row justify-center md:space-x-5 space-y-5 md:space-y-0'>
        {Comics.map((comic: any, index) => (
          <a href={comic.href} key={index} className='flex flex-row items-center w-full bg-white border-gray-200 rounded-lg drop-shadow-md border-2 hover:drop-shadow-lg hover:bg-gray-50 dark:border-zinc-900 dark:bg-black dark:hover:bg-zinc-900/50 transition duration-300 ease-in-out'>
            <Image width={0} height={0} className='object-cover w-3/4 rounded-l-lg h-44 hidden sm:block object-top' src={comic.imgSrc} alt={comic.altText} />
            <div className='flex flex-col justify-between p-4 leading-normal space-y-2 w-full'>
              <p className='text-2xl sm:text-3xl text-center font-bold tracking-tight text-gray-900 dark:text-white'>{comic.title}</p>
              <div>
                <p className='text-center font-normal text-gray-700 dark:text-gray-400'>{comic.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

const CharacterInfo = () => {
  const CharacterInfo = [
    { label: 'ธิดา', href: '/page/character', src: '/img/character/ธิดา.jpg' },
    { label: 'กานต์', href: '/page/character', src: '/img/character/กานต์.jpg' },
    { label: 'แพลนเนต', href: '/page/character', src: '/img/character/แพลนเนต.jpg' },
    { label: 'แม็ค', href: '/page/character', src: '/img/character/แม็ค.jpg' },
    { label: 'กวาง', href: '/page/character', src: '/img/character/กวาง.jpg' },
    { label: 'สิงโต', href: '/page/character', src: '/img/character/สิงโต.jpg' },
    { label: 'ขิม', href: '/page/character', src: '/img/character/ขิม.jpg' },
    { label: 'เจ', href: '/page/character', src: '/img/character/เจ.jpg' },
  ];
  return (
    <section className='mt-20 mb-10'>
      <div className='space-y-2 mb-5'>
        <div className='flex flex-row items-center justify-center w-full'>
          <h1 className='tracking-tight inline font-bold text-4xl sm:text-5xl md:text-6xl from-[#F74F8C] to-[#FF639B] bg-clip-text text-transparent bg-gradient-to-b'>แนะนำ&nbsp;</h1>
          <h1 className='tracking-tight inline font-bold text-black text-4xl sm:text-5xl md:text-6xl dark:text-white'>ตัวละครหลัก!</h1>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center items-center'>
        {CharacterInfo.map((item, index) => (
          <a key={`${item}-${index}`} href={item.href} className='flex flex-col items-center justify-center w-64 md:w-full bg-white rounded-lg drop-shadow-md hover:bg-gray-100/50 dark:bg-black dark:hover:bg-zinc-900/50 transition duration-300 ease-in-out'>
            <Image width={0} height={0} className='object-cover object-top w-full rounded-md h-72 sm:h-72 lg:h-80' src={item.src} alt='Background' />
          </a>
        ))}
      </div>
    </section>
  )
}