import Image from "next/image";
import React, { useEffect, useState } from "react";

const images = [
  {
    url: "https://firebasestorage.googleapis.com/v0/b/imperioferreteria-b30b3.appspot.com/o/Empresa%2FnoPhoto.png?alt=media&token=68de4d79-7127-49ba-bdab-75d573d7aee9",
  },
];

const AdminPanelCarousel = ({
  slides = images,
  autoSlide = false,
  autoSlideInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stopAutoSlide, setStopAutoSlide] = useState(false);

  const prevSlide = () =>
    setCurrentIndex((curr) => (curr === 0 ? slides.length - 1 : curr - 1));

  const nextSlide = () =>
    setCurrentIndex((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    if (stopAutoSlide) return;
    const slideInterval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [stopAutoSlide]);

  return (
    <div className={`w-full h-80 xs:h-[330px] sm:h-[350px] md:h-[400px] relative group`}>
      <div className="relative w-full h-80 xs:h-[330px] sm:h-[350px] md:h-[400px] duration-500">
        <div className="w-full h-full absolute z-10"/>
        <Image
          src={slides[currentIndex]?.url || ''}
          alt={slides[currentIndex]?.name || ''}
          fill
          className="rounded-md object-cover object-center transition-opacity opacity-0 duration-500"
          onLoad={(event) => event.target.classList.remove("opacity-0")}
          sizes="(max-width: 550px) 100vw, 550px"
          priority={true}
          quality={100}
        />
      </div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          onClick={prevSlide}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          onClick={nextSlide}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default AdminPanelCarousel;
