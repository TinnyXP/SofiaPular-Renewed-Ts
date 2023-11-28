'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Button, Tabs, Tab } from '@nextui-org/react';
import { useEdgeStore } from '@/lib/edgestore';

import { FaMugHot, FaPencil, FaRocket, FaTrash } from "react-icons/fa6";
import Link from 'next/link';
import { Console } from 'console';

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
          <h1 className='text-5xl sm:text-7xl font-bold mt-8'>เนื้อเรื่องเสริม</h1>
          <div className='flex flex-col justify-center mb-5 gap-2'>
            <p>เริ่มต้นอ่านได้เลยจ้าาา</p>
          </div>
        </section>
      </div>
      <div className='container mx-auto max-w-7xl px-6 flex-grow my-10'>
        <ShortComicList />
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

  return (
    <section className='w-full flex flex-col justify-center'>
      <div className='flex flex-col items-center justify-center gap-2 py-2 px-2 w-full bg-white border-2 border-gray-200 rounded-lg drop-shadow-md dark:border-zinc-800 dark:bg-black'>
        {shortComics.length === 0 && <p className='text-2xl'>ไม่มีข้อมูลหนังสือ</p>}
        {Array.isArray(shortComics) && shortComics.map((shortcomic: Comic, index: number) => (
          <div key={index} onClick={() => handleView(shortcomic)} className='text-2xl w-full flex justify-between items-center p-3 rounded-lg gap-4 hover:bg-zinc-100 hover:dark:bg-zinc-900 transition duration-300'>
            <div className='flex items-center gap-4'>
              <div className='hidden sm:block'>
                <h1 className='text-xl text-white font-semibold bg-[#FF639B] h-10 w-10 flex items-center justify-center rounded-full'>{index + 1}</h1>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm md:text-base font-semibold'>ตอนที่ {index + 1} &quot;{shortcomic.title}&quot;</p>
                <div className='flex flex-col md:flex-row gap-0 md:gap-4'>
                  <p className='text-xs text-zinc-400'>วันที่: {shortcomic.date}</p>
                  <div className='flex text-xs gap-0.5'>
                    <p className='text-xs text-zinc-400'>เปิดไฟล์:</p>
                    <Link href={shortcomic.path} className='underline-offset-1'>คลิก</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
