import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Accordion titles and descriptions
const Title = "PROCESS";
const SubTitle = "Things I can help you with:";
const skillsData = [
  {
    title: "Art Direction",
    description: "My process starts by crafting a visual narrative for the project, making it memorable, striking, and beautiful. I place great importance on deeply understanding the project brief and client needs, identifying project goals, and conducting thorough research into competitors and target audiences...",
  },
  {
    title: "Digital Design",
    description: "After establishing the desired mood and tone, I explore different design iterations to create an enjoyable user experience while maintaining an elegant user interface. I actively seek feedback from users and clients to guide the design evolution...",
  },
  {
    title: "Webflow Development",
    description: "With Webflow, I focus on custom design to deliver a responsive, pixel-perfect website with carefully crafted animations. My goal is to create a seamless, easy-to-maintain website that adapts flawlessly to any screen size...",
  },
  {
    title: "Interaction Design",
    description: "I believe motion and interactivity are essential in digital environments, serving as a vital link between the audience and the product. Subtle micro-interactions can elevate the overall user experience, leaving a lasting impression...",
  },
];

// Icon component that rotates when accordion is open
const ExpandIcon = ({ isOpen }) => (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    className="ml-4"
  >
    <line
      x1="5" y1="12"
      x2="19" y2="12"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <motion.line
      x1="12" y1="5"
      x2="12" y2="19"
      stroke="currentColor"
      strokeWidth="1.5"
      animate={{
        rotate: isOpen ? 90 : 0,
      }}
      initial={false}
      transition={{
        duration: 0.5,
        ease: 'easeInOut'
      }}
      style={{ originX: '50%', originY: '50%' }}
    />
  </motion.svg>
);

const AccordianAnimation = () => {
  const [activeIndexes, setActiveIndexes] = useState([]);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  const toggleAccordion = (index) => {
    setActiveIndexes(prevIndexes =>
      prevIndexes.includes(index)
        ? prevIndexes.filter(i => i !== index)
        : [...prevIndexes, index]
    );
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Animation variants for letter-by-letter title animation
  const letterVariants = {
    hidden: { opacity: 0, y: 30 }, // Start off-screen
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05, // Sequential delay for each letter
        duration: 0.4,
      },
    }),
  };

  // Animation variants for sliding the title and index
  const titleVariants = {
    initial: { y: 0 },
    hover: { y: 40 }, // Move down on hover
  };

  const hiddenTitleVariants = {
    initial: { y: -40 }, // Start hidden above
    hover: { y: 0 }, // Slide into place on hover
  };

  const indexVariants = {
    initial: { y: 0 },
    hover: { y: -40 }, // Move up on hover
  };

  const hiddenIndexVariants = {
    initial: { y: 40 }, // Start hidden below
    hover: { y: 0 }, // Slide into place on hover
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#e1e1e1] text-[#202020]">
      <div className="max-w-screen mx-auto my-auto px-4 md:px-24 w-full">
        <div ref={ref} className="flex items-center justify-between">
          <h1 className="flex justify-start text-5xl sm:text-7xl tracking-wide w-1/3">
          {Title.split("").map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                initial="hidden"
                animate={controls}
                variants={letterVariants}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <span className="hidden sm:block text-xl md:mr-auto mt-auto">
            {SubTitle}
          </span>
        </div>
        <div className="border-b border-[#505050] mt-2" />
        <div className="w-full sm:w-2/3 ml-auto">
          {skillsData.map((skill, index) => (
            <motion.div
              key={index}
              className="border-b border-[#505050] relative group"
              initial="initial"
              whileHover="hover" // Trigger hover animation
            >
              <div
                className="flex justify-between items-center py-10 cursor-pointer"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndexes.includes(index)}
                aria-controls={`panel-${index}`}
              >
                <div className="flex items-center gap-x-6 relative">
                  <div className="relative overflow-hidden">
                    {/* Current Index */}
                    <motion.span
                      className="text-xs sm:text-lg tracking-[0.15em] font-bold mb-auto block"
                      variants={indexVariants}
                      transition={{ duration: 0.3 }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.span>
                    {/* Hidden Index */}
                    <motion.span
                      className="text-xs sm:text-lg tracking-[0.15em] font-bold mb-auto block absolute top-0 left-0"
                      variants={hiddenIndexVariants}
                      transition={{ duration: 0.3 }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.span>
                  </div>
                  <div className="relative overflow-hidden">
                    {/* Current Title */}
                    <motion.span
                      className="text-xl sm:text-4xl font-medium block"
                      variants={titleVariants}
                      transition={{ duration: 0.3 }}
                    >
                      {skill.title}
                    </motion.span>
                    {/* Hidden Title */}
                    <motion.span
                      className="text-xl sm:text-4xl font-medium block absolute top-0 left-0"
                      variants={hiddenTitleVariants}
                      transition={{ duration: 0.3 }}
                    >
                      {skill.title}
                    </motion.span>
                  </div>
                </div>
                <ExpandIcon isOpen={activeIndexes.includes(index)} />
              </div>
              <motion.div
                id={`panel-${index}`}
                initial={{ height: 0 }}
                animate={{
                  height: activeIndexes.includes(index) ? 'auto' : 0,
                }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div className="pb-8 pr-12 text-sm sm:text-lg whitespace-pre-line">
                  <p>{skill.description}</p>
                </div>
              </motion.div>
              <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-transparent group-hover:bg-[#2b2a2a] transition-all duration-700 ease-in">
                <div className="h-full w-0 group-hover:w-full bg-[#2b2a2a] transition-all duration-700 ease-out"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccordianAnimation;