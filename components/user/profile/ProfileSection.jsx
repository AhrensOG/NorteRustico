import React, { useState } from "react";
import ProfileButtons from "./auxiliarComponents/ProfileButtons";
import ProfileDataSection from "./auxiliarComponents/ProfileDataSection";
import ProfileDataForm from "./auxiliarComponents/ProfileDataForm";
import ProfileOrderSection from "./ProfileOrderSection";

const ProfileSection = () => {
  const [showProfileData, setShowProfileData] = useState(true);
  const [showOrderData, setShowOrderData] = useState(false);
  const [editData, setEditData] = useState(false);

  const handleChangeData = () => {
    setEditData(true);
  };

  const handleChangeSection = (actionSetter, action) => {
    setShowOrderData(false);
    setShowProfileData(false);
    setEditData(false);
    actionSetter(action);
  };
  return (
    <div className="flex flex-col justify-center items-center p-4 md:px-2 lg:px-0 gap-4 max-w-screen-md w-full">
      <div className="flex flex-col justify-center items-center gap-4 w-full">
        <div className=" flex flex-row w-full justify-start items-center">
          <span className="font-bold text-lg md:text-xl">
            Resumen de tu cuenta
          </span>
        </div>
        <div className="flex flex-col justify-center items-start w-full">
          {/* Profile Buttons and Edit Information (Web Design) */}
          <ProfileButtons
            handleChangeSection={handleChangeSection}
            setShowProfileData={setShowProfileData}
            setShowOrderData={setShowOrderData}
            showProfileData={showProfileData}
            showOrderData={showOrderData}
            handleChangeData={handleChangeData}
            editData={editData}
          />

          {/* Profile Data */}
          {showProfileData && !editData && <ProfileDataSection />}

          {/* Edit Information (Mobile Design) */}

          {showProfileData && !editData && (
            <div className="md:hidden p-2">
              <span
                className="flex flex-row justify-center items-center gap-2 cursor-pointer text-blue-500"
                onClick={() => handleChangeData()}
              >
                Editar informacion
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </span>
            </div>
          )}

          {/* Order Section */}
          {showOrderData && <ProfileOrderSection />}
        </div>

        {/* Edit Form */}
        {editData && <ProfileDataForm setEditData={setEditData} />}

        {/* LogOut and Delete Account Buttons */}
        <div className="w-full py-6 px-2">
          <div className="w-full flex flex-row justify-start md:justify-end items-center gap-4 md:gap-8">
            <span className="flex flex-row justify-center items-center gap-1 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              Eliminar Cuenta
            </span>
            <span className="flex flex-row justify-center items-center gap-1 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 rotate-90"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
              Cerrar Sesion
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
