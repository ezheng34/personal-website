"use client";
import React, { useRef, useState, useEffect } from "react";
import { useSpring, animated, useSpringRef, useChain } from "react-spring";
import { Montserrat, Noto_Serif } from "next/font/google";
import { useRouter } from "next/navigation";
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
  onMenuExpandedChange?: (expanded: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  isHeroOpen,
  onMenuExpandedChange,
}) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isReversed, setIsReversed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const springRef = useSpringRef();
  const borderSpringRef = useSpringRef();
  const titleSpringRef = useSpringRef();
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close menu when hero is closed or reversed
  useEffect(() => {
    if (!isHeroOpen || isReversed) {
      setIsMenuExpanded(false);
    }
  }, [isHeroOpen, isReversed]);

  // Notify parent when menu expansion changes
  useEffect(() => {
    if (onMenuExpandedChange) {
      onMenuExpandedChange(isMenuExpanded);
    }
  }, [isMenuExpanded, onMenuExpandedChange]);

  const props = useSpring({
    ref: springRef,
    from: {
      top: "50%",
      transform: "translate(-50%, -50%)",
      width: isMobile ? "90%" : "60%",
    },
    to: {
      top: isHeroOpen && !isReversed ? "0%" : "50%",
      transform:
        isHeroOpen && !isReversed
          ? "translate(-50%, 0%)"
          : "translate(-50%, -50%)",
      width: isHeroOpen && !isReversed ? "100%" : isMobile ? "90%" : "60%",
    },
    config: { mass: 1, tension: 280, friction: 60 },
    onRest: () => {
      if (isHeroOpen && !isReversed && containerRef.current) {
        containerRef.current.style.width = "100%";
      }
    },
  });

  const borderStyle = useSpring({
    ref: borderSpringRef,
    from: { marginTop: "2.25rem" },
    to: {
      marginTop: isHeroOpen && !isReversed ? "1.25rem" : "2.25rem",
    },
    config: { mass: 1, tension: 280, friction: 60 },
  });

  const titleStyle = useSpring({
    ref: titleSpringRef,
    from: { fontSize: isMobile ? "2.5rem" : "3.75rem" },
    to: {
      fontSize:
        isHeroOpen && !isReversed
          ? isMobile
            ? "1.75rem"
            : "2.5rem"
          : isMobile
          ? "2.5rem"
          : "3.75rem",
    },
    config: { mass: 1, tension: 280, friction: 60 },
  });

  useChain(
    isHeroOpen && !isReversed
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
    setIsReversed(false);
    setIsMenuExpanded(false); // Close menu when section is clicked
  };

  const getSectionDisplayName = (section: string) => {
    const names: { [key: string]: string } = {
      about: "ABOUT",
      projects: "PROJECTS",
      resume: "RESUME",
      contact: "CONTACT",
    };
    return names[section] || "MENU";
  };

  const toggleReverse = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsReversed(!isReversed);
    setActiveSection("");
    setIsMenuExpanded(false); // Close menu when returning to hero
    onNavigate("hero");
    router.push("/");
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
          <Link href="/" onClick={toggleReverse}>
            <span className="font-semibold">Eric</span>
            <span className="font-light">Zheng</span>
          </Link>
        </animated.h1>
        <p
          className={`${montserrat.className} text-xs md:text-sm tracking-widest mt-4 mb-4 px-4`}
        >
          <span className="font-normal">
            APPLIED MATHEMATICS-COMPUTER SCIENCE @ BROWN UNIVERSITY
          </span>
        </p>
        {/* @ts-expect-error Type Error with animated div */}
        <animated.div style={borderStyle} className="w-full border-t-2" />
        <nav className="mt-5 w-full">
          {/* Mobile: Show current section only, expandable on click */}
          {isMobile && isHeroOpen && !isReversed ? (
            <div className="flex flex-col items-center">
              <button
                onClick={() => setIsMenuExpanded(!isMenuExpanded)}
                className={`${
                  montserrat.className
                } font-medium text-sm px-4 py-2 w-full flex items-center justify-between ${
                  activeSection ? "" : "opacity-50"
                }`}
              >
                <span className={activeSection ? "underline" : ""}>
                  {activeSection
                    ? getSectionDisplayName(activeSection)
                    : "MENU"}
                </span>
                <span className="ml-2 text-xs">
                  {isMenuExpanded ? "▲" : "▼"}
                </span>
              </button>
              {isMenuExpanded && (
                <ul
                  className={`${montserrat.className} font-medium flex flex-col items-center gap-3 mt-2 w-full text-sm`}
                >
                  {["about", "projects", "resume", "contact"].map((section) => (
                    <li key={section} className="w-full text-center">
                      <a
                        href={`#${section}`}
                        onClick={(e) => handleNavClick(e, section)}
                        className={`px-2 ${
                          activeSection === section ? "underline" : ""
                        }`}
                      >
                        {getSectionDisplayName(section)}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            /* Desktop: Always show all sections */
            <ul
              className={`${montserrat.className} font-medium flex flex-col md:flex-row items-center md:justify-between gap-3 md:gap-0 text-sm md:text-xl`}
            >
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, "about")}
                  className={`md:ml-16 px-2 ${
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
                  className={`px-2 ${
                    activeSection === "projects" ? "underline" : ""
                  }`}
                >
                  PROJECTS
                </a>
              </li>
              <li>
                <a
                  href="#resume"
                  onClick={(e) => handleNavClick(e, "resume")}
                  className={`px-2 ${
                    activeSection === "resume" ? "underline" : ""
                  }`}
                >
                  RESUME
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "contact")}
                  className={`md:mr-16 px-2 ${
                    activeSection === "contact" ? "underline" : ""
                  }`}
                >
                  CONTACT
                </a>
              </li>
            </ul>
          )}
        </nav>
        <div className="mt-5 mb-2 w-full border-t-2"></div>
      </div>
    </animated.div>
  );
};

export default HeroSection;
