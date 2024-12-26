// "use client";
// import React, { useState } from "react";
// import HeroSection from "./components/HeroSection";
// import About from "./components/About";
// import CanvasBackground from "./components/CanvasBackground";

// const MainPage: React.FC = () => {
//   const [currentSection, setCurrentSection] = useState<string>("hero");
//   const [isHeroOpen, setIsHeroOpen] = useState(false);

//   const handleNavigate = (section: string) => {
//     setIsHeroOpen(true);
//     setCurrentSection(section);
//   };

//   return (
//     <div className="relative h-screen w-full overflow-hidden">
//       <CanvasBackground />
//       <HeroSection onNavigate={handleNavigate} isHeroOpen={isHeroOpen} />
//       <About isVisible={currentSection === "about"} />
//     </div>
//   );
// };

// export default MainPage;
"use client";
import React, { useState, useRef, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import CanvasBackground from "./components/CanvasBackground";

const MainPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>("hero");
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: string) => {
    setIsHeroOpen(true);
    setCurrentSection(section);
  };

  useEffect(() => {
    const checkAboutVisibility = () => {
      if (heroRef.current && aboutRef.current) {
        const heroRect = heroRef.current.getBoundingClientRect();
        const aboutRect = aboutRef.current.getBoundingClientRect();
        setIsAboutVisible(aboutRect.top <= heroRect.bottom);
      }
    };

    window.addEventListener("scroll", checkAboutVisibility);
    checkAboutVisibility(); // Initial check

    return () => window.removeEventListener("scroll", checkAboutVisibility);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <CanvasBackground />
      <div ref={heroRef}>
        <HeroSection onNavigate={handleNavigate} isHeroOpen={isHeroOpen} />
      </div>
      <div ref={aboutRef}>
        <About isVisible={currentSection === "about" && isAboutVisible} />
      </div>
    </div>
  );
};

export default MainPage;
