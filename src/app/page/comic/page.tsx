import React from 'react'
import Image from 'next/image';

export default function page() {
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
    <section className='my-20 mx-5'>
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
          <a href={comic.href} key={index} className='flex flex-row items-center w-full bg-white border-gray-200 rounded-lg drop-shadow-md border-2 hover:drop-shadow-lg hover:scale-typeComic hover:bg-gray-50 dark:border-zinc-900 dark:bg-black dark:hover:bg-zinc-900/50 transition duration-300 ease-in-out'>
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