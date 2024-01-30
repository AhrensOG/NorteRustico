import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-row justify-center items-center'>
      <div className='grid grid-cols-6 grid-rows-2 max-w-screen-2xl w-full'>
        <div className='col-span-4 bg-[#C9140F] flex flex-row items-center justify-center px-4'>
          <div className='flex flex-col items-start'>
            <span className='xs:text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl text-white uppercase font-semibold tracking-tight'>Envios gratis</span>
            <span className='text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white uppercase font-extrabold tracking-widest'>30%OFF</span>
          </div>
        </div>
        <Image src={'/Hero2.png'} width={1000} height={1000} alt='HeroImage' priority={true} className='col-span-2 w-full h-32 xs:h-40 sm:h-52 md:h-60 lg:h-72 xl:h-96 object-center object-cover'/>
        <Image src={'/Hero1.png'} width={1000} height={1000} alt='HeroImage' priority={true} className='col-span-3 w-full h-32 xs:h-40 sm:h-52 md:h-60 lg:h-72 xl:h-96 object-center object-cover'/>
        <div className='bg-black col-span-3 flex flex-row justify-center items-center px-4'>
          <span className='text-white xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl uppercase font-semibold'>Titulo</span>
        </div>
      </div>
    </div>
  )
}

export default Hero