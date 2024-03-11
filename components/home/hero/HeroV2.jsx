import React, { useContext } from "react";
import Carousel from "./auxiliarComponents/Carousel";
import { Context } from "@/app/context/GlobalContext";

const HeroV2 = () => {
  const { state } = useContext(Context);
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="max-w-screen-2xl relative w-full">
        {state.organization?.OrganizationImages?.length > 0 ? (
          <Carousel
            slides={state.organization?.OrganizationImages}
            autoSlide={true}
          />
        ) : (
          <div className="w-full h-96 xs:h-[440px] sm:h-[500px] md:h-[550px] p-2">
            <div className="bg-black/30 w-full h-full rounded-md animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroV2;
