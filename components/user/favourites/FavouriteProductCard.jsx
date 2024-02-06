import React from 'react'

const FavouriteProductCard = () => {
  return (
    <div className='w-full sm:max-w-none flex flex-row space-x-4 justify-center'>
      <img src="/Product.png" alt="ProductImage" className='w-16 h-16 rounded-md xs:w-20 xs:h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28' />
      <div className='w-full sm:w-auto flex flex-row sm:flex-col justify-between items-start py-2'>
        <span className='xs:text-base lg:text-lg font-medium'>Bolso QOM</span>
        <div className='flex flex-col justify-center items-end sm:items-start'>
          <span className='xs:text-base lg:text-lg font-medium'>$ 1500</span>
          <span className='xs:text-base lg:text-lg text-[#C9140F]'>Remover</span>
        </div>
      </div>
    </div>
  )
}

export default FavouriteProductCard