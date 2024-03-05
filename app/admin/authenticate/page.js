import Authentication from "@/components/auth/Authentication";
import Image from "next/image";
import React from "react";

const AdminAuthenticationPage = () => {
  return (
    <div className="w-full h-full sm:flex flex-row">
      <div className="w-full hidden sm:flex flex-row justify-center items-center bg-[#CA995DB2] p-6 max-h-screen">
        <Image
          src={"/SecondaryLogo.png"}
          width={1000}
          height={1000}
          sizes="35vw"
          alt="Logo"
          priority
          className="w-auto h-auto"
        />
      </div>
      <div className="w-full h-full sm:max-w-screen-sm">
        <Authentication redirect="/admin/panel" />
      </div>
    </div>
  );
};

export default AdminAuthenticationPage;
