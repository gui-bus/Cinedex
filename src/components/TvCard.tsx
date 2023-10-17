"use client";
import React, { useState } from "react";
import { Image } from "@nextui-org/react";
import { BASE_IMG_URL } from "@/utils/Const";
import Link from "next/link";
import CardSkeleton from "./CardSkeleton";

interface TvCardProps {
  img: string;
  id: string;
  name: string;
  first_air_date: string;
}

export default function TvCard({
  id,
  img,
  name,
  first_air_date
}: TvCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const formatBrDate = (date: string) => {
    if (date) {
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    }
    return "Não informado";
  };

  const formattedAirDate = formatBrDate(first_air_date);

  return (
    <div className="group w-full md:w-52 h-auto gap-2 px-2 transition-all duration-250 ease-out hover:scale-105">
      {!loaded && !error && <CardSkeleton />}
      {error && <CardSkeleton error />}

      <Link
        className={`${!loaded && error && "hidden"}`}
        href={`/details/tv/${id}`}
      >
        <div className="relative ">
          <Image
            className="object-cover aspect-[1/1.5]"
            src={`${BASE_IMG_URL}${img}`}
            alt={name}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />

          <div className="absolute w-full bottom-0 px-4 py-2 text-center transition-all duration-500 opacity-0 group-hover:opacity-100 z-50 dark:bg-white bg-[#2b2b2b] text-white dark:text-black rounded-b-xl">
            {name}
            <p>{formattedAirDate}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
