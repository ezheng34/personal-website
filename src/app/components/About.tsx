"use client";
import React from "react";
import { useSpring, animated } from "react-spring";
import Image from "next/image";

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
      className="fixed top-[200px] left-0 w-full h-screen overflow-hidden"
      id="about"
    >
      <div className="md:grid md:grid-cols-2 gap-5 items-center py-8 px-8 xl:gap-8 sm:py-16 xl:px-16">
        <Image
          loading="lazy"
          src="/images/night.jpeg"
          width={600}
          height={600}
          style={{ borderRadius: "20px" }}
          alt={""}
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col">
          <div className="font-normal text-basic md:text-lg">
            Hi! My name is Eric Zheng and I&apos;m a sophomore at Brown
            University pursuing a Sc.B in Applied Mathematics and Computer
            Science.
            <br></br>
            <br></br>
            I&apos;ve worked with Java, Python, JavaScript, TypeScript, React,
            SQL, Google Firebase and other developer tools. I&apos;ve been able
            to apply these skills during my internship at Kognitiv Edge making
            React components for Microsoft Power Apps and I&apos;m excited to
            see what I do next!
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
