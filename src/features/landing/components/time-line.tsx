"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const timelineData = [
  {
    step: "Step 1",
    title: "In-depth history taking to understand you as a person, your lifestyle/habits and the problems you face",
    // description:
    //   "Understand you as a person, your lifestyle/habits and the problems you face.",
  },
  {
    step: "Step 2",
    title: 'Implement a personalised action plan in collaboration with you.',
    // description: "Work in collaboration with you to manage your injuries and pain.",
  },
  {
    step: "Step 3",
    title: "Exercise-based rehabilitation for results that last.",
    // description:
    //   "Understand you as a person, your lifestyle/habits and the problems you face.",
  },
  {
    step: "Step 4",
    title: 'Variety of in-house options and support to help you reach your goals.',
    // description: "Work in collaboration with you to manage your injuries and pain.",
  },
  {
    step: "Step 5",
    title: 'Work closely with YOUR community to get you to 100%.',
    // description: "Work in collaboration with you to manage your injuries and pain.",
  },
];

const Timeline = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.8;
      const element = document.getElementById("timeline");

      if (element) {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < triggerPoint) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-10 bg-[#F8E6DA]">
      <h1 className="text-center text-primary-1 font-bold">
        Our Assessment Process
      </h1>

      <div id="timeline" className="relative flex flex-col items-center mt-8">
        {/* Timeline Line */}
        <div className="absolute w-1 bg-red-500 h-full left-1/2 transform -translate-x-1/2"></div>

        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.3 }}
            className={`flex flex-col items-center w-full md:w-1/2 text-center px-6 py-6 ${
              index % 2 === 0 ? "self-start md:pr-10" : "self-end md:pl-10"
            }`}
          >
            {/* Circle Indicator */}
            <div className="w-6 h-6 bg-red-500 rounded-full border-4 border-white relative"></div>

            {/* Step Text */}
            <p className="text-sm font-semibold mt-2">{item.step}</p>

            {/* Title & Description */}
            <h3 className="text-lg font-bold text-primary-1 mt-2">
              {item.title}
            </h3>
            <p className="text-gray-700">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
