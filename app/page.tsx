"use client";
import Scrollup from "@/components/Scrollup";
import { useEffect, useState } from "react";
import Biography from "./pages/Biography";
import CV from "./pages/CV";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import Home from "./pages/Home";
import Skills from "./pages/Skills";

export default function Page() {
  const [isMobile, setIsMobile] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [title, setTitle] = useState("[ iAlvaro ]");

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  });

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", updatePosition);

    if (!isMobile) {
      if (scrollPosition < 700) {
        setTitle("Home - [ iAlvaro ]");
      } else if (scrollPosition < 1600) {
        setTitle("Biography - [ iAlvaro ]");
      } else if (scrollPosition < 2600) {
        setTitle("Skills - [ iAlvaro ]");
      } else if (scrollPosition < 4200) {
        setTitle("Experience - [ iAlvaro ]");
      } else if (scrollPosition < 4500) {
        setTitle("CV - [ iAlvaro ]");
      } else if (scrollPosition >= 4500) {
        setTitle("Contact - [ iAlvaro ]");
      } else {
        setTitle("[ iAlvaro ]");
      }
    } else {
      setTitle("[ iAlvaro ]");
    }

    return () => window.removeEventListener("scroll", updatePosition);
  });

  return (
    <>
      <title>{title}</title>
      {/* TODO: BACKGROUND WITH HTML ELEMENTS TRANSPARENT */}
      <Home />
      <Biography />
      <Skills />
      <Experience />
      {/* <Portfolio /> */}
      <CV />
      <Contact />
      <Scrollup />
    </>
  );
}
