import UserInfo from '@/components/adminComponents/UserInfo'
import { faArrowLeft, faCalendar, faTable, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

export default function NavbarAdmin() {
    return (
        <nav className='bg-gray-400 p-2'>
            <ul className='flex justify-between items-center'>
                <li>
                    <Link href='/' className='px-4  text-sm  hover:text-primary transition-colors duration-300 text-white'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                    <Link href='/admin' className='px-4  text-sm  hover:text-primary transition-colors duration-300 text-white'>
                        <FontAwesomeIcon icon={faTable} />
                    </Link>
                    <Link href='/admin/calendario' className='px-4  text-sm  hover:text-primary transition-colors duration-300 text-white'>
                        <FontAwesomeIcon icon={faCalendar} />
                    </Link>
                    <Link href='/register' className='px-4  text-sm  hover:text-primary transition-colors duration-300 text-white'>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </Link>
                </li>
                <li>
                    <UserInfo />
                </li>
            </ul>
        </nav>
    )
}
