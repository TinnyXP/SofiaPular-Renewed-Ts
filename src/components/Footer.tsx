'use client'

import React from 'react';
import Image from 'next/image';
import { Button } from '@nextui-org/button';
import { SignatureIcon } from '@/../public/Icon';
import { FaFacebook, FaInstagram, FaXTwitter, FaEnvelope, FaYoutube } from "react-icons/fa6";

export default function Footer() {

    const links = [
        {
            href: 'https://www.facebook.com/sofiapularart',
            icon: <FaFacebook size={18} />,
            className: 'hover:bg-blue-500 hover:text-white',
            label: 'Facebook'
        },

        {
            href: 'https://www.instagram.com/sofiapular/',
            icon: <FaInstagram size={18} />,
            className: 'hover:bg-rose-400 hover:text-white',
            label: 'Instagram'
        },

        {
            href: 'https://twitter.com/SofiaPular',
            icon: <FaXTwitter size={18} />,
            className: 'hover:bg-zinc-800 hover:text-white',
            label: 'Twitter'
        },

        {
            href: 'https://www.youtube.com/@sofiapular',
            icon: <FaYoutube size={18} />,
            className: 'hover:bg-red-500 hover:text-white',
            label: 'Youtube'
        },

        {
            href: 'mailto:trin.pongsri@gmail.com',
            icon: <FaEnvelope size={18} />,
            className: 'hover:bg-emerald-500 hover:text-white',
            label: 'Email'
        },
    ];

    return (
        <footer className='px-10 py-8 relative'>
            <div className='flex flex-col justify-center items-center gap-3'>
                <div className='flex justify-center gap-2'>
                    {links.map((link) => (
                        <a key={link.href} href={link.href}>
                            <Button className={`button ${link.className}`} isIconOnly radius='full' size='sm' aria-label={link.label}>
                                {link.icon}
                            </Button>
                        </a>
                    ))}
                </div>
                <a className='relative tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-60 active:opacity-disabled transition-opacity flex justify-end items-center gap-2 text-foreground hover:cursor-pointer'
                    href='https://www.sofiapular.com/'
                >
                    <span className='text-xs font-medium flex items-center leading-none mt-1'>&copy;2023 Copyright</span>
                    <SignatureIcon className='w-[65px] h-[20px] fill-black dark:fill-white' />
                </a>
            </div>
            <Image
                width={0}
                height={0}
                src='/img/cut/Kwang.png'
                className='h-[460px] w-[322px] absolute bottom-0 left-0 z-10 hidden xl:block filter drop-shadow-lg'
                alt={'Kwang Animation'}
            />
        </footer>
    )
}
