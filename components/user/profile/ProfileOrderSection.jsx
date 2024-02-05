import React from 'react'
import ProfileOrderDropDown from './auxiliarComponents/ProfileOrderDropDown'

const ProfileOrderSection = () => {
  return (
    <div className='w-full md:border-2 rounded-md p-2'>
      <div className='flex flex-col gap-2'>
        <span className='text-lg sm:text-xl font-medium'>Ordenes</span>
        <div className='flex flex-col gap-4 overflow-y-scroll max-h-80 scrollbar-thin scrollbar-thumb-[#CA995D] scrollbar-track-[#CA995D]/50 pr-1'>
          <ProfileOrderDropDown/>
          <ProfileOrderDropDown/>
          <ProfileOrderDropDown/>
          <ProfileOrderDropDown/>
          <ProfileOrderDropDown/>
        </div>
      </div>
    </div>
  )
}

export default ProfileOrderSection