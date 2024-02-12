import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/admin/panel") {
    return null;
  }
  return (
    <div className="bg-black grid grid-cols-1 xs:grid-cols-3 gap-10 xs:gap-0 p-8">
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center xs:items-start gap-3">
          <span className="text-white">Seguínos en nuestras redes</span>
          <div className="flex flex-row gap-6">
            <Link href={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 5.013 3.693 9.153 8.505 9.876V14.65H8.031v-2.629h2.474v-1.749c0-2.896 1.411-4.167 3.818-4.167 1.153 0 1.762.085 2.051.124v2.294h-1.642c-1.022 0-1.379.969-1.379 2.061v1.437h2.995l-.406 2.629h-2.588v7.247C18.235 21.236 22 17.062 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </Link>
            <Link href={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                fill="white"
                className="w-6 h-6"
              >
                <path d="M16 3C8.832 3 3 8.832 3 16v18c0 7.168 5.832 13 13 13h18c7.168 0 13-5.832 13-13V16c0-7.168-5.832-13-13-13H16zm0 2h18c6.086 0 11 4.914 11 11v18c0 6.086-4.914 11-11 11H16C9.914 45 5 40.086 5 34V16C5 9.914 9.914 5 16 5zm21 6a2 2 0 0 0-2 2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0-2-2zm-12 3c-6.063 0-11 4.937-11 11s4.937 11 11 11 11-4.937 11-11-4.937-11-11-11zm0 2c4.982 0 9 4.018 9 9s-4.018 9-9 9-9-4.018-9-9 4.018-9 9-9z" />
              </svg>
            </Link>
            <Link href={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                fill="white"
                className="w-6 h-6"
              >
                <path d="m5.92 6 14.662 21.375L6.23 44h3.18l12.576-14.578 10 14.578H44L28.682 21.67 42.199 6h-3.17L27.275 19.617 17.934 6H5.92zm3.797 2h7.164l23.322 34H33.04L9.717 8z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center">
        <Link href={"/"}>
          <Image
            src={"/LogoFooter.png"}
            width={50}
            height={50}
            alt="Footer Logo"
            className="filter grayscale invert"
            priority
          />
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-row flex-wrap xs:flex-col xs:flex-nowrap items-start justify-center gap-6 xs:gap-1">
          <Link href={"/"}>
            <span className="text-white">Sobre Nostros</span>
          </Link>
          <Link href={"/"}>
            <span className="text-white">Contactanos</span>
          </Link>
          <Link href={"/"}>
            <span className="text-white">Centro de Ayuda</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
