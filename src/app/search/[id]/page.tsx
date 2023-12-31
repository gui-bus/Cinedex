"use client";
import MovieCard from "@/components/Card";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import TvCard from "@/components/TvCard";
import { BASE_URL } from "@/utils/Const";
import { Button, Tooltip } from "@nextui-org/react";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState, useEffect } from "react";

import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

export interface Imovie {
  id: string;
  poster_path: string;
  title: string;
  release_date: string;
}

export interface ITv {
  id: string;
  name: string;
  poster_path: string;
  first_air_date: string;
}

const Search = () => {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limitPage, setLimitPage] = useState(1);
  const [search, setSearch] = useState("");

  const mainRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    mainRef?.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    const id = params.id.toString();
    const page = searchParams.get("page");

    const capitalizedId = id.charAt(0).toUpperCase() + id.slice(1);

    setTitle(`Resultados para a pesquisa: ${capitalizedId.replace(/-/g, " ")}`);

    setSearch(id);

    axios
      .get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          query: id,
          page,
          language: "pt-BR",
        },
      })
      .then((response) => {
        setMovies(response.data.results);
        setCurrentPage(response.data.page);
        setTotalPage(response.data.total_pages);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${BASE_URL}/search/tv`, {
        params: {
          api_key: process.env.NEXT_PUBLIC_API_KEY,
          query: id,
          page,
          language: "pt-BR",
        },
      })
      .then((response) => {
        setTv(response.data.results);
        setCurrentPage(response.data.page);
        setTotalPage(response.data.total_pages);
      })
      .catch((error) => console.log(error));

    if (totalPage >= 500) {
      setLimitPage(500);
    } else {
      setLimitPage(totalPage);
    }
  }, [params.id, searchParams, totalPage]);

  const handlePageChange = (button: string) => {
    let page = "";

    switch (button) {
      case "prev":
        page = `page=${currentPage - 1}`;
        break;

      case "next":
        page = `page=${currentPage + 1}`;
        break;

      case "initial":
        page = `page=1`;
        break;

      case "last":
        page = `page=${limitPage}`;
        break;

      default:
        page = "";
        break;
    }

    const searchQuery = search.replace(/ /g, "-");

    router.push(`/search/${searchQuery}?${page}`);
  };

  return (
    <main
      className="max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-white relative"
      ref={mainRef}
    >
      <h2 className="text-2xl tracking-tighter font-semibold text-center">
        {title}
      </h2>
      {movies.length === 0 && tv.length === 0 && (
        <>
          <p className="flex items-center justify-center text-center">
            Infelizmente não foi encontrado nenhum resultado para a sua
            pesquisa.
          </p>
        </>
      )}

      <section className="flex flex-wrap items-center justify-center gap-y-4 py-5">
        {movies.map((movie: Imovie) => (
          <MovieCard
            key={movie.id}
            img={movie.poster_path}
            id={movie.id}
            title={movie.title}
            release_date={movie.release_date}
          />
        ))}
        {tv.map((TV: ITv) => (
          <TvCard
            key={TV.id}
            img={TV.poster_path}
            id={TV.id}
            name={TV.name}
            first_air_date={TV.first_air_date}
          />
        ))}
      </section>

      {/* Pagination */}
      <div
        className={`flex justify-center gap-2 py-6 pt-16 ${
          movies.length === 0 && "hidden"
        }`}
      >
        <Tooltip
          content="Primeira página"
          delay={0}
          closeDelay={0}
          className={`${currentPage === 1 && "hidden"}`}
        >
          {currentPage === 1 ? (
            <Button
              onClick={() => handlePageChange("initial")}
              variant="shadow"
              isIconOnly
              startContent={<MdKeyboardDoubleArrowLeft />}
              className="disabled:opacity-50"
              disabled
              color="warning"
            />
          ) : (
            <Button
              onClick={() => handlePageChange("initial")}
              variant="shadow"
              isIconOnly
              startContent={<MdKeyboardDoubleArrowLeft />}
              color="warning"
            />
          )}
        </Tooltip>

        <Tooltip
          content="Voltar"
          delay={0}
          closeDelay={0}
          className={`${currentPage === 1 && "hidden"}`}
        >
          {currentPage === 1 ? (
            <Button
              onClick={() => handlePageChange("prev")}
              variant="shadow"
              isIconOnly
              startContent={<MdKeyboardArrowLeft />}
              className="disabled:opacity-50"
              disabled
              color="warning"
            />
          ) : (
            <Button
              onClick={() => handlePageChange("prev")}
              variant="shadow"
              isIconOnly
              startContent={<MdKeyboardArrowLeft />}
              color="warning"
            />
          )}
        </Tooltip>

        <Button disabled color="warning">
          {currentPage}
        </Button>

        <Tooltip
          content="Avançar"
          delay={0}
          closeDelay={0}
          className={`${currentPage === totalPage && "hidden"}`}
        >
          {currentPage === totalPage ? (
            <Button
              onClick={() => handlePageChange("next")}
              variant="shadow"
              isIconOnly
              startContent={<MdKeyboardArrowRight />}
              className="disabled:opacity-50"
              disabled
              color="warning"
            />
          ) : (
            <Button
              onClick={() => handlePageChange("next")}
              variant="shadow"
              isIconOnly
              startContent={<MdKeyboardArrowRight />}
              color="warning"
            />
          )}
        </Tooltip>

        <Tooltip
          content="Ultima página"
          delay={0}
          closeDelay={0}
          className={`${currentPage === totalPage && "hidden"}`}
        >
          {currentPage === totalPage ? (
            <Button
              onClick={() => handlePageChange("last")}
              variant="shadow"
              isIconOnly
              startContent={<MdKeyboardDoubleArrowRight />}
              className="disabled:opacity-50"
              disabled
              color="warning"
            />
          ) : (
            <Button
              onClick={() => handlePageChange("last")}
              variant="shadow"
              isIconOnly
              startContent={<MdKeyboardDoubleArrowRight />}
              color="warning"
            />
          )}
        </Tooltip>
      </div>

      {movies.length === 0 && (
        <div className="absolute left-[50%] top-[70%] -translate-x-1/2 -translate-y-1/2 w-full h-full grid place-items-center">
          <Footer />
        </div>
      )}

      {movies.length >= 1 && <Footer />}
    </main>
  );
};

export default Search;
