// import React from "react";
// import CanvasBackground from "./CanvasBackground";
// import { Montserrat, Noto_Serif } from "next/font/google";

// const montserrat = Montserrat({
//   weight: ["300", "400", "600"],
//   subsets: ["latin"],
// });
// const serif = Noto_Serif({
//   weight: ["300", "400", "600"],
// });

// const HeroSection: React.FC = () => {
//   return (
//     <div className="relative h-screen w-full overflow-hidden">
//       <CanvasBackground />
//       <div className="hero">
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <div className="mt-3 text-center backdrop-blur-sm">
//             <h1
//               className={`${serif.className} mb-4 text-6xl font-normal tracking-wide`}
//             >
//               <a href="/">
//                 <span className="font-semibold">Eric</span>
//                 <span className="font-light">Zheng</span>
//               </a>
//             </h1>
//             <p
//               className={`${montserrat.className} mt-9 text-sm tracking-widest`}
//             >
//               <span className="font-normal">
//                 APPLIED MATH-COMPUTER SCIENCE @ BROWN UNIVERSITY
//               </span>
//             </p>
//             <div className="mt-9 w-full border-t-2"></div>
//             <nav className="mt-5">
//               <ul
//                 className={`${montserrat.className} font-medium mr-5 ml-5 flex space-x-12 justify-between`}
//               >
//                 <li>
//                   <a href="#about">ABOUT</a>
//                 </li>
//                 <li>
//                   <a href="#projects">PROJECTS</a>
//                 </li>
//                 <li>
//                   <a href="#resume">RESUME</a>
//                 </li>
//                 <li>
//                   <a href="#contact">CONTACT</a>
//                 </li>
//               </ul>
//             </nav>
//             <div className="mt-5 mb-2 w-full border-t-2"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
"use client";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
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
  const [isHeroOpen, setIsHeroOpen] = useState(false);

  const [props, setProps] = useSpring(() => ({
    from: { transform: "translateY(50vh)", maxWidth: "800px" },
    config: { mass: 1, tension: 80, friction: 26 },
  }));

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsHeroOpen(true);
    setProps({
      transform: "translateY(0)",
      maxWidth: "100%",
    });
  };

  const handleNameClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsHeroOpen(false);
    setProps({
      transform: "translateY(50vh)",
      maxWidth: "800px",
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <CanvasBackground />
      <animated.div style={props} className="hero-container">
        <div className="hero-content">
          <h1
            className={`${serif.className} mb-4 text-6xl font-normal tracking-wide`}
          >
            <a href="/" onClick={handleNameClick}>
              <span className="font-semibold">Eric</span>
              <span className="font-light">Zheng</span>
            </a>
          </h1>
          <p className={`${montserrat.className} mt-9 text-sm tracking-widest`}>
            <span className="font-normal">
              APPLIED MATH-COMPUTER SCIENCE @ BROWN UNIVERSITY
            </span>
          </p>
          <div className="mt-9 w-full border-t-2"></div>
          <nav className="mt-5">
            <ul
              className={`${montserrat.className} font-medium flex space-x-12 justify-between`}
            >
              <li>
                <a href="#about" onClick={handleNavClick}>
                  ABOUT
                </a>
              </li>
              <li>
                <a href="#projects" onClick={handleNavClick}>
                  PROJECTS
                </a>
              </li>
              <li>
                <a href="#resume" onClick={handleNavClick}>
                  RESUME
                </a>
              </li>
              <li>
                <a href="#contact" onClick={handleNavClick}>
                  CONTACT
                </a>
              </li>
            </ul>
          </nav>
          <div className="mt-5 mb-2 w-full border-t-2"></div>
        </div>
      </animated.div>
    </div>
  );
};

export default HeroSection;
