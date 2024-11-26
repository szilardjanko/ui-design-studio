import { useSideBar } from "@/context/SideBarContext";
import React from "react";
import Button from "../Button";

export const SideBarDocs = () => {
  const { sideBarDocsOptions, setSideBarDocsOptions } = useSideBar();
  return (
    <div className="flex flex-col gap-1 px-2">
      <Button
        variant={sideBarDocsOptions === "components" ? "selected" : "neutral"}
        text="Components"
        onClick={() => setSideBarDocsOptions("components")}
      />
      {sideBarDocsOptions === "components" && (
        <div className="mx-4 my-2">
          <div>• Containers</div>
          <div>• Labels</div>
          <div>• Buttons</div>
          <div>• Input Fields</div>
        </div>
      )}
      <Button
        variant={sideBarDocsOptions === "preset" ? "selected" : "neutral"}
        text="Preset Designs"
        onClick={() => setSideBarDocsOptions("preset")}
      />
      <Button
        variant={sideBarDocsOptions === "social" ? "selected" : "neutral"}
        text="Social Media"
        onClick={() => setSideBarDocsOptions("social")}
      />
      <Button
        variant={sideBarDocsOptions === "controls" ? "selected" : "neutral"}
        text="Controls"
        onClick={() => setSideBarDocsOptions("controls")}
      />
      <Button
        variant={sideBarDocsOptions === "editor" ? "selected" : "neutral"}
        text="UI Editor"
        onClick={() => setSideBarDocsOptions("editor")}
      />
      <Button
        variant={sideBarDocsOptions === "uiCode" ? "selected" : "neutral"}
        text="UI Code"
        onClick={() => setSideBarDocsOptions("uiCode")}
      />
    </div>
  );
};
