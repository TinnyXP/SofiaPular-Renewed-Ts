'use client';

import React, { useState, useEffect, useMemo } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, Button, Chip } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { FaEye, FaGoogle, FaLine, FaTrash } from "react-icons/fa6";
import { SiLine } from "react-icons/si";

interface Member {
  id: string,
  sub: string,
  name: string,
  email: string,
  image: string,
  provider: string,
}

export default function App() {

  return (
    <section className='w-full flex justify-center my-10'>
      <TableMembers />
    </section>
  );
};

const TableMembers = () => {

  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    const getMembers = async () => {
      const response = await fetch('/api/members', { cache: 'no-store' })
      const data = await response.json()
      setMembers(data)
    }
    getMembers()
  }, [])

  const handleDelete = async (member: Member) => {
    try {
      const response = await fetch(`/api/members/${member.id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (response.ok) {
        alert('Member deleted successfully')
        setMembers(members.filter((member: Member) => member.id !== data.id))
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='max-w-7xl'>
      <Table aria-label='Members Table'>
        <TableHeader>
          <TableColumn>ACCOUNT</TableColumn>
          <TableColumn>PROVIDER</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {members.map((member, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className='flex gap-2'>
                  <Image width={44} src={member.image} alt='Profile Photo' />
                  <div className='flex flex-col'>
                    <p className='text-base'>{member.name}</p>
                    <p className='text-xs text-zinc-400'>{member.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Chip className={member.provider === 'LINE' ? 'bg-emerald-400 dark:bg-emerald-600' : member.provider === 'GOOGLE' ? 'bg-red-400 dark:bg-red-600' : ''}>
                  <div className='flex gap-1 items-center'>
                    <p className="text-white">{member.provider === 'LINE' ? <SiLine className='mb-0.5' size={15} /> : member.provider === 'GOOGLE' ? <FaGoogle className='mb-0.5' size={15} /> : null}</p>
                    <p className="text-white">{member.provider}</p>
                  </div>
                </Chip>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-1'>
                  <Button color='default' className='text-zinc-600 dark:text-white' variant='solid' isIconOnly radius='full' size='sm'><FaEye size={18} /></Button>
                  <Button color='danger' variant='solid' isIconOnly radius='full' size='sm' onClick={() => handleDelete(member)}><FaTrash className='text-white' size={14} /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}