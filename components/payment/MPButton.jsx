"use client";
import React, { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const MPButton = ({ id = false }) => {
  console.log(id);
  useEffect(() => {
    initMercadoPago("TEST-0ef40cb0-0054-4928-b38b-06b0932ac3aa", {
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
