import React from "react";
import { CiImageOff } from "react-icons/ci";

const CardSkeleton = ({ error }: { error?: boolean }) => {
  return (
    <div
      className={`w-full h-auto p-5 grid place-items-center mx-auto bg-foreground-300 rounded-xl ${
        !error && "cardSkeleton"
      }`}
    >
      {error && (
        <div className="flex flex-col items-center justify-center gap-2 text-center aspect-[1/1.6]">
          <CiImageOff size={64} />
          <h2>Infelizmente este filme se encontra indisponível no momento</h2>
          <p className="text-sm">Lamentamos pelo inconveniente</p>
        </div>
      )}
    </div>
  );
};

export default CardSkeleton;
