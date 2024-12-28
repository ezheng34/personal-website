"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "./HeroSection";
import About from "./About";
import Projects from "./Projects";
import Resume from "./Resume";
import Contact from "./Contact";
import CanvasBackground from "./CanvasBackground";

const MainPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>("hero");
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);
  const [isResumeVisible, setIsResumeVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  const router = useRouter();

  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

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

    setIsAboutVisible(section === "about");
    setIsProjectsVisible(section === "projects");
    setIsResumeVisible(section === "resume");
    setIsContactVisible(section === "contact");
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setCurrentSection(hash);
        setIsHeroOpen(true);
        setIsAboutVisible(hash === "about");
        setIsProjectsVisible(hash === "projects");
        setIsResumeVisible(hash === "resume");
        setIsContactVisible(hash === "contact");
      } else {
        setCurrentSection("hero");
        setIsAboutVisible(false);
        setIsProjectsVisible(false);
        setIsResumeVisible(false);
        setIsContactVisible(false);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <CanvasBackground />
      <div ref={heroRef} id="hero">
        <HeroSection onNavigate={handleNavigate} isHeroOpen={isHeroOpen} />
      </div>
      <div
        ref={aboutRef}
        id="about"
        style={{ display: isAboutVisible ? "block" : "none" }}
      >
        <About isVisible={isAboutVisible} />
      </div>
      <div
        ref={projectsRef}
        id="projects"
        style={{ display: isProjectsVisible ? "block" : "none" }}
      >
        <Projects isVisible={isProjectsVisible} />
      </div>
      <div
        ref={resumeRef}
        id="resume"
        style={{ display: isResumeVisible ? "block" : "none" }}
      >
        <Resume isVisible={isResumeVisible} />
      </div>
      <div
        ref={contactRef}
        id="contact"
        style={{ display: isContactVisible ? "block" : "none" }}
      >
        <Contact isVisible={isContactVisible} />
      </div>
    </div>
  );
};

export default MainPage;
