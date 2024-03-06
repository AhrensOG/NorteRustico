"use client";
import React, { useContext, useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { Context } from "@/app/context/GlobalContext";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY;

const MPButton = () => {
  const { state } = useContext(Context);
  useEffect(() => {
    initMercadoPago(PUBLIC_KEY, {
      locale: "es-AR",
    });
  }, [state.preference]);

  return (
    <div>
      <Wallet
        initialization={{
          preferenceId: state.preference,
          redirectMode: "blank",
        }}
      />
    </div>
  );
};

export default MPButton;
