import React, { useEffect, useRef, useState } from "react";

type TimelineDataProps = {
  quarter: string;
  months: [string[], string[]?, string[]?];
};

type TimelineItemProps = {
  item: TimelineDataProps;
  index: number;
  isVisible: boolean;
};

const timelineData: TimelineDataProps[] = [
  {
    quarter: "Q1 - 2024",
    months: [
      [
        "March",
        "Developed the idea for the DCL UI Design Studio tool.\nSubmitted a proposal to the Decentraland DAO for funding.\nSuccessfully passed the voting process, receiving grant funding.\nDevelopment of the project begins.",
      ],
    ],
  },
  {
    quarter: "Q2 - 2024",
    months: [
      [
        "April",
        "Setup Next.js project and create a repository on GitHub.\nDevelop the apps layout: landing page, create UI page, and docs.\nSetup a basic drag and drop system on the create UI page.\nDevelop label UI elements\nHost the webapp on Vercel",
      ],
      [
        "May",
        "Develop button and input field UI elements.\nCreate a function that allows resizing UI elements.\nCreate a function that allows customizing text on the UI elements.\nCreate basic DCL UI code generator component.",
      ],
      [
        "June",
        "Refine drag and drop system, creating a more customizable grid system to help align UI elements.\nCreate a function that allows customizing the UI elements colors.\nAlpha release: launch for early feedback from a select testing group.\nCollect feedback from testing group.",
      ],
    ],
  },
  {
    quarter: "Q3 - 2024",
    months: [
      [
        "July",
        "Create advanced customization options for UI elements.\nImplement feedback from the alpha testing group.",
      ],
      [
        "August",
        "Develop dynamic UIs and button event handling.\nCreate preset drag and drop components for social media links\nImprove DCL UI code generator component",
      ],
      [
        "September",
        "Finalize the advanced customization features\nSetup a feedback collection system for beta testing\nBeta release: open beta for Decentraland DAO community to test features\nDevelop initial collaborative design functionalities",
      ],
    ],
  },
  {
    quarter: "Q4 - 2024",
    months: [
      [
        "October",
        "Preset Designs: introduce preset UI designs for quick customization\nCustom Designs: allow users to upload their own custom designs including sprite sheets",
      ],
      [
        "November",
        "Integrate feedback from beta testing\nDevelop backend services for account creation and management\nPrepare documentation for the basic features",
      ],
      [
        "December",
        "Collaboration features launch: enable optional account creating to save, continue, as well as share work progress\nExtensive testing and refining all functionalities\nPublic Release: Officially launch the tool",
      ],
    ],
  },
  {
    quarter: "Q1 - 2025",
    months: [
      [
        "January",
        "Feedback integration: continue to monitor and implement improvements based on the feedback from the public release\nExpand UI Library: Add more elements and preset design templates\nCommunity contribution: Encourage user contributions to the UI Library\nPublish detailed tutorials and documentation covering all features",
      ],
    ],
  },
];

const TimelineItem = ({ item, index, isVisible }: TimelineItemProps) => {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);

  const formatMonths = (months: [string[], string[]?, string[]?]) => {
    return (
      <>
        <div className="flex items-center justify-center">
          {months.map((month, i) => (
            <div
              key={i}
              className={`cursor-pointer px-2 py-1 text-sm hover:text-white md:text-base ${
                i === selectedMonthIndex
                  ? "font-bold text-white underline"
                  : "text-slate-200"
              }`}
              onMouseEnter={() => setSelectedMonthIndex(i)}
            >
              {month ? month[0] : ""}
            </div>
          ))}
        </div>
        <div className="mx-auto my-2 flex flex-col items-center justify-center text-xs md:text-sm">
          <div className="max-w-md text-left text-slate-100">
            {months[selectedMonthIndex] &&
              months[selectedMonthIndex]?.[1] &&
              months[selectedMonthIndex]?.[1].split("\n").map((line, i) => (
                <span key={i}>
                  ∘ {line}
                  <br />
                </span>
              ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="absolute left-12 w-fit -translate-x-1/2 transform rounded-xl border border-slate-300 bg-slate-900 px-2.5 py-1.5 text-sm shadow shadow-slate-800 hover:border-red-400 md:left-1/2 md:text-lg">
        {item.quarter}
      </div>
      <div
        className={`mb-20 flex w-full ${
          index % 2 === 0 ? "flex-row-reverse" : ""
        } transition-opacity duration-1000 ease-in-out ${
          isVisible
            ? "translate-x-0 opacity-100"
            : index % 2 === 0
              ? "translate-x-20 opacity-0"
              : "translate-x-20 opacity-0 md:-translate-x-20"
        }`}
        style={{
          transform: isVisible
            ? "translateX(0)"
            : index % 2 === 0
              ? "translateX(20px)"
              : "translateX(20px) md:translateX(-20px)",
          transition: "all 1s ease-in-out",
        }}
      >
        <div
          className={`relative w-full ${index % 2 === 0 ? "ml-[6.5rem] mr-4 md:ml-12 md:mr-4 lg:mr-12" : "ml-[6.5rem] mr-4 md:ml-4 md:mr-12 lg:ml-12"}`}
        >
          <div
            className={`w-full rounded-xl border border-slate-300 bg-slate-300 bg-opacity-20 p-3 shadow-md shadow-slate-800 hover:shadow-slate-500 md:w-2/5 md:p-6 ${
              index % 2 === 0 ? "ml-auto" : "ml-auto md:ml-0 md:mr-auto"
            }`}
          >
            <div className="text-base md:text-lg">
              {item.months && formatMonths(item.months)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const Roadmap = () => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    Array(timelineData.length).fill(false),
  );
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleItems((prevState) => {
              const newState = [...prevState];
              newState[index] = true;
              return newState;
            });
            observer.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item) => observer.current?.observe(item));

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return (
    <div className="container relative mx-auto overflow-hidden py-12">
      <div className="mb-8 mt-2 text-4xl">Roadmap</div>
      <div className="absolute left-12 h-full w-0.5 -translate-x-1/2 transform bg-slate-100 bg-opacity-75 md:left-1/2 md:w-1"></div>
      {timelineData.map((item, index) => (
        <div key={index} className="timeline-item h-64" data-index={index}>
          <TimelineItem
            item={item}
            index={index}
            isVisible={visibleItems[index]}
          />
        </div>
      ))}
    </div>
  );
};
