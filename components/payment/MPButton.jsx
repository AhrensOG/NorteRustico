"use client";
import React, { useContext, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Context } from "@/app/context/GlobalContext";

const MPButton = () => {
  const { state } = useContext(Context)
  useEffect(() => {
    initMercadoPago("APP_USR-38da7c14-9e86-4be6-b56f-36309aa5b9c4", {
      locale: "es-AR",
    });
  }, [state.preference]);

  return (
    <div>
      <Wallet initialization={{ preferenceId: state.preference, redirectMode: "blank" }} />
    </div>
  );
};

export default MPButton;
