import React, { useState } from "react";
import Button from "./Button";
import { Components } from "./sideBar/Components";
import { Preset } from "./sideBar/Preset";
import { Social } from "./sideBar/Social";
import { BgImageControl } from "./controls/BgImageControl";
import { GridControls } from "./controls/GridControls";
import { ZoomControl } from "./controls/ZoomControl";
import { Layers } from "./controls/Layers";
import { useSideBar } from "@/context/SideBarContext";
import { useUiElement } from "@/context/UiElementContext";
import { ContainerIcon, PresetIcon, SocialIcon } from "./icons/UiElementIcons";
import { SafeZoneControl } from "./controls/SafeZoneControl";
import { Code, File } from "./icons/File";
import { UiCodeMenu } from "./uiCode/uiCodeMenu";
import { SaveLoad } from "./controls/SaveLoad";

type SideBarProps = {
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
  safeZone: boolean;
  setSafeZone: React.Dispatch<React.SetStateAction<boolean>>;
  showUiCode: boolean;
  setShowUiCode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SideBar = ({
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
  safeZone,
  setSafeZone,
  showUiCode,
  setShowUiCode,
}: SideBarProps) => {
  const [showFileMenu, setShowFileMenu] = useState(false);
  const { sideBarOptions, setSideBarOptions } = useSideBar();
  const { divs, selected, addDiv, handleDivClick, handleSetLock } =
    useUiElement();

  return (
    <div className="mr-1 flex max-h-[90vh] min-w-[11.5rem] select-none flex-col overflow-y-auto px-2 pb-2">
      {!showUiCode && !showFileMenu && (
        <>
          <div className="mb-2 w-full border-b border-slate-500 pb-2">
            <Button
              text="File"
              icon={<File />}
              width="full"
              textAlign="left"
              onClick={() => setShowFileMenu(!showFileMenu)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Button
              text="Components"
              icon={<ContainerIcon />}
              onClick={() => setSideBarOptions("components")}
              padding="small"
              variant={sideBarOptions === "components" ? "selected" : "neutral"}
              textAlign="left"
            />
            <Button
              text="Preset Designs"
              icon={<PresetIcon />}
              onClick={() => setSideBarOptions("preset")}
              padding="small"
              variant={sideBarOptions === "preset" ? "selected" : "neutral"}
              textAlign="left"
            />
            <Button
              text="Social Media"
              icon={<SocialIcon />}
              onClick={() => setSideBarOptions("social")}
              padding="small"
              variant={sideBarOptions === "social" ? "selected" : "neutral"}
              textAlign="left"
            />
          </div>

          {sideBarOptions === "components" && <Components addDiv={addDiv} />}
          {sideBarOptions === "preset" && <Preset />}
          {sideBarOptions === "social" && <Social addDiv={addDiv} />}
          <div className="mt-2 border-t border-slate-500 pt-2">
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
            <SafeZoneControl safeZone={safeZone} setSafeZone={setSafeZone} />
            <ZoomControl
              zoomLevel={zoomLevel}
              handleZoomChange={handleZoomChange}
              handleResetZoomLevel={handleResetZoomLevel}
            />
          </div>
          <div className="mt-2 border-t border-slate-500 pt-2">
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
            <Button
              text={"UI Code"}
              icon={<Code />}
              padding="small"
              textAlign="left"
              variant="neutral"
              width="full"
              onClick={() => setShowUiCode(true)}
            />
          </div>
        </>
      )}
      {showUiCode && <UiCodeMenu setShowUiCode={setShowUiCode} />}
      {showFileMenu && <SaveLoad setShowFileMenu={setShowFileMenu} />}
    </div>
  );
};
