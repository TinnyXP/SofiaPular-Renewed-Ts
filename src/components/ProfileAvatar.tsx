import React from 'react'
import { 
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger 
} from '@nextui-org/dropdown';
import { Avatar } from '@nextui-org/avatar';
import { CircularProgress } from "@nextui-org/progress";
import { useSession, signOut } from "next-auth/react"
import { 
  FaRightToBracket,
  FaRightFromBracket,
  FaWandMagicSparkles,
  FaBookmark,
} from 'react-icons/fa6';

export default function ProfileAvatar() {

  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div><CircularProgress color='primary' aria-label='Loading...'/></div>
  }

  if (session) {
    return (
      <div>
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            isBordered
            as='button'
            className='transition-transform'
            color='default'
            name='Jason Hughes'
            size='md'
            src={session.user?.image ?? ''}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem 
            key='profile'
            color='primary' 
            className='h-14 gap-2'
            onClick={() => window.location.href = '/page/profile'}
          >
            <p className="font-semibold">Loged in as</p>
            <p className="font-semibold">{session.user?.email}</p>
          </DropdownItem>
          <DropdownItem 
            key='Bookmarks'
            startContent={<FaBookmark />}
          >
            <p className="font-regular">Bookmarks</p>
          </DropdownItem>
          <DropdownItem 
            key='logout' 
            color='danger' 
            onClick={() => signOut()}
            startContent={<FaRightFromBracket />}
          >
            <p className="font-semibold">Log Out</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    )
  }

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            isBordered
            as='button'
            className='transition-transform'
            color='default'
            name='Jason Hughes'
            size='md'
            src='/img/ProfileAvatarTemp/empty.png'
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem 
            key='login'
            color='primary'
            onClick={() => window.location.href = '/auth/login'}
            startContent={<FaRightToBracket />}
            >
              <p className="font-semibold">Log In</p>
          </DropdownItem>
          <DropdownItem 
            key='creaAnAccount'
            color='primary'
            onClick={() => window.location.href = '/auth/createAccount'}
            startContent={<FaWandMagicSparkles />}
            >
              <p className="font-semibold">Create An Account</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}