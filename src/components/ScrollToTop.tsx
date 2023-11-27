'use client';

import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { FaAnglesUp } from 'react-icons/fa6'
import { motion } from 'framer-motion'

const MotionButton = motion(Button)

export default function ScrollToTop() {
  const [backToTopButton, setBackToTopButton] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true)
      } else {
        setBackToTopButton(false)
      }
    })
  }, [])

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      {backToTopButton && (
        <MotionButton
          key="backToTopButton"
          className='fixed bottom-5 right-5 bg-[#FF639B] text-white z-10 drop-shadow-md 
              transition-all duration-300 ease-in-out hover:drop-shadow-lg hover:bg-[#FF5995]
              md:bottom-7 md:right-7'
          isIconOnly
          radius='full'
          size='md'
          onClick={backToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaAnglesUp size={22} />
        </MotionButton>
      )}
    </div>
  )
}