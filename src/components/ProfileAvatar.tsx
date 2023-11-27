import React from 'react'
import { 
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger 
} from '@nextui-org/dropdown';
import { Avatar } from '@nextui-org/avatar';
import { CircularProgress } from "@nextui-org/progress";
import { 
  FaRightToBracket,
  FaRightFromBracket,
  FaWandMagicSparkles,
  FaBookmark,
} from 'react-icons/fa6';

export default function ProfileAvatar() {

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