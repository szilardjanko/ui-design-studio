import { Components } from "@/components/docs/Components";
import { Controls } from "@/components/docs/Controls";
import { Preset } from "@/components/docs/Preset";
import { SideBarDocs } from "@/components/docs/SideBarDocs";
import { Social } from "@/components/docs/Social";
import { UiCode } from "@/components/docs/UiCode";
import { UiEditor } from "@/components/docs/UiEditor";
import { useSideBar } from "@/context/SideBarContext";
import React from "react";

export default function Docs() {
  const { sideBarDocsOptions } = useSideBar();

  return (
    <div className="flex flex-row text-white">
      <SideBarDocs />
      <div className="flex w-full flex-col">
        <div className="text-center text-3xl font-bold md:text-4xl">
          Documentation
        </div>
        <div className="mt-2 flex max-h-[calc(100vh-10rem)] flex-row overflow-y-auto">
          {sideBarDocsOptions === "components" && <Components />}
          {sideBarDocsOptions === "preset" && <Preset />}
          {sideBarDocsOptions === "social" && <Social />}
          {sideBarDocsOptions === "controls" && <Controls />}
          {sideBarDocsOptions === "editor" && <UiEditor />}
          {sideBarDocsOptions === "uiCode" && <UiCode />}
        </div>
      </div>
    </div>
  );
}
