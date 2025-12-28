import React from "react";
import { useSpring, animated } from "react-spring";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import Image from "next/image";

interface ContactProps {
  isVisible: boolean;
  isMenuExpanded?: boolean;
}

const Contact: React.FC<ContactProps> = ({ isVisible, isMenuExpanded = false }) => {
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
      className={`absolute left-0 w-full min-h-screen ${
        isMenuExpanded ? "top-[400px]" : "top-[200px]"
      }`}
      id="contact"
    >
      <div className="container mx-auto px-4 md:px-8">
        <br></br>
        <br></br>
        <p className="text-center text-xl md:text-2xl leading-relaxed px-4">
          Thanks for visiting!
        </p>
        <br></br>
        <p className="text-center text-sm md:text-base lg:text-lg leading-relaxed px-4">
          I&apos;m currently looking for Summer 2026 opportunities. Connect with
          me on{" "}
          <a
            href="https://www.linkedin.com/in/zheng-eric/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-400"
          >
            LinkedIn
          </a>{" "}
          or email me directly at{" "}
          <a
            href="mailto:erzheng37@gmail.com"
            className="text-blue-500 underline hover:text-blue-400"
          >
            erzheng37@gmail.com
          </a>
          !
        </p>
        <br></br>
        <p className="text-center text-sm md:text-base lg:text-lg px-4">
          Find me here:&nbsp;
          <a
            href="https://github.com/ezheng34"
            rel="noreferrer"
            target="_blank"
            className="inline-block h-8 w-8 md:h-10 md:w-10 align-middle mx-1"
          >
            <FaGithub className="h-full w-full bg-cover" />
          </a>
          <a
            href="https://www.linkedin.com/in/zheng-eric/"
            rel="noreferrer"
            target="_blank"
            className="inline-block h-8 w-8 md:h-10 md:w-10 align-middle mx-1"
          >
            <FaLinkedin className="h-full w-full bg-cover" />
          </a>
          <a
            href="mailto:erzheng37@gmail.com"
            rel="noreferrer"
            target="_blank"
            className="inline-block h-8 w-8 md:h-10 md:w-10 align-middle mx-1"
          >
            <BiLogoGmail className="h-full w-full bg-cover" />
          </a>
        </p>
        <br></br>
        <div className="flex items-center justify-center px-4">
          <Image
            src="/images/cat.jpg"
            width={600}
            height={600}
            alt="Mocha"
            className="w-full max-w-md md:max-w-lg rounded-lg"
          />
        </div>
        <p className="text-center mt-4">Mocha ☕️</p>
      </div>
    </animated.section>
  );
};

export default Contact;
