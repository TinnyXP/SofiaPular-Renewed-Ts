'use client'

import React from 'react';
import Image from 'next/image';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/navbar';
import { Dropdown, DropdownMenu, DropdownItem, DropdownTrigger } from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { HeartIcon, ChevronDown } from '@/../public/Icon';
import ThemeButton from '@/components/ThemeButton';
import ProfileAvatar from '@/components/ProfileAvatar';
import { FaAlignLeft } from 'react-icons/fa6';

export default function NavBarAdmin() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    { label: 'สมาชิก', href: '/admin/members' },
    { label: 'รีวิว', href: '/admin/reviews' },
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
        <NavbarItem>
          <Link color='foreground' href='/admin/members' aria-current='page' size='md'>สมาชิก</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='/admin/reviews' aria-current='page' size='md'>รีวิว</Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeButton />
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color='primary' href='/admin' variant='shadow' size='md'>
            <FaAlignLeft />แอดมินแดชบอร์ด
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
          <NavbarItem>
            <Button as={Link} color='primary' href='/admin' variant='shadow' size='md' className='w-full'>
              <FaAlignLeft />แอดมินแดชบอร์ด
            </Button>
          </NavbarItem>
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