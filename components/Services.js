import React from 'react'
import Title from './ui/Title'
import Service from './ui/Service'


export default function Services() {
  return (
    <section id='services' className='min-h-screen flex items-center justify-center mb-10 lg:mb-0'>
      <div className='text-center'>
        <Title title='Nuestros servicios' />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20'>
          <Service
            image='/icons/herramientas.png'
            title='Corte'
            description=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, odio.'
          />
          <Service
            image='/icons/silla.png'
            title='Comodidad'
            description=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, odio.'
          />
          <Service
            image='/icons/pelo.png'
            title='Estilo'
            description=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, odio.'
          />
          <Service
            image='/icons/afeitar.png'
            title='Detalle'
            description=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, odio.'
          />
          <Service
            image='/icons/beer.png'
            title='Buenos momentos'
            description=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, odio.'
          />
          <Service
            image='/icons/auriculares.webp'
            title='Buena musica'
            description=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, odio.'
          />
        </div>
      </div>

    </section>
  )
}