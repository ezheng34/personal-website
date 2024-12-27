"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import HeroSection from "./HeroSection";
import About from "./About";
import Projects from "./Projects";
import CanvasBackground from "./CanvasBackground";

const MainPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>("hero");
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);

  const router = useRouter();

  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setIsHeroOpen(true);
    setCurrentSection(section);

    if (section === "hero") {
      router.push("/");
    } else {
      router.push(`/#${section}`);
    }

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  // const handleNavigate = (section: string) => {
  //   setCurrentSection(section);
  //   setIsHeroOpen(section !== "hero");

  //   // Update visibility states based on the section clicked
  //   if (section === "about") {
  //     setIsAboutVisible(true);
  //     setIsProjectsVisible(false);
  //     console.log(isAboutVisible);
  //     console.log(isProjectsVisible);
  //   } else if (section === "projects") {
  //     setIsAboutVisible(false);
  //     setIsProjectsVisible(true);
  //   } else {
  //     setIsAboutVisible(false);
  //     setIsProjectsVisible(false);
  //   }
  // };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setCurrentSection(hash);
        setIsHeroOpen(true);
      } else {
        setCurrentSection("hero");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const checkSectionsVisibility = () => {
      if (heroRef.current && aboutRef.current && projectsRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const aboutRect = aboutRef.current.getBoundingClientRect();
        const projectsRect = projectsRef.current.getBoundingClientRect();

        setIsAboutVisible(aboutRect.top <= heroRect.bottom);
        setIsProjectsVisible(projectsRect.top <= heroRect.bottom);
      }
    };

    window.addEventListener("scroll", checkSectionsVisibility);
    checkSectionsVisibility();

    return () => window.removeEventListener("scroll", checkSectionsVisibility);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <CanvasBackground />
      <div ref={heroRef} id="hero">
        <HeroSection onNavigate={handleNavigate} isHeroOpen={isHeroOpen} />
      </div>
      <div ref={aboutRef} id="about">
        <About isVisible={currentSection === "about" && isAboutVisible} />
      </div>
      <div ref={projectsRef} id="projects">
        <Projects
          isVisible={currentSection === "projects" && isProjectsVisible}
        />
      </div>
    </div>
  );
};

export default MainPage;
