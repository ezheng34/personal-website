"use client";
import React from "react";
import { useSpring, animated } from "react-spring";

interface AboutProps {
  isVisible: boolean;
}

const About: React.FC<AboutProps> = ({ isVisible }) => {
  const props = useSpring({
    from: {
      transform: "translateY(-20%)",
      opacity: 0,
    },
    to: {
      transform: isVisible ? "translateY(0%)" : "translateY(-20%)",
      opacity: isVisible ? 1 : 0,
    },
    config: { mass: 1, tension: 280, friction: 60 },
    delay: isVisible ? 400 : 0,
  });

  return (
    <animated.section
      style={props}
      className="absolute top-[200px] left-0 w-full min-h-screen"
      id="about"
    >
      <div className="max-w-[800px] mx-auto text-white">
        <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
          <div>About Content</div>
        </div>
      </div>
    </animated.section>
  );
};

export default About;
