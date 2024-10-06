import React, { useState } from 'react';

const Title = "PROCESS";
const SubTitle = "Things I can help you with:";
const skillsData = [
  {
    title: "Art Direction",
    description: "My process starts by crafting a visual narrative for the project, making it memorable, striking, and beautiful. I place great importance on deeply understanding the project brief and client needs, identifying project goals, and conducting thorough research into competitors and target audiences..."
  },
  {
    title: "Digital Design",
    description: "After establishing the desired mood and tone, I explore different design iterations to create an enjoyable user experience while maintaining an elegant user interface. I actively seek feedback from users and clients to guide the design evolution..."
  },
  {
    title: "Webflow Development",
    description: "With Webflow, I focus on custom design to deliver a responsive, pixel-perfect website with carefully crafted animations. My goal is to create a seamless, easy-to-maintain website that adapts flawlessly to any screen size..."
  },
  {
    title: "Interaction Design",
    description: "I believe motion and interactivity are essential in digital environments, serving as a vital link between the audience and the product. Subtle micro-interactions can elevate the overall user experience, leaving a lasting impression..."
  },
];

const AccordionBasic = () => {
  const [activeIndexes, setActiveIndexes] = useState([]);

  const toggleAccordion = (index) => {
    setActiveIndexes(prevIndexes =>
      prevIndexes.includes(index)
        ? prevIndexes.filter(i => i !== index)
        : [...prevIndexes, index]
    );
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#e1e1e1] text-[#202020]">
      <div className="max-w-screen mx-auto my-auto px-4 md:px-24 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl sm:text-7xl tracking-wide w-1/3 flex justify-start">
            {Title}
          </h1>
          <span className="text-base sm:text-xl sm:mr-auto mt-auto">
            {SubTitle}
          </span>
        </div>
        <div className="border-b border-[#505050] mt-2" />
        <div className="w-full sm:w-2/3 ml-auto">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="border-b border-[#505050]"
            >
              <div
                className="flex justify-between items-center py-10 cursor-pointer"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndexes.includes(index)}
                aria-controls={`panel-${index}`}
              >
                <div className="flex items-center gap-x-6 relative">
                  <span className="text-lg tracking-[0.15em] font-semibold mb-auto ">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-4xl font-medium ">
                    {skill.title}
                  </span>
                </div>
              </div>
              <div
                id={`panel-${index}`}
                className={`overflow-hidden transition-all duration-500 ${
                  activeIndexes.includes(index) ? 'max-h-full' : 'max-h-0'
                }`}
              >
                <div className="pb-8 pr-12 text-lg whitespace-pre-line">
                  <p>{skill.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccordionBasic;