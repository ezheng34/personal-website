import React from "react";
import { useSpring, animated } from "react-spring";

interface ResumeProps {
  isVisible: boolean;
}

const Resume: React.FC<ResumeProps> = ({ isVisible }) => {
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
      id="resume"
    >
      <div className="w-full h-screen px-8 xl:px-16">
        <br></br>
        <p className="text-center font-normal text-lg">
          Here's a{" "}
          <a
            href="https://drive.google.com/file/d/1fCr_PdJM9w5QYv8b47Yap7TeNxT_xIRN/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            link to the full PDF
          </a>{" "}
          , or you can view it here:
        </p>
        <br></br>
        <iframe
          src="https://drive.google.com/file/d/1fCr_PdJM9w5QYv8b47Yap7TeNxT_xIRN/preview"
          style={{
            width: "800px",
            height: "900px",
            border: "none",
            margin: "auto",
            display: "block",
          }}
          title="Resume"
        />
      </div>
    </animated.section>
  );
};

export default Resume;
