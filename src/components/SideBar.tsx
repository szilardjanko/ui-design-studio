import React from "react";
import Button from "./Button";
import { Components } from "./sideBar/Components";
import { Preset } from "./sideBar/Preset";
import { Social } from "./sideBar/Social";
import { BgImageControl } from "./controls/BgImageControl";
import { GridControls } from "./controls/GridControls";
import { ZoomControl } from "./controls/ZoomControl";
import { Layers } from "./controls/Layers";
import { UiCode } from "./uiCode/uiCode";
import { Div, UiElementTypes } from "@/pages/CreateUi";
import { useSideBar } from "@/context/SideBarContext";

type SideBarProps = {
  addDiv: (uiElementType: UiElementTypes) => void;
  divs: Div[];
  selected: Div | null;
  handleDivClick: (div: Div, e: React.MouseEvent) => void;
  handleSetLock: (lock: boolean) => void;
  bgImage: string;
  setBgImage: (value: string) => void;
  handleSetBackgroundImage: (direction: number) => () => void;
  setBgImageCount: (value: number) => void;
  gridSize: number;
  handleDecreaseGridSize: () => void;
  handleIncreaseGridSize: () => void;
  handleSetShowGrid: () => void;
  zoomLevel: number;
  handleZoomChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetZoomLevel: () => void;
};

export const SideBar = ({
  addDiv,
  divs,
  selected,
  handleDivClick,
  handleSetLock,
  bgImage,
  setBgImage,
  handleSetBackgroundImage,
  setBgImageCount,
  gridSize,
  handleDecreaseGridSize,
  handleIncreaseGridSize,
  handleSetShowGrid,
  zoomLevel,
  handleZoomChange,
  handleResetZoomLevel,
}: SideBarProps) => {
  const { sideBarOptions, handleSideBarSelection } = useSideBar();

  return (
    <div className="flex select-none flex-col px-2">
      <Button
        text="Components"
        onClick={() => handleSideBarSelection("components")}
        padding="small"
        variant={sideBarOptions === "components" ? "selected" : "neutral"}
        textAlign="left"
      />
      <Button
        text="Preset Designs"
        onClick={() => handleSideBarSelection("preset")}
        padding="small"
        variant={sideBarOptions === "preset" ? "selected" : "neutral"}
        textAlign="left"
      />
      <Button
        text="Social Media"
        onClick={() => handleSideBarSelection("social")}
        padding="small"
        variant={sideBarOptions === "social" ? "selected" : "neutral"}
        textAlign="left"
      />

      {sideBarOptions === "components" && <Components addDiv={addDiv} />}
      {sideBarOptions === "preset" && <Preset />}
      {sideBarOptions === "social" && <Social addDiv={addDiv} />}
      <div className="mt-2 border-t pt-2">
        <BgImageControl
          bgImage={bgImage}
          setBgImage={setBgImage}
          handleSetBackgroundImage={handleSetBackgroundImage}
          setBgImageCount={setBgImageCount}
        />
        <GridControls
          gridSize={gridSize}
          handleDecreaseGridSize={handleDecreaseGridSize}
          handleIncreaseGridSize={handleIncreaseGridSize}
          handleSetShowGrid={handleSetShowGrid}
        />
        <ZoomControl
          zoomLevel={zoomLevel}
          handleZoomChange={handleZoomChange}
          handleResetZoomLevel={handleResetZoomLevel}
        />
      </div>
      <div className="mt-2 border-t pt-2">
        <Layers
          divs={divs}
          onSelect={handleDivClick}
          selected={selected}
          handleSetLock={(lock: boolean) => {
            handleSetLock(lock);
          }}
        />
      </div>

      <div className="mt-2 border-t pt-2">
        <UiCode divs={divs} />
      </div>
    </div>
  );
};
