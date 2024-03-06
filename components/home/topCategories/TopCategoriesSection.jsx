import React from 'react'
import TopCategoriesSectionCard from './auxiliarComponents/TopCategoriesSectionCard'

const TopCategoriesSection = () => {
  return (
    <div className='w-full pt-16 flex flex-row justify-center items-center'>
      <div className='flex flex-row flex-wrap justify-center items-center w-full gap-8 max-w-screen-xl'>
        <TopCategoriesSectionCard title={"Tejido Chaguar"} link={"Chaguar"} img={'https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/TejidoChaguar.webp?alt=media&token=ec50e930-3442-4496-b326-f3c9b9212a4c'}/>
        <TopCategoriesSectionCard title={"Tejido Lana de Oveja"} link={"Lana de Oveja"} img={'https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/TejidoLanaDeOveja.webp?alt=media&token=c494ad4c-4155-4842-8119-df745e8492de'}/>
        <TopCategoriesSectionCard title={"Carandillo"} link={"Carandillo"} img={'https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/Carandillo.webp?alt=media&token=62345f16-6a41-43cc-ad80-26663d0c00f6'}/>
      </div>
    </div>
  )
}

export default TopCategoriesSection