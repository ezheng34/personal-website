import React from "react";
import { useSpring, animated } from "react-spring";
import { AiOutlineMail } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import Image from "next/image";

interface ContactProps {
  isVisible: boolean;
}

const Contact: React.FC<ContactProps> = ({ isVisible }) => {
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
      id="contact"
    >
      <div className="container mx-auto">
        <br></br>
        <p className="text-center text-2xl leading-relaxed">
          Thanks for visiting!
        </p>
        <br></br>
        <p className="text-center text-lg leading-relaxed">
          I'm currently looking for Summer 2025 opportunities. Connect with me
          on{" "}
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
            href="mailto:eric_zheng1@brown.edu"
            className="text-blue-500 underline hover:text-blue-400"
          >
            eric_zheng1@brown.edu
          </a>
          !
        </p>
        <br></br>
        <p className="text-center text-lg">
          Find me here:&nbsp;
          <a
            href="https://github.com/ezheng34"
            rel="noreferrer"
            target="_blank"
            className="inline-block h-10 w-10 align-middle"
          >
            <FaGithub className="h-full w-full bg-cover" />
          </a>
          <a
            href="https://www.linkedin.com/in/zheng-eric/"
            rel="noreferrer"
            target="_blank"
            className="inline-block h-10 w-10 align-middle"
          >
            <FaLinkedin className="h-full w-full bg-cover" />
          </a>
          <a
            href="mailto:eric_zheng1@brown.edu"
            rel="noreferrer"
            target="_blank"
            className="inline-block h-10 w-10 align-middle"
          >
            <BiLogoGmail className="h-full w-full bg-cover" />
          </a>
        </p>
        <br></br>
        <div className="flex items-center justify-center">
          <Image
            src="/images/cat.jpg"
            width={600}
            height={600}
            alt="Mocha"
            className="rounded-lg"
          />
        </div>
        <p className="text-center">Mocha ☕️</p>
      </div>
    </animated.section>
  );
};

export default Contact;
