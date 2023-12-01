import React from 'react'
import Image from 'next/image';
import { SiShopee } from 'react-icons/si';
import { SignatureIcon } from '@/../public/Icon';

export default function page() {
  return (
    <div className='container mx-auto max-w-7xl px-6 flex-grow my-10 mt-20'>
      <div className='space-y-2 mb-5'>
        <div className='flex flex-col items-center justify-center w-full'>
          <h1 className='tracking-tight inline font-bold text-black text-4xl md:text-5xl lg:text-6xl dark:text-white'>ขอบคุณที่ติดตามอ่านมาตลอด</h1>
          <div className='flex flex-col md:flex-row'>
            <h1 className='tracking-tight inline font-bold text-4xl md:text-5xl lg:text-6xl from-[#F74F8C] to-[#FF639B] bg-clip-text text-transparent bg-gradient-to-b'>พวกคุณสามารถ&nbsp;</h1>
            <h1 className='tracking-tight inline font-bold text-black text-4xl md:text-5xl lg:text-6xl dark:text-white'>สนับสนุนพวกเราได้!</h1>
          </div>
        </div>
        <p className='text-xs md:text-lg text-center font-normal text-default-500 block mt-4'>
          ทางเรามีร้าน Shoppee มีของที่ระลึกของเรามากมายของ &quot;อยู่กับเธอแล้วสบายใจ&quot; ให้ไปสะสมกันนะครับ/ค่ะ
        </p>
      </div>
      <div className='my-20 flex flex-col md:flex-row w-full justify-center gap-10 items-center'>
        <Donate />
        <p className='text-4xl font-bold text-center'>หรือ</p>
        <Shoppe />
      </div>
    </div>
  )
}

const Donate = () => {
  return (
    <section className='flex flex-row justify-center items-center h-auto bg-cover'>
      <div className='border-2 border-zinc-300 dark:border-zinc-800 rounded-lg shadow-lg flex items-center static'>
        <div className='p-4'>
          <p className='text-2xl font-bold text-center mb-4'>ช่องทางสนับสนุน</p>
          <Image width={0} height={0} src='/img/QRCode/QR.png' alt='Hero Image' className='rounded-lg h-[220px] w-[220px] object-cover' />
          <p className='text-xl font-semibold text-center mt-4'>ธนาคาร กสิกรไทย</p>
          <p className='text-base text-center'>เลขบัญชี: 042-175626-0</p>
        </div>
      </div>
    </section>
  );
};

const Shoppe = () => {
  return (
    <a href='https://shopee.co.th/sofiapular' target='_black' className='flex flex-row justify-center items-center h-auto bg-cover'>
      <div className='border-2 bg-orange-500 border-zinc-300 dark:border-zinc-800 rounded-lg shadow-lg flex items-center static'>
        <div className='p-4'>
          <p className='text-2xl font-bold text-center mb-4 text-white'>ซื้อของที่ระลึก</p>
          <div className='flex justify-center'>
            <SiShopee size={100} className='text-white' />
          </div>
          <div className='flex flex-col justify-center'>
            <p className='text-2xl font-black text-center text-white mt-4'>SHOPEE</p>
            <div className='w-full flex justify-center'>
              <SignatureIcon className='w-[165px] h-[60px] fill-white' />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

