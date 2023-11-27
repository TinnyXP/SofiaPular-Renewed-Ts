'use client'

import React from 'react';
import Image from 'next/image';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/navbar';
import { Dropdown, DropdownMenu, DropdownItem, DropdownTrigger } from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { HeartIcon, ChevronDown } from '@/../public/Icon';
import ThemeButton from '@/components/ThemeButton';
import ProfileAvatar from './ProfileAvatar';

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        { label: 'อ่านการ์ตูน', href: '/comic' },
        { label: 'ตัวละคร', href: '/character' },
        { label: 'รีวิว', href: '/review' },
    ];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth='2xl' isBordered shouldHideOnScroll>
            <NavbarContent>
                <NavbarBrand>
                    <Link href='/page'>
                        <Image width={0} height={0} src='/Signature.svg' className='w-[140px] h-[35px]' alt='Website Logo' />
                    </Link>
                </NavbarBrand>
                <NavbarItem className='sm:hidden flex gap-2'>
                    <ProfileAvatar />
                </NavbarItem>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    className='sm:hidden'
                />
            </NavbarContent>
            <NavbarContent className='hidden sm:flex gap-5 z-10' justify='end'>
                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                            <Button disableRipple className='p-0 min-w-unit-0 gap-1 bg-transparent data-[hover=true]:bg-transparent h-8' radius='sm' variant='light' size='lg'>
                                อ่านการ์ตูน<ChevronDown />
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu aria-label='Static Actions' color='primary'>
                        <DropdownItem key='MainComic' onClick={() => window.location.href = '/page/comic/mainComic'}>เนื่อเรื่องหลัก</DropdownItem>
                        <DropdownItem key='ShortComic' onClick={() => window.location.href = '/page/comic/shortComic'}>เนื่อเรื่องเสริม</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavbarItem>
                    <Link color='foreground' href='/page/character' aria-current='page' size='md'>ตัวละคร</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color='foreground' href='/page/review' aria-current='page' size='md'>รีวิว</Link>
                </NavbarItem>
                <NavbarItem>
                    <ThemeButton />
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color='primary' href='/page/support' variant='shadow' size='md'>
                        <HeartIcon />Support
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <ProfileAvatar />
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link color='foreground' className='w-full' href={item.href} size='md'>{item.label}</Link>
                    </NavbarMenuItem>
                ))}
                <NavbarItem>
                    <Button as={Link} color='primary' href='/page/support' variant='shadow' size='md' className='w-full'>
                        <HeartIcon />Support
                    </Button>
                </NavbarItem>
                <hr className='my-2 border-t-1 dark:border-zinc-800' />
                <div className='flex flex-row items-center'>
                    <p className='text-base mr-2 text-black dark:text-white'>Darkmode :</p>
                    <ThemeButton />
                </div>
            </NavbarMenu>
        </Navbar>
    )
}