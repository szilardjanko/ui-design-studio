import React, { useRef, useState, useEffect } from "react";
import { Position, PositionType } from "@/components/UiElement";
import { BlockIcon } from "@/components/icons/Block";
import { DeleteModal } from "@/components/selectedDiv/DeleteModal";
import { SideBar } from "@/components/SideBar";
import { SelectedEditor } from "@/components/selectedDiv/SelectedEditor";
import { Canvas } from "@/components/Canvas";
import {
  ActionTypeCount,
  ActionTypeShow,
  ActionTypes,
} from "@/components/selectedDiv/ClickActions";
import { useUiElement } from "@/context/UiElementContext";
import { useSideBar } from "@/context/SideBarContext";
import { PopupModal } from "@/components/PopupModal";

export type UiElementTypes =
  | "container"
  | "label"
  | "button"
  | "input"
  | "social";

export type PositionTypes = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type Div = {
  uuid: string;
  uiElementType: UiElementTypes;
  name: string;
  display: "flex" | "none";
  containedElements: Div[];
  containerName: string;
  positionType: PositionType;
  position: Position;
  text: string;
  size: { width: number; height: number };
  backgroundColor: string;
  textColor: string;
  lock: boolean;
  flexDirection: FlexDirectionTypes;
  justifyContent: JustifyContentTypes;
  alignContent: AlignItemsTypes;
  alignItems: AlignItemsTypes;
  flexWrap: FlexWrapTypes;
  margin: PositionTypes;
  padding: PositionTypes;
  backgroundImage?: string;
  onMouseDown?: string;
  actionType: ActionTypes;
  actionTypeShow?: ActionTypeShow;
  actionTypeCount?: ActionTypeCount;
};

export type JustifyContentTypes =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

export type AlignItemsTypes =
  // | "auto"
  | "flex-start"
  | "center"
  | "flex-end"
  // | "stretch"
  // | "baseline"
  | "space-between"
  | "space-around";

export type FlexWrapTypes = "wrap" | "nowrap" | "wrap-reverse";

export type FlexDirectionTypes = "row" | "column";

export type PresetTypes =
  | "instagram"
  | "instagram_color"
  | "instagram_negative"
  | "facebook"
  | "facebook_black"
  | "facebook_negative"
  | "twitter"
  | "twitter_negative"
  | "youtube"
  | "youtube_negative"
  | "discord"
  | "discord_negative"
  | "github"
  | "github_negative"
  | "lens"
  | "lens_black"
  | "lens_green";

const CreateUi = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [boundary, setBoundary] = useState({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });
  const [gridSize, setGridSize] = useState(3);
  const [showGrid, setShowGrid] = useState(true);
  const gridCols = 16 * gridSize;
  const gridRows = 9 * gridSize;
  const [cellWidth, setCellWidth] = useState(0);
  const [cellHeight, setCellHeight] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [bgImage, setBgImage] = useState(`url(dclBgDay.png)`);
  const [bgImageCount, setBgImageCount] = useState(0);

  const { showDeleteModal } = useUiElement();
  const { popupText } = useSideBar();

  const calculateZoomLevel = (windowWidth: number) => {
    const minWidth = 1366;
    const maxWidth = 3840;
    const minZoom = 0.71;
    const maxZoom = 2.692;

    if (windowWidth === 1920) return 1.162;
    if (windowWidth === 2560) return 1.675;
    if (windowWidth <= minWidth) return minZoom;
    if (windowWidth >= maxWidth) return maxZoom;

    const ratio = (windowWidth - minWidth) / (maxWidth - minWidth);
    return minZoom + ratio * (maxZoom - minZoom);
  };

  const handleResetZoomLevel = () => {
    const initialZoomLevel = calculateZoomLevel(window.innerWidth);
    setZoomLevel(initialZoomLevel);
  };

  useEffect(() => {
    handleResetZoomLevel();
  }, []);

  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZoomLevel(parseFloat(event.target.value));
  };

  useEffect(() => {
    const adjustedCellWidth = 1248 / gridCols / zoomLevel;
    const adjustedCellHeight = 702 / gridRows / zoomLevel;
    setCellWidth(adjustedCellWidth);
    setCellHeight(adjustedCellHeight);

    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setBoundary({
        top: rect.top,
        left: rect.left,
        bottom: rect.top + 702,
        right: rect.left + 1248,
      });
    }
  }, [zoomLevel, gridCols, gridRows]);

  const handleSetShowGrid = () => {
    setShowGrid((prev) => !prev);
    if (gridSize < 20) {
      setGridSize(20);
    } else {
      setGridSize(3);
    }
  };

  const gridBackgroundStyle = showGrid
    ? {
        backgroundImage: `
        linear-gradient(to right, #cccccc 1px, transparent 1px),
        linear-gradient(to bottom, #cccccc 1px, transparent 1px)`,
        backgroundSize: `${cellWidth * zoomLevel}px ${
          cellHeight * zoomLevel
        }px`,
        backgroundPosition: "top left",
        opacity: 0.5,
      }
    : {};

  const snapToGrid = (position: Position) => {
    if (!targetRef.current) return position;
    const gridSizeX =
      ((cellWidth * zoomLevel) / targetRef.current.offsetWidth) * 100;
    const gridSizeY =
      ((cellHeight * zoomLevel) / targetRef.current.offsetHeight) * 100;

    const snappedX = Math.round(position.x / gridSizeX) * gridSizeX;
    const snappedY = Math.round(position.y / gridSizeY) * gridSizeY;

    return { x: snappedX, y: snappedY };
  };

  const handleIncreaseGridSize = () => {
    setGridSize((prevSize) => Math.min(5, prevSize + 1));
    setShowGrid(true);
  };

  const handleDecreaseGridSize = () => {
    setGridSize((prevSize) => Math.max(1, prevSize - 1));
    setShowGrid(true);
  };

  const handleSetBackgroundImage = (direction: number) => () => {
    let newIndex = 0;
    if (bgImageCount + direction === -1) {
      newIndex = 2;
    } else {
      newIndex = (bgImageCount + direction) % 3;
    }
    setBgImageCount(newIndex);
    const images = ["dclBgDay.png", "dclBgNight.png", "dclBgSunrise.png"];
    setBgImage(`url(${images[newIndex]})`);
  };

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex flex-row items-start justify-between ">
        <SideBar
          bgImage={bgImage}
          gridSize={gridSize}
          zoomLevel={zoomLevel}
          setBgImage={setBgImage}
          handleDecreaseGridSize={handleDecreaseGridSize}
          handleIncreaseGridSize={handleIncreaseGridSize}
          handleResetZoomLevel={handleResetZoomLevel}
          handleSetBackgroundImage={handleSetBackgroundImage}
          handleSetShowGrid={handleSetShowGrid}
          handleZoomChange={handleZoomChange}
          setBgImageCount={setBgImageCount}
        />
        <Canvas
          targetRef={targetRef}
          bgImage={bgImage}
          cellHeight={cellHeight}
          cellWidth={cellWidth}
          boundary={boundary}
          gridBackgroundStyle={gridBackgroundStyle}
          zoomLevel={zoomLevel}
          snapToGrid={snapToGrid}
        />
        <SelectedEditor />
      </div>
      <div className="absolute top-10 flex h-full flex-col items-center bg-slate-900 px-10 pt-20 text-center sm:hidden">
        <BlockIcon />
        <div className="mt-4">
          The Create UI Tool is not supported on touchscreen devices or narrow
          browser windows. Please access it on a desktop or laptop browser with
          a wider screen for the best experience.
        </div>
        <div className="mt-4">Minimum Requirements</div>
        <div>Screen width: 640px</div>
      </div>
      {showDeleteModal && <DeleteModal />}
      {popupText.infoText != "" && (
        <PopupModal />
      )}
    </div>
  );
};

export default CreateUi;
