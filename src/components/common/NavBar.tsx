"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  Input,
  Divider,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter, useSearchParams, useParams } from "next/navigation";

import { HiMoon, HiSun, HiSearch } from "react-icons/hi";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "@/utils/Const";

interface Igenre {
  id: string;
  name: string;
}

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [input, setInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const storedDarkMode = localStorage.getItem("darkMode");
      return storedDarkMode === "true";
    }
    return false;
  });
  const [genres, setGenres] = useState([]);
  const [seletedGenre, setSelectedGenre] = useState("");

  const searchParams = useSearchParams();
  const params = useParams();

  const router = useRouter();

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", newDarkMode.toString());
      const htmlElement = document.querySelector("html");
      if (htmlElement) {
        if (newDarkMode) {
          htmlElement.classList.add("dark");
        } else {
          htmlElement.classList.remove("dark");
        }
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const htmlElement = document.querySelector("html");
      if (htmlElement) {
        if (isDarkMode) {
          htmlElement.classList.add("dark");
        } else {
          htmlElement.classList.remove("dark");
        }
      }
    }
  }, [isDarkMode]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=pt-BR`
        );
        setGenres(response.data.genres);
      } catch (err) {
        console.log("Erro(NavBar): " + err);
      }
    };

    fetchGenres();
  }, [setGenres]);

  useEffect(() => {
    const getSelectedGenre = () => {
      const genreQueryParam = searchParams.get("genre");
      const idParam = params.id;

      if (genreQueryParam) {
        setSelectedGenre(genreQueryParam);
      } else if (params.id !== undefined && params.id !== "") {
        setSelectedGenre(params.id.toString());
      }
    };

    getSelectedGenre();
  }, [searchParams, params.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input === "") {
      return toast.error("Oops! Insira um nome para realizar a pesquisa.", {
        style: { fontSize: "12px" },
      });
    }

    const query = input.replace(/ /g, "-");

    setInput("");

    router.push(`/search/${query}?page=1`);
    setIsMenuOpen(false);
  };

  return (
    <header>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="drop-shadow-lg bg-white dark:bg-[#2b2b2b]"
      >
        {/* Logo */}
        <NavbarContent justify="start">
          <NavbarBrand>
            <Link href="/discover/now_playing">
              <div className="relative w-28 h-20 md:w-36 mr-4">
                <Image
                  src="/cinedex.png"
                  alt="Cinedex"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Input Form */}
        <NavbarContent
          className="hidden sm:flex gap-4 w-full max-w-md px-4"
          justify="center"
        >
          <div className="hidden sm:block w-full">
            <form
              className="flex items-center justify-center gap-2 w-full "
              onSubmit={handleSubmit}
            >
              <Input
                classNames={{
                  base: "max-w-full h-10 ",
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper:
                    "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                placeholder="Pesquise por um filme ou série..."
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                required
              />
              <Button
                isIconOnly
                startContent={<HiSearch size={18} />}
                type="submit"
                onSubmit={handleSubmit}
                variant="shadow"
              />
            </form>
          </div>
        </NavbarContent>

        {/* Theme Switch & Mobile Menu Toggle */}
        <NavbarContent justify="end">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <Button onClick={toggleDarkMode} isIconOnly variant="shadow">
            {isDarkMode ? <HiSun size={18} /> : <HiMoon size={18} />}
          </Button>
        </NavbarContent>

        <NavbarMenu className="flex flex-col items-center text-center py-5">
          <form
            className="flex items-center justify-center gap-2 w-full"
            onSubmit={handleSubmit}
          >
            <Input
              classNames={{
                base: "max-w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Pesquise por um filme ou série..."
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
              required
            />
            <Button
              isIconOnly
              startContent={<HiSearch size={18} />}
              type="submit"
              onSubmit={handleSubmit}
              variant="shadow"
            />
          </form>

          <Divider className="my-5" />

          <div className="space-y-1 text-center flex flex-col justify-center items-center w-full">
            <h2 className="mb-2 text-xl font-semibold tracking-tight">
              Descubra
            </h2>
            <NavbarMenuItem className="hover:bg-stone-400/30 p-1 rounded-lg w-full">
              <Link
                color="foreground"
                className="w-full justify-center"
                href="/discover/now_playing"
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Em cartaz
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem className="hover:bg-stone-400/30 p-1 rounded-lg w-full">
              <Link
                color="foreground"
                className="w-full justify-center"
                href="/discover/popular"
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Populares
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem className="hover:bg-stone-400/30 p-1 rounded-lg w-full">
              <Link
                color="foreground"
                className="w-full justify-center"
                href="/discover/upcoming"
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Lançamentos
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem className="hover:bg-stone-400/30 p-1 rounded-lg w-full">
              <Link
                color="foreground"
                className="w-full justify-center"
                href="/discover/top_rated"
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Melhores avaliações
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem className="hover:bg-stone-400/30 p-1 rounded-lg w-full">
              <Link
                color="foreground"
                className="w-full justify-center"
                href="/discover/tv"
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Séries em alta
              </Link>
            </NavbarMenuItem>
          </div>

          <Divider className="my-5" />
          <h2 className="mb-2 text-xl font-semibold tracking-tight">
            Gêneros
          </h2>
          {genres.map((genre: Igenre) => (
            <NavbarMenuItem
              key={genre.id}
              className="hover:bg-stone-400/30 p-1 rounded-lg w-full"
            >
              <Link
                color="foreground"
                className="w-full justify-center"
                href={`/genres/${
                  genre.id
                }?genre=${genre.name.toLocaleLowerCase()}`}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {genre.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </header>
  );
}
