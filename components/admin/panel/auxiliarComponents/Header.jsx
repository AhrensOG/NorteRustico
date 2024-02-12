import React from 'react'

const Header = ({ title = 'Productos' }) => {
  return (
    <div className="flex flex-row w-full justify-between items-end">
          <h1 className="text-3xl text-black/70 font-bold">{title}</h1>
          <img
            src="/Product.png"
            alt="ProfileImage"
            className="w-16 h-16 rounded-full"
          />
        </div>
  )
}

export default Header