'use client'

import React from 'react'
import { Input } from "@nextui-org/input";
import { Button } from '@nextui-org/button';
import { Checkbox } from "@nextui-org/checkbox";
import { FaGoogle, FaRightToBracket } from 'react-icons/fa6';
import { SiLine } from "react-icons/si";

export default function Page() {

  return (
    <section className='bg-gray-100 dark:bg-black h-screen'>
      <div className='flex justify-center items-center h-screen mx-5'>

        <div className='sm:bg-white sm:dark:bg-zinc-900 sm:drop-shadow-md sm:rounded-lg sm:p-8 sm:w-[460px]'>
          <form>
            <h1 className='text-gray-900 dark:text-white text-2xl font-bold sm:text-3xl'>Login in to your Account</h1>
            <p className='mt-1 mb-5 leading-relaxed text-gray-500'>Welcome! please login to your account to continue.</p>

            <div className='flex items-center justify-between flex-col gap-3'>
              <Button className='w-full drop-shadow-md bg-red-400 text-white dark:bg-red-500' size='lg' startContent={<FaGoogle size={20} />}>Continue with google</Button>
              <Button className='w-full drop-shadow-md bg-emerald-500 text-white dark:bg-emerald-600' size='lg' startContent={<SiLine size={20} />}>Continue with LINE</Button>
            </div>

            <div className='flex items-center justify-center my-5'>
              <hr className='border-gray-300 dark:border-gray-600 flex-grow border-1' />
              <p className='mx-4 font-medium text-xs sm:text-sm text-gray-400'>or Login with email</p>
              <hr className='border-gray-300 dark:border-gray-600 flex-grow border-1' />
            </div>

            <div className='flex flex-col gap-3'>
              <Input size='md' variant='bordered' type='email' label='Email' />
              <Input size='md' variant='bordered' type='password' label='Password' />
            </div>

            <div className='mt-2 mb-4 flex justify-between items-center'>
              <Checkbox defaultSelected size="md"><p className='font-light text-xs sm:text-sm text-gray-400'>Keep me logged in</p></Checkbox>
              <a className='inline-block align-baseline font-bold text-xs sm:text-sm text-[#FF639B] hover:text-[#EC588E]' href='#'>Forgot Password?</a>
            </div>

            <div className='flex items-center'>
              <Button className='w-full text-white' color='primary' size='lg' endContent={<FaRightToBracket />}>Log In</Button>
            </div>

            <div className='w-full flex justify-center mt-3 gap-2 items-center'>
              <p className='text-center font-semibold text-xs sm:text-sm text-gray-400'>Don&apos;t have an account?</p>
              <a className='text-center font-bold text-xs sm:text-sm text-[#FF639B] hover:text-[#EC588E]' href='/auth/createAccount'>
                Create an account
              </a>
            </div>
          </form>
        </div>

      </div>
    </section>
  )
}
