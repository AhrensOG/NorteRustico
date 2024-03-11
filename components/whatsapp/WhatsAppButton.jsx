"use client";
import { Context } from "@/app/context/GlobalContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useContext } from "react";

const WhatsAppButton = () => {
  const pathname = usePathname();
  const { state } = useContext(Context);

  if (pathname === "/admin/panel" || pathname === "/authenticate") {
    return null;
  }

  return (
    <div>
      <Link
        href={
          state.organization?.whatsAppLink
            ? state.organization?.whatsAppLink
            : "/"
        }
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          viewBox="0 0 512 512"
          className="w-14 h-14 fixed z-10 bottom-8 right-8 cursor-pointer"
        >
          <path
            d="m0 512 35.31-128C12.359 344.276 0 300.138 0 254.234 0 114.759 114.759 0 255.117 0S512 114.759 512 254.234 395.476 512 255.117 512c-44.138 0-86.51-14.124-124.469-35.31L0 512z"
            style={{
              fill: "#ededed",
            }}
          />
          <path
            d="m137.71 430.786 7.945 4.414c32.662 20.303 70.621 32.662 110.345 32.662 115.641 0 211.862-96.221 211.862-213.628S371.641 44.138 255.117 44.138 44.138 137.71 44.138 254.234c0 40.607 11.476 80.331 32.662 113.876l5.297 7.945-20.303 74.152 75.916-19.421z"
            style={{
              fill: "#55cd6c",
            }}
          />
          <path
            d="m187.145 135.945-16.772-.883c-5.297 0-10.593 1.766-14.124 5.297-7.945 7.062-21.186 20.303-24.717 37.959-6.179 26.483 3.531 58.262 26.483 90.041s67.09 82.979 144.772 105.048c24.717 7.062 44.138 2.648 60.028-7.062 12.359-7.945 20.303-20.303 22.952-33.545l2.648-12.359c.883-3.531-.883-7.945-4.414-9.71l-55.614-25.6c-3.531-1.766-7.945-.883-10.593 2.648l-22.069 28.248c-1.766 1.766-4.414 2.648-7.062 1.766-15.007-5.297-65.324-26.483-92.69-79.448-.883-2.648-.883-5.297.883-7.062l21.186-23.834c1.766-2.648 2.648-6.179 1.766-8.828l-25.6-57.379c-.884-2.649-3.532-5.297-7.063-5.297"
            style={{
              fill: "#fefefe",
            }}
          />
        </svg>
      </Link>
    </div>
  );
};

export default WhatsAppButton;
