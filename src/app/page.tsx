// import HeroSection from "./components/HeroSection";

// export default function Home() {
//   return (
//     <div className="hero noscroll">
//       {/* <Navbar /> */}
//       <HeroSection />
//       {/* <section id="about">
//         <AboutSection />
//       </section>
//       <section id="projects">
//         <ProjectsSection />
//       </section>
//       <section id="resume">
//         <ResumeSection />
//       </section>
//       <section id="contact">
//         <ContactSection />
//       </section> */}
//     </div>
//   );
// }
// page.tsx or your main component
"use client";
import React, { useState } from "react";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import CanvasBackground from "./components/CanvasBackground";

const MainPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>("hero");
  const [isHeroOpen, setIsHeroOpen] = useState(false);

  const handleNavigate = (section: string) => {
    setIsHeroOpen(true);
    setCurrentSection(section);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <CanvasBackground />
      <HeroSection onNavigate={handleNavigate} isHeroOpen={isHeroOpen} />
      <About isVisible={currentSection === "about"} />
      {/* Add other sections similarly */}
    </div>
  );
};

export default MainPage;
