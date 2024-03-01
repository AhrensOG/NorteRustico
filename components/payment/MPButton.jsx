"use client";
import React, { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const MPButton = ({ id = false }) => {
  console.log(id);
  useEffect(() => {
    initMercadoPago("APP_USR-4d0be987-0393-449a-83d2-bee537aec209", {
      locale: "es-AR",
    });
  }, []);

  return (
    <div>
      <Wallet
        initialization={{ preferenceId: id, redirectMode: "modal" }}
        onReady={id ? true : false}
      />
    </div>
  );
};

export default MPButton;
