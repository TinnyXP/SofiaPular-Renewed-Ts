'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Button } from '@nextui-org/react';
import { useEdgeStore } from '@/lib/edgestore';

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
          <h1 className='text-5xl sm:text-7xl font-bold mt-8'>เนื้อเรื่องหลัก</h1>
          <div className='flex flex-col justify-center mb-5 gap-2'>
            <p>เริ่มต้นอ่านได้เลยจ้าาา</p>
          </div>
        </section>
      </div>
      <div className='container mx-auto max-w-7xl px-6 flex-grow my-10'>
        <MainComicList />
      </div>
    </div>
  )
}
export default Page;

const MainComicList = () => {
  const [mainComics, setMainComics] = useState<Comic[]>([])
  const { edgestore } = useEdgeStore()
  const router = useRouter()
  useEffect(() => {
    const getMainComics = async () => {
      const response = await fetch('/api/comics/maincomics', {
        next: { revalidate: 10 }
      });
      const data = await response.json();
      setMainComics(data);
    }
    getMainComics();
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
        {mainComics.length === 0 && <p className='text-2xl'>ไม่มีข้อมูลหนังสือ</p>}
        {Array.isArray(mainComics) && mainComics.map((maincomic: Comic, index: number) => (
          <div key={index} className='w-full'>
            <div onClick={() => handleView(maincomic)} className='transition-all duration-300 bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 cursor-pointer text-2xl flex justify-between items-center p-3 rounded-lg gap-4 hover:bg-zinc-100 hover:dark:bg-zinc-900'>
              <div className='flex items-center gap-4'>
                <div className='hidden sm:block'>
                  <h1 className='text-xl text-white font-semibold bg-[#FF639B] h-10 w-10 flex items-center justify-center rounded-full'>{index + 1}</h1>
                </div>
                <div className='flex flex-col'>
                  <p className='text-base md:text-lg font-semibold'>ตอนที่ {index + 1} &quot;{maincomic.title}&quot;</p>
                  <div className='flex flex-col md:flex-row gap-0 md:gap-4'>
                    <p className='text-xs text-zinc-400'>วันที่: {maincomic.date}</p>
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
