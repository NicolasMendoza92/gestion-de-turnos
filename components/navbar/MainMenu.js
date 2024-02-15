import Link from 'next/link'
import React from 'react'

export default function MainMenu() {
    return (
        <ul className='flex flex-col lg:flex-row items-center gap-4'>
            <li>
                <Link
                    href='#home'
                    className='py-2 px-4 border-b-2 border-primary transition-colors duration-300 text-white'
                >
                    Home
                </Link>
            </li>
            <li>
                <Link
                    href='#services'
                    className='py-2 px-4 border-b-2 border-transparent hover:border-primary transition-colors duration-300 text-white'
                >
                    Servicios
                </Link>
            </li>
            <li>
                <Link
                    href='#reserves'
                    className='py-2 px-4 border-b-2 border-transparent hover:border-primary transition-colors duration-300 text-white'
                >
                    Reservas
                </Link>
            </li>
        </ul>
    )
}