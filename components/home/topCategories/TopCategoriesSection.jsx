import React from 'react'
import TopCategoriesSectionCard from './auxiliarComponents/TopCategoriesSectionCard'

const TopCategoriesSection = () => {
  return (
    <div className='w-full pt-16 flex flex-row justify-center items-center'>
      <div className='flex flex-row flex-wrap justify-center items-center w-full gap-8 max-w-screen-xl'>
        <TopCategoriesSectionCard title={"Tejido Chaguar"} link={"Chaguar"} img={'https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/chaguar.jpeg?alt=media&token=a7d63861-9310-4aab-b12f-5b18a4c5b4ae'}/>
        <TopCategoriesSectionCard title={"Tejido Lana de Oveja"} link={"Lana de Oveja"} img={'https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/imagenLana.webp?alt=media&token=c4c36921-0a27-442e-ab31-399d27f5ce78'}/>
        <TopCategoriesSectionCard title={"Carandillo"} link={"Carandillo"} img={'https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/carandillo.jpeg?alt=media&token=34edc482-6b12-4fab-b922-b47bc9c224df'}/>
      </div>
    </div>
  )
}

export default TopCategoriesSection