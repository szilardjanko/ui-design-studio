import { CheckCircle, Circle } from "@/components/icons/CheckCircle";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [showReleased, setShowReleased] = useState(true);

  const roadMapList = (done: boolean, info: string) => {
    return (
      <div className="my-0.5 flex min-h-20 items-center border-b border-slate-500 py-0.5 text-white">
        <div className="ml-4">{done ? <CheckCircle /> : <Circle />}</div>
        <div className="ml-3 text-left">{info}</div>
      </div>
    );
  };
  return (
    <main>
      <div className="mx-auto flex select-none flex-col items-center justify-center text-center">
        <div
          className="pb-1 text-3xl font-bold text-white hover:animate-pulse md:text-4xl"
          onMouseEnter={(e) => {
            e.currentTarget.style.transition = "color 2s ease";
            e.currentTarget.style.background =
              "linear-gradient(to right, #024d98, #ffb354, #d00137)";
            e.currentTarget.style.backgroundClip = "text";
            e.currentTarget.style.color = "transparent";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transition = "";
            e.currentTarget.style.background = "";
            e.currentTarget.style.color = "";
          }}
        >
          DCL UI Design Studio
        </div>
        <div className="mt-2 text-xs tracking-tight text-white md:text-sm">
          Funded by the
        </div>
        <div className="-mt-2 w-64 md:w-72">
          <Image src={"/dclDAO.png"} alt="DCL DAO" width={7968} height={1170} />
        </div>
        <div className="-mt-5 w-52 md:-mt-8 md:w-80">
          <Image
            className="hover:animate-spin-slow"
            priority={true}
            src={"/uiIcon.png"}
            alt="DCL DAO"
            width={512}
            height={512}
          />
        </div>
        <div className="-mt-5 w-11/12 text-sm text-white md:-mt-8 md:w-1/2 md:text-base">
          An open sourced web app enabling anyone to design interactive UIs for
          DCL scenes without coding.
          <br />
          This drag-and-drop platform simplifies UI creation, enhancing
          accessibility and efficiency for creators.
        </div>
        <div className="mt-8 flex min-h-20 w-11/12 flex-row items-center border-x border-t border-slate-500 bg-gradient-to-tl from-slate-600 to-slate-900 shadow shadow-slate-700 md:w-1/3 ">
          <div className="mr-2 text-left indent-6 text-lg font-bold text-white">
            Roadmap:
          </div>
          <div
            className={`mx-2 cursor-pointer text-left font-medium text-white ${showReleased ? "underline" : "text-slate-400"}`}
            onClick={() => setShowReleased(true)}
          >
            Released
          </div>
          <div
            className={`mx-2 cursor-pointer text-left font-medium text-white ${!showReleased ? "underline" : "text-slate-400"}`}
            onClick={() => setShowReleased(false)}
          >
            Upcoming
          </div>
        </div>
        <div className="mb-4 flex h-80 w-11/12 flex-col overflow-auto border-x border-b border-slate-500 md:w-1/3">
          {showReleased && (
            <>
              {roadMapList(
                true,
                "Setup Next.js project and create a repository on GitHub",
              )}
              {roadMapList(
                true,
                "Develop the apps layout: landing page, create UI page, and docs",
              )}
              {roadMapList(
                true,
                "Setup a basic drag and drop system on the create UI page",
              )}
              {roadMapList(true, "Develop label UI elements")}
              {roadMapList(true, "Host the webapp on Vercel")}
              {roadMapList(true, "Develop button and input field UI elements")}
              {roadMapList(
                true,
                "Create a function that allows resizing UI elements",
              )}
              {roadMapList(
                true,
                "Create a function that allows customizing text on the UI elements",
              )}
              {roadMapList(
                true,
                "Create basic DCL UI code generator component",
              )}
              {roadMapList(
                true,
                "Refine drag and drop system, creating a more customizable grid system to help align UI elements",
              )}
              {roadMapList(
                true,
                "Create a function that allows customizing the UI elements colors",
              )}
              {roadMapList(
                true,
                "Alpha release: launch for early feedback from a select testing group",
              )}
            </>
          )}
          {!showReleased && (
            <>
              {roadMapList(false, "Collect feedback from testing group")}
              {roadMapList(
                false,
                "Create advanced customization options for UI elements",
              )}
              {roadMapList(
                false,
                "Implement feedback from the alpha testing group",
              )}
              {roadMapList(
                false,
                "Develop dynamic UIs and button event handling",
              )}
              {roadMapList(
                false,
                "Create preset drag and drop components for social media links",
              )}
              {roadMapList(false, "Improve DCL UI code generator component")}
              {roadMapList(
                false,
                "Finalize the advanced customization features",
              )}
              {roadMapList(
                false,
                "Setup a feedback collection system for beta testing",
              )}
              {roadMapList(
                false,
                "Beta release: open beta for Decentraland DAO community to test features",
              )}
              {roadMapList(
                false,
                "Develop initial collaborative design functionalities",
              )}
              {roadMapList(
                false,
                "Preset Designs: introduce preset UI designs for quick customization",
              )}
              {roadMapList(
                false,
                "Custom Designs: allow users to upload their own custom designs including sprite sheets",
              )}
              {roadMapList(false, "Integrate feedback from beta testing")}
              {roadMapList(
                false,
                "Develop backend services for account creation and management",
              )}
              {roadMapList(
                false,
                "Prepare documentation for the basic features",
              )}
              {roadMapList(
                false,
                "Collaboration features launch: enable optional account creating to save, continue, as well as share work progress",
              )}
              {roadMapList(
                false,
                "Extensive testing and refining all functionalities",
              )}
              {roadMapList(false, "Public Release: Officially launch the tool")}
              {roadMapList(
                false,
                "Feedback integration: continue to monitor and implement improvements based on the feedback from the public release",
              )}
              {roadMapList(
                false,
                "Expand UI Library: Add more elements and preset design templates",
              )}
              {roadMapList(
                false,
                "Community contribution: Encourage user contributions to the UI Library",
              )}
              {roadMapList(
                false,
                "Publish detailed tutorials and documentation covering all features",
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
