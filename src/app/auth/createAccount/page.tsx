'use client'

import React from 'react'
import { Input } from "@nextui-org/input";
import { Button } from '@nextui-org/button';
import { Checkbox } from "@nextui-org/checkbox";
import { FaGoogle, FaWandMagicSparkles } from 'react-icons/fa6';
import { SiLine } from "react-icons/si";

import { signIn, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';

export default function Page() {

  const { data: session } = useSession();
  if (session) {
    redirect("/");
  }

  return (
    <section className='bg-gray-100 dark:bg-black h-screen'>
      <div className='flex justify-center items-center h-screen mx-5'>

        <div className='sm:bg-white sm:dark:bg-zinc-900 sm:drop-shadow-md sm:rounded-lg sm:p-8 sm:w-[460px]'>
          <form>
            <h1 className='text-gray-900 dark:text-white text-2xl font-bold sm:text-3xl'>Create an Account</h1>
            <p className='mt-1 mb-5 leading-relaxed text-gray-500'>Welcome! please create your account to continue.</p>

            <div className='flex items-center justify-between flex-col gap-3'>
              <Button onClick={() => signIn('google')} className='w-full drop-shadow-md bg-red-400 text-white dark:bg-red-500' size='lg' startContent={<FaGoogle size={20} />}>Continue with google</Button>
              <Button onClick={() => signIn('line')} className='w-full drop-shadow-md bg-emerald-500 text-white dark:bg-emerald-600' size='lg' startContent={<SiLine size={20} />}>Continue with LINE</Button>
            </div>

            <div className='flex items-center justify-center my-5'>
              <hr className='border-gray-300 dark:border-gray-600 flex-grow border-1' />
              <p className='mx-4 font-medium text-xs sm:text-sm text-gray-400'>or Create with email</p>
              <hr className='border-gray-300 dark:border-gray-600 flex-grow border-1' />
            </div>

            <div className='flex flex-col gap-3'>
              <div className='flex flex-row gap-3'>
                <Input size='md' variant='bordered' type='text' label='Firstname' />
                <Input size='md' variant='bordered' type='text' label='Lastname' />
              </div>
              <Input size='md' variant='bordered' type='email' label='Email' />
              <Input size='md' variant='bordered' type='password' label='Password' />
              <Input size='md' variant='bordered' type='password' label='Comfirm Password' />
            </div>

            <div className='mt-2 mb-4 flex justify-between items-center'>
              <Checkbox defaultSelected size="md"><p className='font-light text-xs sm:text-sm text-gray-400'>Keep me logged in</p></Checkbox>
            </div>

            <div className='flex items-center'>
              <Button className='w-full text-white' color='primary' size='lg' endContent={<FaWandMagicSparkles />}>Create an Account</Button>
            </div>

            <div className='w-full flex justify-center mt-3 gap-2 items-center'>
              <p className='text-center font-semibold text-xs sm:text-sm text-gray-400'>Already have an account?</p>
              <a className='text-center font-bold text-xs sm:text-sm text-[#FF639B] hover:text-[#EC588E]' href='/auth/login'>
                Login
              </a>
            </div>
          </form>
        </div>

      </div>
    </section>
  )
}