import React, { useContext } from "react";
import ProfileOrderDropDown from "./auxiliarComponents/ProfileOrderDropDown";
import { Context } from "@/app/context/GlobalContext";
import Link from "next/link";

const ProfileOrderSection = () => {
  const { state } = useContext(Context);
  return (
    <div className="w-full md:border-2 rounded-md p-2">
      <div className="flex flex-col gap-2">
        <span className="text-lg sm:text-xl font-medium">Ordenes</span>
        <div
          className={`flex flex-col gap-4 ${
            state.user?.Orders?.length > 0 ? "overflow-y-scroll" : "justify-center items-center"
          } max-h-80 scrollbar-thin scrollbar-thumb-[#CA995D] scrollbar-track-[#CA995D]/50 pr-1`}
        >
          {/* state.user?.Orders?.length > 0 */}
          {state.user?.Orders?.length > 0 ? (
            state.user.Orders.map((o) => {
              return <ProfileOrderDropDown key={o.id} order={o}/>;
            })
          ) : (
            <div className="text-center py-6 text-black/50 md:text-lg">
              <p>
                Aun no tienes ordenes! <br /> Realiza algunas compras en la{" "}
                <span className="text-blue-700">
                  {" "}
                  <Link href={'/shop'}>tienda</Link>
                </span>{" "}
                para verlas aqui!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileOrderSection;
