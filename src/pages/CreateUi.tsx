import React from "react";
import { useSideBar } from "@/context/SideBarContext";
import Preset from "@/components/sideBar/Preset";
import Social from "@/components/sideBar/Social";
import Components from "@/components/sideBar/Components";

const CreateUi = () => {
  const { sideBarOptions, handleSideBarSelection } = useSideBar();

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex flex-row items-start justify-start ">
        <div className="flex select-none flex-col px-2">
          <div
            className={`w-40 cursor-pointer border border-black px-2 py-1 hover:border-slate-400 hover:bg-gradient-to-tl hover:from-slate-700 hover:to-slate-900 ${
              sideBarOptions === "components" &&
              "border-slate-500 bg-gradient-to-tl from-slate-700 to-slate-900 hover:border-slate-400"
            }`}
            onClick={() => handleSideBarSelection("components")}
          >
            Components
          </div>

          <div
            className={`w-40 cursor-pointer border border-black px-2 py-1 hover:border-slate-400 hover:bg-gradient-to-tl hover:from-slate-700 hover:to-slate-900 ${
              sideBarOptions === "preset" &&
              "border-slate-500 bg-gradient-to-tl from-slate-700 to-slate-900 hover:border-slate-400"
            }`}
            onClick={() => handleSideBarSelection("preset")}
          >
            Preset Designs
          </div>

          <div
            className={`w-40 cursor-pointer border border-black px-2 py-1 hover:border-slate-400 hover:bg-gradient-to-tl hover:from-slate-700 hover:to-slate-900 ${
              sideBarOptions === "social" &&
              "border-slate-500 bg-gradient-to-tl from-slate-700 to-slate-900 hover:border-slate-400"
            }`}
            onClick={() => handleSideBarSelection("social")}
          >
            Social Media
          </div>

          {sideBarOptions === "components" && <Components />}
          {sideBarOptions === "preset" && <Preset />}
          {sideBarOptions === "social" && <Social />}
        </div>
      </div>
    </div>
  );
};

export default CreateUi;
