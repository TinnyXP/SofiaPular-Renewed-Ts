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
          <h1 className='text-5xl sm:text-7xl font-bold my-5'>ยินดีต้อนรับ!</h1>
          <div className='flex flex-col justify-center mb-5 gap-2'>
            <p>ถ้าคุณต้องการเพิ่มหนังสือใหม่ ให้คลิกที่ปุ่ม &quot;เพิ่มหนังสือ&quot; ด้านล่าง</p>
            <div className='flex justify-center'>
              <Button as={Link} href='/admin/create-comics' variant='solid' color='primary' className='w-2/4'>สร้างหนังสือ</Button>
            </div>
          </div>
          <div className='flex items-center justify-center w-full'>
            <hr className='border-gray-300 dark:border-zinc-600 flex-grow border-1' />
          </div>
        </section>
      </div>
      <div className='container mx-auto max-w-7xl px-6 flex-grow my-10'>
        <div className='block md:hidden'>
          <div className="flex w-full flex-col">
            <Tabs aria-label='Options' color='primary' variant='bordered' fullWidth>
              <Tab key="main" title={<div className="flex items-center space-x-2"><FaRocket size={14} /><span>เนื้อเรื่องหลัก</span></div>}>
                <MainComicList />
              </Tab>
              <Tab key="short" title={<div className="flex items-center space-x-2"><FaMugHot className='mb-1' size={14} /><span>เนื้อเรื่องเสริม</span></div>}>
                <ShortComicList />
              </Tab>
            </Tabs>
          </div>
        </div>
        <div className='hidden md:block'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-4 justify-items-center items-start'>
            <MainComicList />
            <ShortComicList />
          </div>
        </div>
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
  // Edit MainComicBook
  const handleEdit = (comic: Comic) => {
    router.push(`/admin/edit-comics?id=${comic.id}`)
  }
  // Delete MainComicBook
  const handleDelete = async (comic: Comic) => {
    try {
      await edgestore.publicFiles.delete({
        url: comic.path,
      });
      // Delete the post
      const response = await fetch(`/api/comics/${comic.id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (response.ok) {
        alert('Book deleted successfully')
        setMainComics(mainComics.filter((comic: Comic) => comic.id !== data.id))
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className='w-full flex flex-col justify-center'>
      <h1 className='flex justify-center text-3xl font-bold my-2'>เนื้อเรื่องหลัก</h1>
      <div className='flex flex-col items-center justify-center gap-2 py-2 px-2 w-full bg-white border-2 border-gray-200 rounded-lg drop-shadow-md dark:border-zinc-800 dark:bg-black'>
        {mainComics.length === 0 && <p className='text-2xl'>ไม่มีข้อมูลหนังสือ</p>}
        {Array.isArray(mainComics) && mainComics.map((maincomic: Comic, index: number) => (
          <div key={index} className='text-2xl w-full flex justify-between items-center p-3 rounded-lg gap-4 hover:bg-zinc-100 hover:dark:bg-zinc-900 transition duration-300'>
            <div className='flex items-center gap-4'>
              <div className='hidden sm:block'>
                <h1 className='text-xl text-white font-semibold bg-[#FF639B] h-10 w-10 flex items-center justify-center rounded-full'>{index + 1}</h1>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm md:text-base font-semibold'>ตอนที่ {index + 1} &quot;{maincomic.title}&quot;</p>
                <div className='flex flex-col md:flex-row gap-0 md:gap-4'>
                  <p className='text-xs text-zinc-400'>วันที่: {maincomic.date}</p>
                  <div className='flex text-xs gap-0.5'>
                    <p className='text-xs text-zinc-400'>เปิดไฟล์:</p>
                    <Link href={maincomic.path} className='underline-offset-1'>คลิก</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              <Button color='warning' variant='solid' isIconOnly radius='full' size='sm' onClick={() => handleEdit(maincomic)}>
                <FaPencil className='text-white' size={14} />
              </Button>
              <Button color='danger' variant='solid' isIconOnly radius='full' size='sm' onClick={() => handleDelete(maincomic)}>
                <FaTrash className='text-white' size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

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
    };
    getShortComics();
  }, []);
  // Edit ShortComic
  const handleEdit = (comic: Comic) => {
    router.push(`/admin/edit-comics?id=${comic.id}`)
  }
  // Delete ShortComic
  const handleDelete = async (comic: Comic) => {
    try {
      await edgestore.publicFiles.delete({
        url: comic.path,
      });
      // Delete the ShortComic
      const response = await fetch(`/api/comics/${comic.id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (response.ok) {
        alert(`Book deleted successfully ${comic.path}`)
        setShortComics(shortComics.filter((comic: Comic) => comic.id !== data.id))
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className='w-full flex flex-col justify-center'>
      <h1 className='flex justify-center text-3xl font-bold my-2'>เนื้อเรื่องเสริม</h1>
      <div className='flex flex-col items-center justify-center gap-2 py-2 px-2 w-full bg-white border-2 border-gray-200 rounded-lg drop-shadow-md dark:border-zinc-800 dark:bg-black'>
        {shortComics.length === 0 && <p className='text-2xl'>ไม่มีข้อมูลหนังสือ</p>}
        {Array.isArray(shortComics) && shortComics.map((shortcomic: Comic, index: number) => (
          <div key={index} className='text-2xl w-full flex justify-between items-center p-3 rounded-lg gap-4 hover:bg-zinc-100 hover:dark:bg-zinc-900 transition duration-300'>
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
            <div className='flex gap-2'>
              <Button color='warning' variant='solid' isIconOnly radius='full' size='sm' onClick={() => handleEdit(shortcomic)}>
                <FaPencil className='text-white' size={14} />
              </Button>
              <Button color='danger' variant='solid' isIconOnly radius='full' size='sm' onClick={() => handleDelete(shortcomic)}>
                <FaTrash className='text-white' size={14} />
              </Button>
          </div>
          </div>
        ))}
    </div>
    </section >
  )
}