"use client";
import Loading from "@/components/Loading";
import { BASE_URL } from "@/utils/Const";
import { BASE_IMG_URL } from "@/utils/Const";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { TbRating18Plus } from "react-icons/tb";
import { HiStar, HiBackspace, HiPlay, HiXCircle } from "react-icons/hi2";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import {
  Button,
  Image,
  Accordion,
  AccordionItem,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import Genres from "@/components/Genres";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export interface Root {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Videos;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Videos {
  results: Result[];
}

export interface Result {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

const MovieDetails = () => {
  const [movie, setMovie] = useState<Root>();
  const [showPlayer, setShowPlayer] = useState(false);
  const [trailer, setTrailer] = useState("");

  const router = useRouter();
  const params = useParams();

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos&language=pt-BR&region=BR`
      )
      .then((res) => {
        setMovie(res.data);
      });
  }, [params.id]);

  useEffect(() => {
    const trailerIndex = movie?.videos?.results?.findIndex(
      (element) => element.type === "Trailer"
    );

    const trailerUrl = `https://www.youtube.com/watch?v=${
      movie?.videos?.results[trailerIndex!]?.key
    }`;
    setTrailer(trailerUrl);
  }, [movie]);

  const startPlayer = () => {
    mainRef?.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setShowPlayer(true);
  };

  const formatBrDate = (date: string) => {
    if (date) {
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    }
    return "Não informado";
  };

  const formattedReleaseDate = formatBrDate(movie?.release_date as string);

  function translateStatusToPortuguese(status: string) {
    const translations: { [key: string]: string } = {
      "In Production": "Em Produção",
      "Post Production": "Pós-Produção",
      Planned: "Planejado",
      Announced: "Anunciado",
      Canceled: "Cancelado",
      Rumored: "Rumor",
      Released: "Lançado",
      Filming: "Filmagens em progresso",
    };

    return translations[status] || status;
  }

  const runtime = movie?.runtime;

  const hours = Math.floor(runtime! / 60);
  const minutes = (runtime! % 60).toFixed(0).padStart(2, "0");

  return (
    <main
      className="p-8 relative max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-white"
      style={{
        zIndex: 10,
      }}
      ref={mainRef}
    >
      {movie === null && <Loading />}

      <div
        className="absolute right-5 top-0 m-2 cursor-pointer"
        onClick={router.back}
      >
        <HiBackspace size={36} />
      </div>

      <div className="flex justify-center items-center pt-4 md:pt-4">
        <div className="grid md:grid-cols-[300px,1fr] max-w-7xl gap-7">
          <div>
            <Image
              src={`${BASE_IMG_URL}${movie?.poster_path}`}
              alt={movie?.title}
            />
          </div>

          <div className="space-y-6 md:space-y-3">
            <div className="flex gap-2 flex-wrap justify-center">
              {movie?.genres?.map((genre, index) => (
                <Genres
                  key={genre.id}
                  index={index}
                  length={movie.genres.length}
                  name={genre.name}
                  id={genre.id}
                />
              ))}
              {movie?.adult === true ? <TbRating18Plus size={36} /> : ""}
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <p className="uppercase text-lg md:text-xl font-medium">
                {movie?.title}
              </p>
              <p className="text-sm">{movie?.tagline}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-2 flex-wrap md:gap-4 items-center justify-center text-center">
              <p>
                <span className="font-medium">Idioma - </span>
                {movie?.original_language?.toUpperCase()}
              </p>
              <p>
                <span className="font-medium">Lançamento - </span>
                {formattedReleaseDate}
              </p>
              <p>
                <span className="font-medium">Duração - </span>
                {hours}h {minutes}m
              </p>
              <p className="flex gap-1 items-center justify-center">
                <span className="font-medium">Nota - </span>
                {movie?.vote_average.toFixed(1)}
                <HiStar color="#f5a524" size={18} />
              </p>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap gap-2 md:gap-4 items-center justify-center text-center">
              <p>
                <span className="font-medium">Status - </span>{" "}
                {translateStatusToPortuguese(movie?.status as string)}
              </p>
              <p>
                <span className="font-medium">Orçamento inicial - </span>{" "}
                {movie?.budget === 0
                  ? "Não informado"
                  : movie?.budget.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
              </p>
              <p>
                <span className="font-medium">Receita gerada - </span>{" "}
                {movie?.revenue === 0
                  ? "Não informado"
                  : movie?.revenue.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
              </p>
            </div>

            <Divider />

            <div className="flex flex-col items-start justify-center"></div>

            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-lg md:text-xl font-medium mb-1">Sinopse</h2>
              <div>
                {movie?.overview === "" ? (
                  "Sinopse indisponível"
                ) : (
                  <p>{movie?.overview}</p>
                )}
              </div>
              {movie?.videos?.results.length === 0 ? (
                ""
              ) : (
                <Button
                  startContent={<HiPlay size={24} />}
                  onClick={startPlayer}
                  variant="shadow"
                  color="warning"
                  className="font-medium my-5"
                >
                  Ver trailer
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* React Player */}
      <div
        className={`absolute top-3 insex-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000 ${
          showPlayer ? "opacity-100 z-50" : "opacity-0 -z-10"
        }`}
      >
        <div className="flex items-center justify-between text-white bg-black p-3.5">
          <span className="font-semibold">
            Confira o trailer de {movie?.title}
          </span>
          <Button
            onClick={() => setShowPlayer(false)}
            isIconOnly
            startContent={<HiXCircle size={24} />}
            size="sm"
          ></Button>
        </div>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={trailer}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            controls={true}
            playing={showPlayer}
          />
        </div>
      </div>

      <div className="pt-5">
        <Footer />
      </div>
    </main>
  );
};

export default MovieDetails;
