'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Button, Chip } from '@nextui-org/react';
import { useEdgeStore } from '@/lib/edgestore';
import Image from 'next/image';

import { FaHeart, FaRegHeart } from "react-icons/fa6";
import Link from 'next/link';

interface Comic {
  id: string,
  title: string,
  date: string,
  path: string,
}

const Page = () => {

  return (
    <div>
      <div className='container mx-auto max-w-7xl px-6 flex-grow'>
        <section className='flex flex-col justify-center items-center h-auto my-5 mb-10'>
          <h1 className='text-4xl sm:text-7xl font-bold mt-8'>เนื้อเรื่องเสริม</h1>
          <div className='w-full md:w-3/4 flex flex-col justify-center mb-5 gap-2'>
            <p className='text-xs md:text-base text-center font-normal text-default-500 block'>
              * สำหรับเนื้อเรื่องเสริม (Short comic) ถูกเขียนขึ้นเพื่อเล่าเรื่องราวที่เป็นดีเทลเล็ก ๆ น้อย ๆ ให้ผู้อ่านได้รู้จักตัวละครมากยิ่งขึ้น
              หรือจะเป็นตอนพิเศษที่มีตามเทศกาล ทั้งนี้ทุกเนื้อเรื่องเสริม ไม่ได้มีผลกระทบต่อเนื้อเรื่องหลัก แต่อย่างใด
            </p>
          </div>
        </section>
      </div>
      <div className='container mx-auto max-w-7xl px-6 flex-grow my-10'>
        <ShortComicList />
      </div>
      <div>
        <Donate />
      </div>
    </div>
  )
}
export default Page;

const ShortComicList = () => {
  const [shortComics, setShortComics] = useState<Comic[]>([])
  const { edgestore } = useEdgeStore()
  const router = useRouter()
  useEffect(() => {
    const getShortComics = async () => {
      const response = await fetch('/api/comics/shortcomics', {
        next: { revalidate: 10 }
      });
      const data = await response.json();
      setShortComics(data);
    }
    getShortComics();
  }, []);

  // View MainComicBook
  const handleView = (comic: Comic) => {
    router.push(`/view?id=${comic.id}`)
  }

  const [isFilled, setIsFilled] = useState(false);
  const handleClick = () => {
    setIsFilled(!isFilled);
  };

  return (
    <section className='w-full flex justify-center'>
      <div className='flex flex-col items-center justify-center gap-2 py-2 px-2 w-[600px] bg-zinc-50 rounded-lg drop-shadow-lg dark:border-zinc-800 dark:bg-black'>
        {shortComics.length === 0 && <p className='text-2xl'>ไม่มีข้อมูลหนังสือ</p>}
        {Array.isArray(shortComics) && shortComics.map((shortcomic: Comic, index: number) => (
          <div key={index} className='w-full'>
            <div onClick={() => handleView(shortcomic)} className='transition-all duration-300 bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 cursor-pointer text-2xl flex justify-between items-center p-3 rounded-lg gap-4 hover:bg-zinc-100 hover:dark:bg-zinc-900'>
              <div className='flex items-center gap-4'>
                <div className='hidden sm:block'>
                  <h1 className='text-xl text-white font-semibold bg-[#FF639B] h-10 w-10 flex items-center justify-center rounded-full'>{index + 1}</h1>
                </div>
                <div className='flex flex-col'>
                  <p className='text-base md:text-lg font-semibold'>ตอนที่ {index + 1} &quot;{shortcomic.title}&quot;</p>
                  <div className='flex flex-col md:flex-row gap-0 md:gap-4'>
                    <p className='text-xs text-zinc-400'>วันที่: {shortcomic.date}</p>
                  </div>
                </div>
              </div>
              <Button as={Link} href='#' color='default' variant='light' radius='full' isIconOnly onClick={handleClick} aria-label='Bookmark'>
                {isFilled ? <FaHeart className='text-[#FF639B]' size={22} /> : <FaRegHeart className='text-[#B3B3B3] dark:text-white' size={22} />}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const Donate = () => {
  return (
    <section className='flex flex-row justify-center items-center h-auto bg-cover'>
      <div className='border-2 border-zinc-300 dark:border-zinc-800 rounded-lg shadow-lg flex items-center static'>
        <div className='p-4'>
          <p className='text-2xl font-bold text-center mb-2'>ช่องทางสนับสนุน</p>
          <Image width={0} height={0} src='/img/QRCode/QR.png' alt='Hero Image' className='rounded-lg h-[200px] w-[200px] object-cover' />
          <p className='text-xl font-semibold text-center mt-2'>ธนาคาร กสิกรไทย</p>
          <p className='text-base text-center'>เลขบัญชี: 042-175626-0</p>
        </div>
      </div>
    </section>
  );
};