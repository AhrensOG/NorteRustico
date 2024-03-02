import Image from "next/image";
import React from "react";

const ImageInputCard = ({ value, removeValue, fullName = false }) => {
  return (
    <div className="group flex flex-row gap-2 justify-center items-center border border-blue-800 p-1 rounded-md text-blue-800 text-xs relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#0040AF"
        className="w-5 h-5 cursor-pointer absolute z-10 top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={() => removeValue(value)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="w-14 h-14 relative">
        <Image
          src={value.url}
          fill
          alt={value.name}
          className="rounded-md object-cover object-center transition-opacity opacity-0 duration-500"
          onLoad={(event) => event.target.classList.remove("opacity-0")}
          sizes="(max-width: 56px) 1vw, 56px"
          loading="lazy"
          quality={50}
        />
      </div>
      {/* {fullName
        ? value.name
        : value.name.length > 10
        ? value.name.slice(0, 10) + "..."
        : value.name} */}
    </div>
  );
};

export default ImageInputCard;
