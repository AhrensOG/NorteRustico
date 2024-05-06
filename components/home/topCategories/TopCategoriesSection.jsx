import React from 'react'
import TopCategoriesSectionCard from './auxiliarComponents/TopCategoriesSectionCard'

const TopCategoriesSection = () => {
  return (
    <div className='w-full pt-16 flex flex-row justify-center items-center'>
      <div className='flex flex-row flex-wrap justify-center items-center w-full gap-8 max-w-screen-xl'>
        <TopCategoriesSectionCard title={"Tejido Chaguar"} link={"Chaguar"} img={'https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/BolsosChaguar.jpeg?alt=media&token=f8419f3f-302d-40f8-bc02-8f359dd0d022'}/>
        <TopCategoriesSectionCard title={"Tejido Lana de Oveja"} link={"Lana de Oveja"} img={'https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/TejidoDeLanaOveja.jpeg?alt=media&token=eb0ae360-335a-4fb9-a49f-ca0356e4ef9a'}/>
        <TopCategoriesSectionCard title={"Carandillo"} link={"Carandillo"} img={'https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/Carandillo.webp?alt=media&token=62345f16-6a41-43cc-ad80-26663d0c00f6'}/>
      </div>
    </div>
  )
}

export default TopCategoriesSection