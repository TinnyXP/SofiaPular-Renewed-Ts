'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { Input, Button } from "@nextui-org/react";
import Link from 'next/link'

interface BookProps {
  id: string,
  title: string,
  date: string,
  path: string,
}

const EditComics = () => {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [path, setPath] = useState('')
  const [comic, setComic] = useState<BookProps | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()

  const searchParams = useSearchParams()
  const comicId = searchParams.get('id')

  useEffect(() => {
    const getComic = async () => {
      const response = await fetch(`/api/comics/${comicId}`)
      const data = await response.json()
      setComic(data)
      console.log("Comic", data)
    }
    if (comicId) getComic()
  }, [comicId])

  if (!comic) {
    return (
      <p>Loading...</p>
    );
  }

  const handleEdit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault()
    const response = await fetch(`/api/comics/${comicId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, date, path }),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setIsLoading(false);
      alert("Book edited successfully");
      router.push("/admin");
    }
  };

  return (
    <div>
      <section className='bg-white dark:bg-black py-10'>
        <div className='flex justify-center items-center'>

          <div className='sm:bg-white dark:bg-zinc-950 sm:border-2 sm:border-zinc-200 dark:border-zinc-800 sm:drop-shadow-md sm:rounded-lg sm:p-8 sm:w-[400px]'>
            <form onSubmit={handleEdit}>
              <div className='flex flex-col justify-center'>
                <h1 className='tracking-tight inline font-bold text-black text-4xl text-center sm:text-5xl md:text-6xl dark:text-white'>แก้ไขหนังสือ</h1>
                <p className='text-sm text-center leading-relaxed text-zinc-500'>ID: {comic.id}</p>
              </div>
              <div className='flex items-center justify-center my-5'>
                <hr className='border-gray-300 dark:border-zinc-600 flex-grow border-1' />
              </div>
              <div className='flex flex-col gap-2'>
                <Input defaultValue="junior@nextui.org" description={`ชื่อก่อนหน้านี้: ${comic.title}`} label='ชื่อตอน' variant='faded' size='sm' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className='mt-5 flex justify-center items-center gap-4'>
                <Button className='w-full font-semibold ' variant='solid' color='danger' as={Link} href='/admin'>กลับไปหน้าแอดมิน</Button>
                <Button isLoading={isLoading} className='w-full font-medium' variant='solid' color='primary' type="submit">อัพเดตหนังสือ</Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EditComics;

