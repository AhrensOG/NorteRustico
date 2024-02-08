import React from 'react'

const SelectInputCard = ({ value, removeValue }) => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center border border-blue-800 py-0.5 px-2  rounded-3xl text-blue-800 text-xs">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#0040AF"
        className="w-5 h-5 cursor-pointer"
        onClick={() => removeValue(value)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      {
        value.name.length > 10
        ? (value.name.slice(0, 10) + '...' )
        : value.name
      }
    </div>
  )
}

export default SelectInputCard