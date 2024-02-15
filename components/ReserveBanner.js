import React from 'react'
import Image from 'next/image'
import ReservaForm from './forms/ReservaForm'


export default function ReserveBanner() {
    return (
        <section id='reserves'>
            <div className='relative w-full h-screen m-auto'>
                <Image
                    src='/images/barbershop.webp'
                    alt='barber'
                    fill
                    className='object-cover'
                    sizes='max'
                />
                <div>
                    <div className='absolute bg-gradient-to-tr from-black to-transparent left-0 top-0 w-full h-full' />
                    <div className='relative flex justify-center items-center min-h-screen'>
                        <div>
                            <h1 className='text-7xl text-center text-white font-bold mb-10'> Reserva tu lugar</h1>
                            <ReservaForm/>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}