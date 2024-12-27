// components/ExpandedNavbar.tsx
import React from "react";
import { Montserrat, Noto_Serif } from "next/font/google";

const montserrat = Montserrat({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});
const serif = Noto_Serif({
  weight: ["300", "400", "600"],
});

const ExpandedNavbar: React.FC<{
  activeSection: string;
  onSectionChange: (section: string) => void;
}> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-black bg-opacity-80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-6">
        <h1
          className={`${serif.className} text-4xl font-normal tracking-wide text-center`}
        >
          <a href="/" onClick={() => onSectionChange("home")}>
            <span className="font-semibold">Eric</span>
            <span className="font-light">Zheng</span>
          </a>
        </h1>
        <nav className="mt-4">
          <ul
            className={`${montserrat.className} font-medium flex justify-center space-x-8`}
          >
            {["about", "projects", "resume", "contact"].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={`uppercase ${
                    activeSection === section ? "text-white" : "text-gray-400"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSectionChange(section);
                  }}
                >
                  {section}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ExpandedNavbar;
