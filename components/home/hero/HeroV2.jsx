import React from "react";
import Carousel from "./auxiliarComponents/Carousel";

const images = [
  {
    name: "hero1",
    url: "https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/30%25OFF.jpeg?alt=media&token=c27580ad-fe66-4155-8e4e-5b107b1a1c90",
  },
  {
    name: "hero2",
    url: "https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/Hero1.webp?alt=media&token=65b0c7c0-f53d-4c49-a612-4b9cbc97a5d7",
  },
  {
    name: "hero3",
    url: "https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/Hero2.webp?alt=media&token=9c380585-ca96-48f1-ab96-70d8cfc7ad40",
  },
  {
    name: "hero4",
    url: "https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/Products%2FIMG-20240229-WA0148.jpg?alt=media&token=e3788e1f-8776-4faf-82eb-1b9954157c82",
  },
  {
    name: "hero5",
    url: "https://firebasestorage.googleapis.com/v0/b/norte-rustico.appspot.com/o/carandillo.jpeg?alt=media&token=34edc482-6b12-4fab-b922-b47bc9c224df",
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
