import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-center font-light py-4 text-sm">
      <p>
        &copy; {new Date().getFullYear()} - Cinedex | Todos os direitos
        reservados.
      </p>
      <p>
        Site feito utilizando a{" "}
        <Link className="transition-all hover:text-cinedex-darkPink" href="https://www.themoviedb.org/?language=pt" target="_blank">
          {" "}
          TMDB API
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
