import React from "react";
import CanvasBackground from "./CanvasBackground";
import { Montserrat, Noto_Serif } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});
const serif = Noto_Serif({
  weight: ["300", "400", "600"],
});

const HeroSection: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <CanvasBackground />
      <div className="hero">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mt-3 text-center backdrop-blur-sm">
            <h1
              className={`${serif.className} mb-4 text-6xl font-normal tracking-wide`}
            >
              <a href="/">
                <span className="font-semibold">Eric</span>
                <span className="font-light">Zheng</span>
              </a>
            </h1>
            <p
              className={`${montserrat.className} mt-9 text-sm tracking-widest`}
            >
              <span className="font-normal">
                APPLIED MATH-COMPUTER SCIENCE @ BROWN UNIVERSITY
              </span>
            </p>
            <div className="mt-9 w-full border-t-2"></div>
            <nav className="mt-5">
              <ul
                className={`${montserrat.className} font-medium mr-5 ml-5 flex space-x-12 justify-between`}
              >
                <li>
                  <a href="#about">ABOUT</a>
                </li>
                <li>
                  <a href="#projects">PROJECTS</a>
                </li>
                <li>
                  <a href="#resume">RESUME</a>
                </li>
                <li>
                  <a href="#contact">CONTACT</a>
                </li>
              </ul>
            </nav>
            <div className="mt-5 mb-2 w-full border-t-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
