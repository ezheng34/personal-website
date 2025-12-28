"use client";
import React from "react";
import { useSpring, animated } from "react-spring";
import Image from "next/image";

interface AboutProps {
  isVisible: boolean;
  isMenuExpanded?: boolean;
}

const About: React.FC<AboutProps> = ({ isVisible, isMenuExpanded = false }) => {
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
    // @ts-expect-error Type Error with animated section
    <animated.section
      style={props}
      className={`absolute md:fixed left-0 w-full min-h-screen md:h-screen md:overflow-hidden ${
        isMenuExpanded ? "top-[400px]" : "top-[200px]"
      }`}
      id="about"
    >
      <div className="md:grid md:grid-cols-2 gap-5 items-center py-8 px-4 md:px-8 xl:gap-8 sm:py-16 xl:px-16">
        <div className="flex justify-center">
          <Image
            loading="lazy"
            src="/images/night.jpeg"
            width={600}
            height={600}
            className="w-full max-w-md md:max-w-none rounded-[20px]"
            alt={""}
          />
        </div>
        <div className="mt-4 md:mt-0 text-left flex flex-col px-2 md:px-0">
          <div className="font-normal text-sm md:text-base lg:text-lg">
            Hi! My name is Eric Zheng and I&apos;m a junior at Brown University
            pursuing a Sc.B in Applied Mathematics and Computer Science.
            <br></br>
            <br></br>
            I&apos;ve worked with Java, Python, JavaScript, TypeScript, React,
            SQL, Go, C, C++,Google Firebase and other developer tools. I&apos;ve
            been able to apply these skills during my internships at AWS and
            Kognitiv Edge, and I&apos;m excited to see what I do next!
            <br></br>
            <br></br>
            In my free time, I enjoy reading, sleeping, hanging out with my cat,
            and spending time with friends and family.
            <br></br>
            <br></br>
            Thanks for visiting! 🌱
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    </animated.section>
  );
};

export default About;
