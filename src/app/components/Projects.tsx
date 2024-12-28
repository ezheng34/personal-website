"use client";
import React from "react";
import { useSpring, animated } from "react-spring";
import Image from "next/image";
import Link from "next/link";

interface ProjectData {
  title: string;
  description: string[];
  image: string;
  imageAlt: string;
  buttons: {
    text: string;
    link: string;
  }[];
}

interface ProjectCardProps {
  project: ProjectData;
  isVisible: boolean;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isVisible,
  index,
}) => {
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
    delay: isVisible ? 400 + index * 200 : 0,
  });

  return (
    // @ts-expect-error Type Error with animated div
    <animated.div style={props}>
      <div
        className={`md:grid md:grid-cols-2 gap-5 items-center py-6 px-8 xl:gap-8 sm:py-16 xl:px-16 ${
          index % 2 === 1 ? "md:flex-row-reverse" : ""
        }`}
      >
        <div
          className={`flex justify-center ${
            index % 2 === 1 ? "md:order-2" : ""
          }`}
        >
          <Image
            src={project.image}
            width={600}
            height={600}
            alt={project.imageAlt}
            className="rounded-lg"
          />
        </div>
        <div
          className={`mt-4 md:mt-0 text-left flex flex-col ${
            index % 2 === 1 ? "md:order-1" : ""
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
          {project.description.map((paragraph, i) => (
            <p key={i} className="font-normal text-basic md:text-lg mb-4">
              {paragraph}
            </p>
          ))}
          <div className="flex gap-4 mt-4">
            {project.buttons.map((button) => (
              <Link
                key={button.text}
                href={button.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                {button.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </animated.div>
  );
};

interface ProjectsProps {
  isVisible: boolean;
}

const projectsData: ProjectData[] = [
  {
    title: "Bearly Used",
    description: [
      "Final Project made with three other students that provides a platform for Brown and RISD students to upload goods to sell/buy/trade with other students",
      "Tech: React.js, TypeScript, Java, CSS, PostgreSQL, Bootstrap, Clerk Auth, Supabase, Playwright + JUnit Testing",
    ],
    image: "/images/projects/bearly_used.png",
    imageAlt: "Bearly Used Homepage",
    buttons: [
      {
        text: "GITHUB",
        link: "https://github.com/ezheng34/Bearly-Used",
      },
    ],
  },
  {
    title: "Aging and Cognition Lab",
    description: [
      "For Fullstack@Brown, I worked on the Research & Publications page for the revamped webpage for Dr. Elena Festa and Dr. William Heindel's lab.",
      "As a part of this, I participated in design talks and worked with a partner to implement the page from Lo-Fi to Hi-Fi.",
      "Tech: React.js, TypeScript, TailwindCSS, ComicCMS",
    ],
    image: "/images/projects/aging_cog.png",
    imageAlt: "Aging and Cognition Lab Page",
    buttons: [
      {
        text: "GITHUB",
        link: "https://github.com/fullstackatbrown/project-aging-and-cognition-lab",
      },
      {
        text: "WEBPAGE",
        link: "https://project-aging-and-cognition-lab.vercel.app/",
      },
    ],
  },
  {
    title: "Rangle Research Lab",
    description: [
      "For Fullstack@Brown, I worked on the Home Page for the Dr. David Enrique Rangel's lab.",
      "The site contains preliminary information about the study, allows for families to toggle between English and Spanish webpages, and links to the qualtrics survey for the study.",
      "Tech: React.js, next.js (TypeScript), TailwindCSS",
    ],
    image: "/images/projects/rangel_research.png",
    imageAlt: "Rangel Research Team Page",
    buttons: [
      {
        text: "GITHUB",
        link: "https://github.com/bwu29/rangelresearch",
      },
      {
        text: "WEBPAGE",
        link: "https://rangelresearch.vercel.app/",
      },
    ],
  },
  {
    title: "This Page!",
    description: [
      "This is the website you're looking at right now!",
      "Tech: next.js (TypeScript), TailwindCSS, Vercel",
    ],
    image: "/images/projects/personal_website.png",
    imageAlt: "About Page",
    buttons: [
      {
        text: "GITHUB",
        link: "https://github.com/ezheng34/personal-website",
      },
    ],
  },
];

const Projects: React.FC<ProjectsProps> = ({ isVisible }) => {
  return (
    // @ts-expect-error Type Error with animated div
    <animated.section
      className="absolute top-[200px] left-0 w-full min-h-screen"
      id="projects"
    >
      {projectsData.map((project, index) => (
        <ProjectCard
          key={project.title}
          project={project}
          isVisible={isVisible}
          index={index}
        />
      ))}
    </animated.section>
  );
};

export default Projects;
