"use client";
import SmallProductCard from "@/components/product/SmallProductCard";
import ProfileSection from "@/components/user/profile/ProfileSection";
import React from "react";

const ProfilePage = () => {

  return (
    <div className="flex flex-row justify-center items-center w-full">
      <div className="max-w-screen-lg w-full flex flex-col justify-center items-center">
        <ProfileSection />
        {/* Recommended Products */}
        <div className="w-full p-4 md:px-2 lg:px-0 pb-10">
          <span className="text-lg font-bold">Productos Recomendados</span>
          <div className="overflow-x-scroll flex flex-row gap-6 md:gap-10 scrollbar-thumb-[#CA995D] scrollbar-thin scrollbar-track-[#CA995D]/50">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <SmallProductCard key={value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
