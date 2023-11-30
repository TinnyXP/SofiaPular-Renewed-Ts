'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PrismaClient, BookType } from '@/../prisma/generated/client';
import { Input, Button, RadioGroup, Radio } from "@nextui-org/react";
import { useDropzone } from 'react-dropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { Progress } from "@nextui-org/progress";

const CreateComics = () => {

  const [title, setTitle] = useState('')
  const [booktype, setBooktype] = useState<BookType>();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [file, setFile] = useState<File>()
  const [isLoading, setIsLoading] = useState(false);
  const [urls, setUrls] = useState({ url: '', size: '' });
  const [url, setUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const { edgestore } = useEdgeStore()

  const router = useRouter()
  const [fileName, setFileName] = useState('');
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      setFile(file);
      setFileName(file?.name || '');
  
      if (file) {
        const response = await edgestore.publicFiles.upload({
          file: file,
          onProgressChange: (progress) => {
            setUploadProgress(progress);
          },
          options: {
            temporary: true,
          },
        });

        setUrls({
          url: response.url,
          size: response.size.toString(),
        });

        setUrl(response.url);
      }
    }
  });

  const handlePostCreation = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault()

    // Get the current date and time
    const currentDate = new Date();

    // Format the date into "DD-MM-YYYY" format
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const response = await fetch('/api/comics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Include the current date in the body of the request
      body: JSON.stringify({ title, booktype, date: formattedDate, path: url })
    })

    if (response.ok) {
      alert('Post created successfully')
      setTitle('')
      setBooktype(BookType.MAIN)
      setIsLoading(false);
      router.push('/admin')
    } else {
      alert('Something went wrong when creating post')
    }
  }

  return (
    <section className='background h-full w-full my-10 flex justify-center'>
      <div className='bg-white dark:bg-black drop-shadow-md rounded-md m-5 flex flex-col justify-center border-2 border-gray-200 dark:border-zinc-00'>
        <h1 className='mx-5 mt-5 tracking-tight inline font-bold text-black text-5xl md:text-6xl dark:text-white text-center'>อัพโหลดหนังสือ</h1>
        <form className='flex flex-col justify-start gap-4 items-center rounded-lg shadow-md border-2 border-gray-100 dark:border-zinc-900 max-w-lg p-4 m-5' onSubmit={handlePostCreation}>
          <Input type="text" label="ชื่อตอน" variant='faded' labelPlacement='outside' placeholder="เรื่องราวของฉัน" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div className='w-full'>
            <p className='text-gray-550 mb-1 text-sm dark:text-gray-100'>อัพโหลดไฟล์</p>
            <div {...getRootProps()} className="flex items-center justify-center h-28 w-full rounded-lg shadow-md bg-gray-100 dark:bg-zinc-800 border-2 border-dashed cursor-pointer border-gray-200 dark:border-zinc-600 dark:hover:border-zinc-400 hover:border-gray-500 transition duration-300">
              <input {...getInputProps()} hidden type="file" onChange={async (e) => {
                const file = e.target.files?.[0];
                setFile(file);
                setFileName(file?.name || '');

                if (file) {
                  const response = await edgestore.publicFiles.upload({
                    file: file,
                    onProgressChange: (progress) => {
                      setUploadProgress(progress);
                    },
                    options: {
                      temporary: true,
                    },
                  });

                  setUrls({
                    url: response.url,
                    size: response.size.toString(),
                  });

                  setUrl(response.url);
                }
              }} />
              <div className='flex flex-col'>
                <div className='flex gap-1.5 justify-center'>
                  <p className="text-gray-600 dark:text-gray-300 font-medium text-xs sm:text-sm">Choose a file</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">or drag it in here.</p>
                </div>
                {file && uploadProgress < 100 ? <Progress size="sm" aria-label="Loading..." value={uploadProgress} /> : null}
                {fileName ? <p className="text-gray-400 dark:text-gray-500 text-center text-xs">Selected file: {fileName}</p> : null}
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full'>
            <p className='text-gray-550 mb-2 text-sm dark:text-gray-100'>ประเภทของเนื้อเรื่อง</p>
            <RadioGroup
              orientation="horizontal"
              className='w-full'
              onChange={(e) => setBooktype(e.target.value as BookType)}
            >
              <Radio size='sm' value={BookType.MAIN}>เนื้อเรื่องหลัก</Radio>
              <Radio size='sm' value={BookType.SHORT}>เนื้อเรื่องเสริม</Radio>
            </RadioGroup>
          </div>
          <Button className='w-full' isDisabled={uploadProgress !== 100 || !title || !booktype } isLoading={isLoading} color="primary" type="submit"
            onClick={async () => {
              try {
                if (file) {
                  await edgestore.publicFiles.confirmUpload({
                    url: url,
                  });
                }
              } catch (error) {
                console.error('An error occurred:', error);
              }
            }}
          >อัพโหลดหนังสือ</Button>
        </form>
      </div>
    </section>
  )
}

export default CreateComics;