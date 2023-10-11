"use client";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Button,
} from "@nextui-org/react";

import { HiMoon, HiSun } from "react-icons/hi";
import Image from "next/image";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const storedDarkMode = localStorage.getItem("darkMode");
      return storedDarkMode === "true";
    }
    return false;
  });

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

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <div className="relative w-32 h-20">
            <Image
              src="/cinedex.png"
              alt="Cinedex"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        
        <Button onClick={toggleDarkMode} isIconOnly variant="shadow">
          {isDarkMode ? <HiSun size={18} /> : <HiMoon size={18} />}
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
