// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import HeroSection from "./components/HeroSection";
// import About from "./components/About";
// import Projects from "./components/Projects";
// import CanvasBackground from "./components/CanvasBackground";

// const MainPage: React.FC = () => {
//   const [currentSection, setCurrentSection] = useState<string>("hero");
//   const [isHeroOpen, setIsHeroOpen] = useState(false);
//   const [isAboutVisible, setIsAboutVisible] = useState(false);
//   const [isProjectsVisible, setIsProjectsVisible] = useState(false);

//   const heroRef = useRef<HTMLDivElement>(null);
//   const aboutRef = useRef<HTMLDivElement>(null);
//   const projectsRef = useRef<HTMLDivElement>(null);

//   const handleNavigate = (section: string) => {
//     setIsHeroOpen(true);
//     setCurrentSection(section);
//   };

//   useEffect(() => {
//     const checkAboutVisibility = () => {
//       if (heroRef.current && aboutRef.current) {
//         const heroRect = heroRef.current.getBoundingClientRect();
//         const aboutRect = aboutRef.current.getBoundingClientRect();
//         const projectsRect = projectsRef.current
//           ? projectsRef.current.getBoundingClientRect()
//           : { top: 0, bottom: 0 };

//         setIsAboutVisible(aboutRect.top <= heroRect.bottom);
//         setIsProjectsVisible(projectsRect.top <= heroRect.bottom);
//       }
//     };

//     window.addEventListener("scroll", checkAboutVisibility);
//     checkAboutVisibility();

//     return () => window.removeEventListener("scroll", checkAboutVisibility);
//   }, []);

//   return (
//     <div className="relative min-h-screen w-full overflow-x-hidden">
//       <CanvasBackground />
//       <div ref={heroRef}>
//         <HeroSection onNavigate={handleNavigate} isHeroOpen={isHeroOpen} />
//       </div>
//       <div ref={aboutRef}>
//         <About isVisible={currentSection === "about" && isAboutVisible} />
//       </div>
//       <div ref={projectsRef}>
//         <Projects
//           isVisible={currentSection === "projects" && isProjectsVisible}
//         />
//       </div>
//     </div>
//   );
// };

// export default MainPage;
import MainPage from "./components/MainPage";

export default function Home() {
  return <MainPage />;
}
