"use client";
import React, { useRef, useState } from "react";
import { useSpring, animated, useSpringRef, useChain } from "react-spring";
import { Montserrat, Noto_Serif } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});
const serif = Noto_Serif({
  weight: ["300", "400", "600"],
});

interface HeroSectionProps {
  onNavigate: (section: string) => void;
  isHeroOpen: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  isHeroOpen,
}) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const springRef = useSpringRef();
  const textSpringRef = useSpringRef();
  const borderSpringRef = useSpringRef();
  const titleSpringRef = useSpringRef();

  const props = useSpring({
    ref: springRef,
    from: {
      top: "50%",
      transform: "translate(-50%, -50%)",
      width: "60%",
    },
    to: {
      top: isHeroOpen ? "0%" : "50%",
      transform: isHeroOpen ? "translate(-50%, 0%)" : "translate(-50%, -50%)",
      width: isHeroOpen ? "100%" : "60%",
    },
    config: { mass: 1, tension: 280, friction: 60 },
    onRest: () => {
      if (isHeroOpen && containerRef.current) {
        containerRef.current.style.width = "100%";
      }
    },
  });

  const textStyle = useSpring({
    ref: textSpringRef,
    from: {
      opacity: 1,
      height: "auto",
      marginBottom: "1rem",
      marginTop: "1rem",
    },
    to: {
      opacity: isHeroOpen ? 0 : 1,
      height: isHeroOpen ? 0 : "auto",
      marginBottom: "0",
      marginTop: isHeroOpen ? "0" : "1rem",
    },
    config: { duration: 200 },
  });

  const borderStyle = useSpring({
    ref: borderSpringRef,
    from: { marginTop: "2.25rem" },
    to: {
      marginTop: isHeroOpen ? "1.25rem" : "2.25rem",
    },
    config: { mass: 1, tension: 280, friction: 60 },
  });

  const titleStyle = useSpring({
    ref: titleSpringRef,
    from: { fontSize: "3.75rem" },
    to: {
      fontSize: isHeroOpen ? "2.5rem" : "3.75rem",
    },
    config: { mass: 1, tension: 280, friction: 60 },
  });

  useChain(
    isHeroOpen
      ? [textSpringRef, titleSpringRef, borderSpringRef, springRef]
      : [springRef, borderSpringRef, titleSpringRef, textSpringRef],
    [0, 0.2, 0.3, 0.4]
  );

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: string
  ) => {
    e.preventDefault();
    setActiveSection(section);
    onNavigate(section);
  };

  return (
    <animated.div
      ref={containerRef}
      style={{ ...props, left: "50%", zIndex: 10 }}
      className="fixed z-10"
    >
      <div className="hero-content">
        <animated.h1
          style={titleStyle}
          className={`${serif.className} font-normal tracking-wide`}
        >
          <a href="/">
            <span className="font-semibold">Eric</span>
            <span className="font-light">Zheng</span>
          </a>
        </animated.h1>
        <animated.p
          style={textStyle}
          className={`${montserrat.className} text-sm tracking-widest overflow-hidden`}
        >
          <span className="font-normal">
            APPLIED MATH-COMPUTER SCIENCE @ BROWN UNIVERSITY
          </span>
        </animated.p>
        <animated.div style={borderStyle} className="w-full border-t-2" />
        <nav className="mt-5 w-full">
          <ul
            className={`${montserrat.className} font-medium flex justify-between text-xl`}
          >
            <li>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, "about")}
                className={`ml-16 ${
                  activeSection === "about" ? "underline" : ""
                }`}
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, "projects")}
                className={`${activeSection === "projects" ? "underline" : ""}`}
              >
                PROJECTS
              </a>
            </li>
            <li>
              <a
                href="#resume"
                onClick={(e) => handleNavClick(e, "resume")}
                className={`${activeSection === "resume" ? "underline" : ""}`}
              >
                RESUME
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className={`mr-16 ${
                  activeSection === "contact" ? "underline" : ""
                }`}
              >
                CONTACT
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-5 mb-2 w-full border-t-2"></div>
      </div>
    </animated.div>
  );
};

export default HeroSection;
