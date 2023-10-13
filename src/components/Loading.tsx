import { Spinner } from "@nextui-org/react";
import React from "react";

const Loading = () => {
  return (
    <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-full h-full grid place-items-center">
      <Spinner label="Carregando..." color="current" />
    </div>
  );
};

export default Loading;
