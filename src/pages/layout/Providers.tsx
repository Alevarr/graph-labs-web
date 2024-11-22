import { NextUIProvider } from "@nextui-org/react";
import React, { ReactNode } from "react";
import { useHref, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  return (
    <NextUIProvider navigate={navigate} useHref={useHref}>
      <Toaster theme="light" position="top-center" richColors={true} />
      {children}
    </NextUIProvider>
  );
};

export default Providers;
