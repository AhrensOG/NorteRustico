import React, { useEffect, useState } from "react";
import Header from "../auxiliarComponents/Header";
import Image from "next/image";
import AdminPanelCarousel from "./auxiliarComponents/AdminPanelCarousel";
import { useContext } from "react";
import { Context } from "@/app/context/GlobalContext";
import OrganizationForm from "./OrganizationForm";
import Link from "next/link";
import Loader from "@/components/Loader";

const PanelOrganizationSection = () => {
  const { state } = useContext(Context);
  const [reloadCarousel, setReloadCarousel] = useState(false);

  useEffect(() => {}, [state.organization]);

  if (state.organization === undefined) {
    return (
      <div className="w-full">
        <div className="flex flex-col w-full h-full py-4 px-8 gap-6">
          <Header title="Organizacion" />

          <div className="flex flex-row justify-center items-center gap-4 justify-self-start w-full h-full bg-white rounded-md px-4 py-4">
            <Loader size={60} color="#1D4ED8" />
          </div>
        </div>
      </div>
    );
  }

  if (state.organization === false) {
    return (
      <div className="w-full">
        <div className="flex flex-col w-full h-full py-4 px-8 gap-6">
          <Header title="Organizacion" />

          <div className="grid grid-cols-2 gap-4 justify-self-start w-full h-full bg-white rounded-md px-4 py-4">
            <div className="flex flex-col items-center justify-center">
              <Image
                src={"/noData.png"}
                width={330}
                height={330}
                alt="noData"
                priority
              />
            </div>
            <OrganizationForm />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col w-full h-full py-4 px-8 gap-6">
        <Header title="Organizacion" />

        <div className="grid grid-cols-2 gap-4 justify-self-start w-full h-full bg-white rounded-md px-4 py-4">
          <div className="flex flex-col gap-4">
            {state.organization?.OrganizationImages?.length > 0 &&
              !reloadCarousel && (
                <AdminPanelCarousel
                  slides={state.organization?.OrganizationImages}
                  autoSlide={true}
                  autoSlideInterval={5000}
                />
              )}
            {state.organization?.OrganizationImages?.length === 0 && (
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={"/noData.png"}
                  width={330}
                  height={330}
                  alt="noData"
                  priority
                />
              </div>
            )}
            {reloadCarousel && (
              <div className="flex flex-row w-full h-80 xs:h-[330px] sm:h-[350px] md:h-[400px] justify-center items-center">
                <Loader size={60} color="#1D4ED8" />
              </div>
            )}
            <div className="flex flex-row justify-evenly">
              <Link
                href={state.organization?.whatsAppLink || "#"}
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg
                  id="whatsapp"
                  xmlns="http://www.w3.org/2000/svg"
                  width={50}
                  height={50}
                  fill="#1D4ED8"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.42 9.49c-.19-.09-1.1-.54-1.27-.61s-.29-.09-.42.1-.48.6-.59.73-.21.14-.4 0a5.13 5.13 0 0 1-1.49-.92 5.25 5.25 0 0 1-1-1.29c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.39 1.39 0 0 0 .18-.31.38.38 0 0 0 0-.33c0-.09-.42-1-.58-1.37s-.3-.32-.41-.32h-.4a.72.72 0 0 0-.5.23 2.1 2.1 0 0 0-.65 1.55A3.59 3.59 0 0 0 5 8.2 8.32 8.32 0 0 0 8.19 11c.44.19.78.3 1.05.39a2.53 2.53 0 0 0 1.17.07 1.93 1.93 0 0 0 1.26-.88 1.67 1.67 0 0 0 .11-.88c-.05-.07-.17-.12-.36-.21z" />
                  <path d="M13.29 2.68A7.36 7.36 0 0 0 8 .5a7.44 7.44 0 0 0-6.41 11.15l-1 3.85 3.94-1a7.4 7.4 0 0 0 3.55.9H8a7.44 7.44 0 0 0 5.29-12.72zM8 14.12a6.12 6.12 0 0 1-3.15-.87l-.22-.13-2.34.61.62-2.28-.14-.23a6.18 6.18 0 0 1 9.6-7.65 6.12 6.12 0 0 1 1.81 4.37A6.19 6.19 0 0 1 8 14.12z" />
                </svg>
              </Link>
              <Link
                href={state.organization?.instagramLink || "#"}
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg
                  id="instagram"
                  xmlns="http://www.w3.org/2000/svg"
                  width={50}
                  height={50}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#1D4ED8"
                    fillRule="evenodd"
                    d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                    clipRule="evenodd"
                  />
                  <path fill="#1D4ED8" d="M18 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
                  <path
                    fill="#1D4ED8"
                    fillRule="evenodd"
                    d="M1.654 4.276C1 5.56 1 7.24 1 10.6v2.8c0 3.36 0 5.04.654 6.324a6 6 0 0 0 2.622 2.622C5.56 23 7.24 23 10.6 23h2.8c3.36 0 5.04 0 6.324-.654a6 6 0 0 0 2.622-2.622C23 18.44 23 16.76 23 13.4v-2.8c0-3.36 0-5.04-.654-6.324a6 6 0 0 0-2.622-2.622C18.44 1 16.76 1 13.4 1h-2.8c-3.36 0-5.04 0-6.324.654a6 6 0 0 0-2.622 2.622ZM13.4 3h-2.8c-1.713 0-2.878.002-3.778.075-.877.072-1.325.202-1.638.361a4 4 0 0 0-1.748 1.748c-.16.313-.29.761-.36 1.638C3.001 7.722 3 8.887 3 10.6v2.8c0 1.713.002 2.878.075 3.778.072.877.202 1.325.361 1.638a4 4 0 0 0 1.748 1.748c.313.16.761.29 1.638.36.9.074 2.065.076 3.778.076h2.8c1.713 0 2.878-.002 3.778-.075.877-.072 1.325-.202 1.638-.361a4 4 0 0 0 1.748-1.748c.16-.313.29-.761.36-1.638.074-.9.076-2.065.076-3.778v-2.8c0-1.713-.002-2.878-.075-3.778-.072-.877-.202-1.325-.361-1.638a4 4 0 0 0-1.748-1.748c-.313-.16-.761-.29-1.638-.36C16.278 3.001 15.113 3 13.4 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href={state.organization?.instagramLink || "#"}
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg
                  id="facebook"
                  xmlns="http://www.w3.org/2000/svg"
                  width={50}
                  height={50}
                  fill="#1D4ED8"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z" />
                </svg>
              </Link>
            </div>
          </div>

          <OrganizationForm
            data={state.organization}
            setReloadCarousel={setReloadCarousel}
          />
        </div>
      </div>
    </div>
  );
};

export default PanelOrganizationSection;
