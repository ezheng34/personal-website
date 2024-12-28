"use client";
import React, { useRef, useState } from "react";
import { useSpring, animated, useSpringRef, useChain } from "react-spring";
import { Montserrat, Noto_Serif } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});
const serif = Noto_Serif({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
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
      ? [titleSpringRef, borderSpringRef, springRef]
      : [springRef, borderSpringRef, titleSpringRef],
    [0, 0.2, 0.3]
  );

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: string
  ) => {
    e.preventDefault();
    setActiveSection(section);
    onNavigate(section);
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection("");
    onNavigate("hero");
  };

  return (
    // @ts-expect-error Type Error with animated div
    <animated.div
      ref={containerRef}
      style={{ ...props, left: "50%", zIndex: 10 }}
      className="absolute z-10"
    >
      <div className="hero-content">
        {/* @ts-expect-error Type Error with animated h1 */}
        <animated.h1
          style={titleStyle}
          className={`${serif.className} font-normal tracking-wide`}
        >
          <Link href="/" onClick={handleHomeClick}>
            <span className="font-semibold">Eric</span>
            <span className="font-light">Zheng</span>
          </Link>
        </animated.h1>
        <p
          className={`${montserrat.className} text-sm tracking-widest mt-4 mb-4`}
        >
          <span className="font-normal">
            APPLIED MATHEMATICS-COMPUTER SCIENCE @ BROWN UNIVERSITY
          </span>
        </p>
        {/* @ts-expect-error Type Error with animated div */}
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
