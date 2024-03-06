import React from "react";
import Carousel from "./auxiliarComponents/Carousel";

const images = [
  {
    name: "hero1",
    url: "https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/Carrusel%20web%201.webp?alt=media&token=c9f7ee17-ee0c-41c0-9440-007ba28f285d",
  },
  {
    name: "hero2",
    url: "https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/Carrusel%20web%202.webp?alt=media&token=e763bb95-e91b-4a31-ad25-01e5ce7931b7",
  },
  {
    name: "hero3",
    url: "https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/Carrusel%20web%203.webp?alt=media&token=5112eb90-8672-484c-973e-472731fee8c7",
  },
  {
    name: "hero4",
    url: "https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/Carrusel%20web%204.webp?alt=media&token=370e287c-8c3d-464e-8e85-99d6f623f36f",
  },
  {
    name: "hero5",
    url: "https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/Carrusel%20-%20Movil%20-%205.webp?alt=media&token=e45cd725-fdad-49ee-b526-65146cda918f",
  },
];

const HeroV2 = () => {
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="max-w-screen-2xl relative w-full">
        <Carousel slides={images} autoSlide={true}/>
      </div>
    </div>
  );
};

export default HeroV2;
