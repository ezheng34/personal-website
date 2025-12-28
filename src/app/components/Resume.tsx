import React from "react";
import { useSpring, animated } from "react-spring";

interface ResumeProps {
  isVisible: boolean;
  isMenuExpanded?: boolean;
}

const Resume: React.FC<ResumeProps> = ({
  isVisible,
  isMenuExpanded = false,
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
    delay: isVisible ? 400 : 0,
  });

  return (
    // @ts-expect-error Type Error with animated section
    <animated.section
      style={props}
      className={`absolute left-0 w-full min-h-screen ${
        isMenuExpanded ? "top-[400px]" : "top-[200px]"
      }`}
      id="resume"
    >
      <div className="w-full min-h-full px-4 md:px-8 xl:px-16 py-8">
        <br></br>
        <br></br>
        <p className="text-center font-normal text-sm md:text-base lg:text-lg px-4">
          Here&apos;s a{" "}
          <a
            href="https://drive.google.com/file/d/1CgFrx9In1U53o1mI9pGuHnU_yzwDOTAa/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            link to the full PDF
          </a>{" "}
          , or you can view it here:
        </p>
        <br></br>
        <div className="w-full flex justify-center px-4">
          <iframe
            src="https://drive.google.com/file/d/1CgFrx9In1U53o1mI9pGuHnU_yzwDOTAa/preview"
            className="w-full max-w-4xl border-none"
            style={{
              aspectRatio: "8.5 / 11",
              minHeight: "400px",
              maxHeight: "90vh",
            }}
            title="Resume"
          />
        </div>
      </div>
    </animated.section>
  );
};

export default Resume;
