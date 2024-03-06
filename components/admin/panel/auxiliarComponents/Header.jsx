"use client";
import { Context } from "@/app/context/GlobalContext";
import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";

const Header = ({ title = "Productos" }) => {
  const { state } = useContext(Context);
  useEffect(() => {}, [state.user])
  
  return (
    <div className="flex flex-row w-full justify-between items-end">
      <h1 className="text-3xl text-black/70 font-bold">{title}</h1>
      <div className="w-16 h-16 relative">
        <Image
          src={ state.user?.profileImage || "/Product.png"}
          alt="ProfileImage"
          fill
          className="rounded-full object-cover object-center transition-opacity opacity-0 duration-500"
          onLoad={(event) => event.target.classList.remove("opacity-0")}
          sizes="(max-width: 64px) 25vw, 64px"
          priority={true}
          quality={100}
        />
      </div>
    </div>
  );
};

export default Header;
