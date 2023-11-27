'use client'

import React, { useEffect, useState } from 'react';
import { Switch } from '@nextui-org/switch';
import { MoonIcon, SunIcon } from '@/../public/Icon';
import { useTheme } from 'next-themes';
import Cookies from 'js-cookie';

export default function ThemeButton() {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { setTheme } = useTheme()

  useEffect(() => {
    const storedTheme = Cookies.get('theme')
    if (storedTheme) {
      setTheme(storedTheme)
      setIsSelected(storedTheme === 'dark')
    } else {
      setIsSelected(false)
    }
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = isSelected ? 'light' : 'dark'
    setIsSelected(!isSelected)
    setTheme(newTheme)
    Cookies.set('theme', newTheme, { expires: 365 })
  }

  return (
    <Switch
      defaultSelected
      size="md"
      color="success"
      startContent={<MoonIcon />}
      endContent={<SunIcon />}
      classNames={{ wrapper: "mr-0" }}
      isSelected={isSelected}
      onValueChange={toggleTheme}
    >
    </Switch>
  )
}