import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='grid grid-cols-6 grid-rows-2'>
      <div className='col-span-4 bg-[#C9140F] flex flex-row items-center justify-center'>
        <div className='flex flex-col items-start'>
          <span className='text-6xl text-white uppercase font-semibold tracking-tight'>Envios gratis</span>
          <span className='text-9xl text-white uppercase font-extrabold tracking-widest'>30%OFF</span>
        </div>
      </div>
      <Image src={'/Hero2.png'} width={1000} height={1000} alt='HeroImage' priority={true} className='col-span-2 w-full h-72 object-center object-cover'/>
      <Image src={'/Hero1.png'} width={1000} height={1000} alt='HeroImage' priority={true} className='col-span-3 w-full h-72 object-center object-cover'/>
      <span className='bg-black col-span-3 text-white text-8xl uppercase flex flex-row justify-center items-center font-semibold'>Titulo</span>
    </div>
  )
}

export default Hero