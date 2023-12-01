'use client';

import React, { useEffect, useState, useRef } from 'react'
import { Input } from "@nextui-org/input";
import { IoSend } from "react-icons/io5";
import { Button } from '@nextui-org/button';
import { FaStar, FaTrash } from 'react-icons/fa6';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import '@/styles/listswiper.css';

export default function page() {
  return (
    <div>
      <div className='container mx-auto max-w-7xl px-6 flex-grow'>
        <div className='space-y-2 mb-5'>
          <div className='flex flex-col items-start justify-center w-full mt-16'>
            <h1 className='tracking-tight inline font-bold text-black text-4xl sm:text-5xl md:text-6xl dark:text-white'>ถ้าคุณชอบเรื่องนี้</h1>
            <div>
              <h1 className='tracking-tight inline font-bold text-4xl sm:text-5xl md:text-6xl from-[#F74F8C] to-[#FF639B] bg-clip-text text-transparent bg-gradient-to-b'>ได้เวลา&nbsp;</h1>
              <h1 className='tracking-tight inline font-bold text-black text-4xl sm:text-5xl md:text-6xl dark:text-white'>เป็นกำลังใจให้กัน</h1>
            </div>
          </div>
          <p className='w-full sm:w-3/4 my-2 text-xs lg:text-base font-normal text-default-500 block max-w-full'>
            เรื่องราวของพวกเรายังดำเนินต่อไป แต่ถ้าไม่มีกำลังใจจากผู้อ่านก็คงจะเสียดายแย่ ดังนั้นเราจึงขอเชิญชวนทุกคนที่ชอบเรื่องนี้
            มาเป็นกำลังใจด้วยการให้คะแนนและรีวิวเรื่องราวนี้ได้เลย ขอขอบคุณทุกคนที่มีส่วนร่วมในการสร้างเรื่องราวนี้ด้วยนะครับ/ค่ะ
          </p>
        </div>
      </div>
      <div className='container mx-auto max-w-7xl flex-grow my-5'>
        <div className='h-[180px] my-10 flex'>
          <ReviewShow />
        </div>
        <div className='mx-5'>
          <ReviewInPut />
        </div>
      </div>
      <div className='container mx-auto max-w-7xl py-5 flex-grow'>
        <Donate />
      </div>
    </div>
  )
}

interface Review {
  id: string,
  UserId: number,
  rate: number,
  detail: string,
  created: string,
}

const ReviewShow = () => {
  const [reviews, setReviews] = useState<Review[]>([])

  const UserIDName = [
    'สิงโตเงิน นิรนาม',
    'ม้าสีรุ้ง นิรนาม',
    'สุนัข นิรนาม',
    'กิ้งกือ นิรนาม',
    'ลิงโปร่ง นิรนาม',
    'กบแก้ว นิรนาม',
    'จิ้งจอก นิรนาม',
    'จิ้งจก นิรนาม',
    'นกน้อยสี นิรนาม',
    'ปลาสลิด นิรนาม',
    'วัว นิรนาม',
    'กระต่าย นิรนาม',
    'งูสมุทร นิรนาม',
    'ตุ๊กแก นิรนาม',
    'ลีโอ นิรนาม',
    'นกกระจอก นิรนาม',
    'หมีลาย นิรนาม',
    'กวางทับลาย นิรนาม',
    'นกฮูก นิรนาม',
    'แมว นิรนาม',
    'ไส้เดือน นิรนาม',
    'มังกร นิรนาม',
    'จอม นิรนาม',
    'เจได นิรนาม',
    'เติ้ล นิรนาม',
    'อาปาม นิรนาม',
    'การ์ตูน นิรนาม',
    'กล้า นิรนาม',
    'ต้นกล้า นิรนาม',
    'งู นิรนาม',
    'ปู นิรนาม',
    'ไก่ นิรนาม',
    'นิมบ้า นิรนาม',
    'นิมนต์ นิรนาม',
    'นิมมาน นิรนาม',
    'นิมมิตร นิรนาม',
    'ปลา นิรนาม',
    'ปลาหมอ นิรนาม',
    'ปลาสอด นิรนาม',
    'หมาน้อย นิรนาม',
    'หมาป่า นิรนาม',
    'หมู่ป่า นิรนาม',
    'เหมียว นิรนาม',
    'เม่น นิรนาม',
    'ควาย นิรนาม',
    'ตุ่น นิรนาม',
    'เต่า นิรนาม',
    'เต่าทอง นิรนาม',
    'ตุ่นปากเป็ด นิรนาม',
    'ชะนี นิรนาม',
    'ม้าลาย นิรนาม',
    'สมเสร็จ นิรนาม',
    'วาฬ นิรนาม',
    'พังพอน นิรนาม',
    'จิ้งเหลน นิรนาม',
    'แอลลิเกเตอร์ นิรนาม',
    'แตน นิรนาม',
    'เขียด นิรนาม',
    'นกอินทรีย์ นิรนาม',
    'ปลิงทะเล นิรนาม',
    'หนอนท่อ นิรนาม',
    'สลอธ นิรนาม',
    'มด นิรนาม',
    'เนียนแคท นิรนาม',
    'นาก นิรนาม',
    'บึ้ง นิรนาม',
    'เป็ด นิรนาม',
    'เป็ดปักกิ่ง นิรนาม',
    'เป็ดย่าง นิรนาม',
    'เป็ดเหลือง นิรนาม',
    'ผีเสื้อ นิรนาม',
    'พะยูน นิรนาม',
    'เพนกวิน นิรนาม',
    'ช้าง นิรนาม',
    'แมวน้ำ นิรนาม',
  ]

  //Get All Reviews
  useEffect(() => {
    const getReviews = async () => {
      const response = await fetch('/api/reviews', { cache: 'no-store' })
      const data = await response.json()
      setReviews(data)
    }
    getReviews()
  }, [])

  return (
    <div className='w-full max-w-6xl mx-auto text-center my-4'>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        loop={true}
        breakpoints={{
          // when window width is >= 200px
          200: {
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
          },
        }}
        className="mySwiper"
      >
        {reviews.length === 0 && <p className='text-2xl my-9'>ไม่มีข้อมูลรีวิว</p>}
        {reviews.map((review: Review, index: number) => {
          const userIdNumber = Number(review.UserId);
          const secondUser = UserIDName[userIdNumber];
          return (
            <SwiperSlide key={index}>
              <div className='flex w-full justify-center' key={index}>
                <div className="text-2xl w-[500px] h-[131px] items-center bg-gray-50 dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 p-3 rounded-lg gap-4 m-2">
                  <div className='flex gap-2 justify-between w-full items-center'>
                    <div className='flex flex-col justify-between h-full'>
                      <div className='flex flex-row mb-5'>
                        {Array.from({ length: review.rate }).map((_, index) => (
                          <FaStar className='text-yellow-400' size={30} key={index} />
                        ))}
                      </div>
                      <div className='flex gap-2 items-center'>
                        <p className='text-xs text-left text-zinc-700 dark:text-zinc-200'>{secondUser}</p>
                        <p className='text-xs text-left text-zinc-400 dark:text-zinc-500'>{review.created}</p>
                      </div>
                      <p className='text-base font-medium text-left text-black dark:text-white'>{review.detail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

const ReviewInPut = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState('')
  const [rating, setRating] = useState(0);

  const router = useRouter()

  const handlePostCreation = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    // Get the current date and time
    const currentDate = new Date();

    // Format the date into "DD/MM/YYYY" format
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    // Format the time into "HH:MM" format
    const formattedTime = currentDate.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Combine the formatted date and time
    const formattedDateTime = `${formattedTime} | ${formattedDate}`;

    // Generate a random user ID between 1 and 100
    const userid = Math.floor(Math.random() * 75) + 1;

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // Include the current date in the body of the request
        body: JSON.stringify({
          userid: userid,
          rate: rating,
          detail: detail,
          created: formattedDateTime
        })
      });

      if (response.ok) {
        alert('Post created successfully');
        setRating(0);
        setDetail('');
        setIsLoading(false);
        window.location.reload()
      } else {
        throw new Error('Response not OK');
      }
    } catch (error) {
      alert('Something went wrong when creating post');
    }
  };

  return (
    <div className='flex justify-center'>

      <section className='w-[450px] p-2 flex justify-center bg-gray-50 border-2 dark:bg-zinc-900 dark:border-zinc-800 rounded-lg shadow-lg'>
        <form className='w-full flex items-center gap-2' onSubmit={handlePostCreation}>
          <Button onPress={onOpen} isIconOnly radius='sm' size='lg' className='bg-yellow-400'>
            <div className='relative flex items-center justify-center'>
              <FaStar className='text-white' size={35} />
              <span className='absolute font-bold mt-1 text-yellow-500'>{rating}</span>
            </div>
          </Button>
          <Input variant='faded' radius='sm' type='text' label='รายละเอียด' className='text-black dark:text-white ' maxLength={45} value={detail} onChange={(e) => setDetail(e.target.value)}></Input>
          <Button isIconOnly radius='full' size='lg' color='primary' type="submit" isLoading={isLoading} isDisabled={rating === 0 || detail === ''}><IoSend size={20} /></Button>
        </form>
      </section>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' placement='bottom-center' size='xs' className='mb-4'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">คุณต้องการให้รีวิวกี่ดาว?</ModalHeader>
              <ModalBody>
                <div className='flex justify-center'>
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;

                    return (
                      <label key={i}>
                        <input type='radio' name='rating' value={ratingValue} onClick={() => setRating(ratingValue)} className='hidden' />
                        <FaStar className={`cursor-pointer ${ratingValue <= rating ? 'text-yellow-400' : 'text-zinc-400'}`} size={35} />
                      </label>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} onClick={() => setRating(0)}>
                  ยกเลิก
                </Button>
                <Button color="primary" onPress={onClose}>
                  <p className='text-md'>ตกลง</p>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
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