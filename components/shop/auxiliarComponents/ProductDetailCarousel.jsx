import React, { useEffect, useState } from "react";

const ProductDetailCarousel = ({
  images,
  autoSlide = true, 
  autoSlideInterval = 5000,
  lateralColum = false,
  favourites = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!autoSlide) return;
    const intervalId = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    //Clean the inventary after unmount component
    return () => clearInterval(intervalId);
  }, [currentIndex, autoSlideInterval]);

  return (
    <div className="w-full h-full flex flex-row justify-center items-center gap-1.5 md:gap-4">
      <div
        className={`${
          lateralColum
            ? " hidden md:flex flex-row justify-center items-center"
            : "hidden"
        }`}
      >
        <div className="flex flex-col justify-start items-center max-h-80 lg:max-h-96 gap-[14px]">
          {images.map((img, idx) => {
            return (
              <div
                key={img.id}
                className="p-0.5 border rounded-xl border-blue-500 cursor-pointer"
                onClick={() => setCurrentIndex(idx)}
              >
                <img
                  src={img.url}
                  width={50}
                  height={50}
                  alt="Image"
                  className="w-16 h-16 lg:w-20 lg:h-20 object-cover object-center rounded-xl"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative group w-full h-full">
        <div className="group-hover:block hidden">
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/20 text-white p-2 rounded-full"
            onClick={prevSlide}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/20 text-white p-2 rounded-full"
            onClick={nextSlide}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
        <img
          className="w-full h-full object-center object-cover rounded-3xl"
          src={images[currentIndex]?.url} 
          alt={`Slide ${currentIndex + 1}`}
        />
        {favourites === true && (
          <div className="w-full flex flex-row justify-center items-center py-2">
            <span className="text-[#C9140F] flex flex-row text-lg items-center gap-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-[#C9140F]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              Agregar a Favoritos
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailCarousel;
