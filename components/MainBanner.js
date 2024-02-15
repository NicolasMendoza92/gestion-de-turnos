import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function MainBanner() {
    return (
        <section id='home'>
            <div className='relative w-full h-screen'>
                <Image
                    src='/images/barber.webp'
                    alt='barber'
                    fill
                    className='object-cover'
                    sizes='max'
                />
                <div>
                    <div className='absolute bg-gradient-to-tr from-black to-transparent left-0 top-0 w-full h-full' />
                    <div className='absolute top-1/2 -translate-y-1/2 left-1/2 lg:left-60 -translate-x-1/2 lg:translate-x-0 space-y-10'>
                        <h1 className='text-white text-6xl lg:text-9xl font-semibold text-center lg:text-left'>
                            Tu look <br /> Tu estilo
                        </h1>
                        <p className='text-center text-gray-500 text-2xl  md:text-gray-500 text-2xl text-start'>
                            No hay hombres feos, <br /> solo hombres que no conocen un buen barbero.
                        </p>
                        <div className='flex flex-col sm:flex-row items-center gap-5'>
                            <Link  href='#reserves' 
                            className='py-2 px-4 bg-primary text-white rounded-lg border-2 border-transparent hover:bg-transparent hover:border-primary hover:text-primary transition-colors duration-300'> 
                            Haz tu reserva </Link>
                            <Link  href='#services'
                            className='py-2 px-4 bg-transparent text-white rounded-lg border-2 border-primary hover:bg-primary hover:border-transparent hover:text-white transition-colors duration-300' > 
                            Ver servicios </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}