"use client";
import React, { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const MPButton = ({ id = false }) => {
  console.log(id);
  useEffect(() => {
    initMercadoPago("APP_USR-38da7c14-9e86-4be6-b56f-36309aa5b9c4", {
      locale: "es-AR",
    });
  }, []);

  return (
    <div>
      <Wallet initialization={{ preferenceId: id, redirectMode: "blank" }} />
    </div>
  );
};

export default MPButton;
