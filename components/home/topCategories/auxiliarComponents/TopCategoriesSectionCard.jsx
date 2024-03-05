import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopCategoriesSectionCard = ({ title, link, img }) => {
  return (
    <div className="max-w-96 max-h-96 group">
      <div className="relative w-64 h-64 xs:w-80 xs:h-80 sm:w-96 sm:h-96 overflow-hidden">
        <div className="group-hover:scale-110 duration-500 w-full h-full absolute">
          <Image
            src={img}
            fill
            alt="ProductImage"
            className="z-0 rounded-md object-cover object-center transition-opacity opacity-0 duration-500"
            onLoad={(event) => event.target.classList.remove("opacity-0")}
            sizes="(max-width: 250px) 25vw, 250px"
            priority={true}
            quality={100}
          />
        </div>
        <div className="bg-black/30 group-hover:bg-black/50 duration-500 absolute z-10 w-full h-full rounded-md"></div>
        <div className="absolute z-20 w-full h-full text-2xl xs:text-3xl sm:text-4xl text-white font-medium flex flex-col justify-center items-center">
          <span>{title}</span>
          <Link href={`/shop?category=${link}`}>
            <button className="py-0.5 xs:py-1 px-3 bg-orange-600 text-sm xs:text-base sm:text-xl rounded-md">
              Ver Más
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopCategoriesSectionCard;
