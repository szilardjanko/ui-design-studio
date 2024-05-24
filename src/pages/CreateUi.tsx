import React, { useRef, useState, useEffect } from "react";
import { useSideBar } from "@/context/SideBarContext";
import UiElement, { Position } from "@/components/UiElement";
import Preset from "@/components/sideBar/Preset";
import Social from "@/components/sideBar/Social";
import Components from "@/components/sideBar/Components";
import { ZoomControl } from "@/components/controls/ZoomControl";
import { GridControls } from "@/components/controls/GridControls";
import Button from "@/components/Button";
import { SelectedDivEditor } from "@/components/SelectedDivEditor";
import { UiCode } from "@/components/uiCode/uiCode";

export type Div = {
  uiElementType: "label" | "button" | "input";
  position: Position;
  text: string;
  size: { width: number; height: number };
  backgroundColor: string;
  lock: boolean;
};

const CreateUi = () => {
  const { sideBarOptions, handleSideBarSelection } = useSideBar();
  const targetRef = useRef<HTMLDivElement>(null);
  const [divs, setDivs] = useState<Array<Div>>([]);
  const [gridSize, setGridSize] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const gridCols = 16 * gridSize;
  const gridRows = 9 * gridSize;
  const [cellWidth, setCellWidth] = useState(0);
  const [cellHeight, setCellHeight] = useState(0);
  const [selectedDivIndex, setSelectedDivIndex] = useState<number | null>(null);

  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZoomLevel(parseFloat(event.target.value));
  };

  useEffect(() => {
    const adjustedCellWidth = 1248 / gridCols / zoomLevel;
    const adjustedCellHeight = 702 / gridRows / zoomLevel;
    setCellWidth(adjustedCellWidth);
    setCellHeight(adjustedCellHeight);
  }, [zoomLevel, gridCols, gridRows]);

  const handleSetShowGrid = () => {
    if (showGrid) {
      setGridSize(5);
    } else {
      setGridSize(1);
    }
    setShowGrid((prev) => !prev);
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

  const addDiv = (uiElementType: "label" | "button" | "input") => {
    const initialWidthPct =
      Math.round(150 / (cellWidth * zoomLevel)) * (cellWidth * zoomLevel);
    const initialHeightPct =
      Math.round(100 / (cellHeight * zoomLevel)) * (cellHeight * zoomLevel);
    const initialPosition = { x: 0, y: 0 };

    setDivs([
      ...divs,
      {
        uiElementType: uiElementType,
        position: initialPosition,
        text: `New UI ${uiElementType} ${divs.length + 1}`,
        size: { width: initialWidthPct, height: initialHeightPct },
        backgroundColor: "#F1F1F1",
        lock: false,
      },
    ]);
  };

  const updatePosition = (
    index: number,
    newPosition: Position | ((prevPosition: Position) => Position),
  ) => {
    setDivs(
      divs.map((div, i) =>
        i === index
          ? {
              ...div,
              position:
                typeof newPosition === "function"
                  ? newPosition(div.position)
                  : newPosition,
            }
          : div,
      ),
    );
  };

  const updateSize = (
    index: number,
    newSize:
      | { width: number; height: number }
      | ((prevSize: { width: number; height: number }) => {
          width: number;
          height: number;
        }),
  ) => {
    setDivs(
      divs.map((div, i) =>
        i === index
          ? {
              ...div,
              size: typeof newSize === "function" ? newSize(div.size) : newSize,
            }
          : div,
      ),
    );
  };

  const updateText = (
    index: number,
    newText: string | ((prevText: string) => string),
  ) => {
    setDivs(
      divs.map((div, i) =>
        i === index
          ? {
              ...div,
              text: typeof newText === "function" ? newText(div.text) : newText,
            }
          : div,
      ),
    );
  };

  const handleDivClick = (index: number) => {
    setSelectedDivIndex(index);
  };

  const handleSetLock = (selectedDivIndex: number, lock: boolean) => {
    const updatedDivs = [...divs];
    updatedDivs[selectedDivIndex].lock = lock;
    setDivs(updatedDivs);
  };

  const handleDelete = () => {
    if (selectedDivIndex === null) return;
    const updatedDivs = divs.filter((_, index) => index !== selectedDivIndex);
    setDivs(updatedDivs);
    setSelectedDivIndex(null);
  };

  const handleIncreaseGridSize = () => {
    setGridSize((prevSize) => Math.min(5, prevSize + 1));
  };

  const handleDecreaseGridSize = () => {
    setGridSize((prevSize) => Math.max(1, prevSize - 1));
  };

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex flex-row items-start justify-start ">
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
          {sideBarOptions === "social" && <Social />}
          <div className="mt-2 border-t pt-2">
            <GridControls
              gridSize={gridSize}
              handleDecreaseGridSize={handleDecreaseGridSize}
              handleIncreaseGridSize={handleIncreaseGridSize}
              handleSetShowGrid={handleSetShowGrid}
            />
            <ZoomControl
              zoomLevel={zoomLevel}
              handleZoomChange={handleZoomChange}
              setZoomLevel={setZoomLevel}
            />
          </div>
          {divs.length != 0 && (
            <div className="mt-2 border-t pt-2">
              <UiCode divs={divs} />
            </div>
          )}
        </div>
        <div className="overflow-auto" style={{ width: "100vw" }}>
          <div
            style={{
              width: `${1248 * zoomLevel}px`,
              height: `${702 * zoomLevel}px`,
              transformOrigin: "top left",
            }}
          >
            <div
              ref={targetRef}
              className={`relative overflow-hidden text-black`}
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "top left",
                width: `1248px`,
                height: `702px`,
                backgroundColor: "#ffffff",
              }}
            >
              {/* Grid Layer */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  ...gridBackgroundStyle,
                }}
              />
              {divs.map((div, index) => (
                <UiElement
                  key={index}
                  uiElementType={div.uiElementType}
                  position={div.position}
                  setPosition={(newPosition) =>
                    updatePosition(index, newPosition)
                  }
                  size={div.size}
                  setSize={(newSize) => updateSize(index, newSize)}
                  text={div.text}
                  setText={(newText) => updateText(index, newText)}
                  backgroundColor={div.backgroundColor}
                  startPosition={{ x: 0, y: 0 }}
                  setStartPosition={() => {}}
                  snapToGrid={snapToGrid}
                  cellHeight={cellHeight}
                  cellWidth={cellWidth}
                  zoomLevel={zoomLevel}
                  targetDimensions={{
                    width: targetRef.current?.offsetWidth
                      ? targetRef.current.offsetWidth
                      : 0,
                    height: targetRef.current?.offsetHeight
                      ? targetRef.current.offsetHeight
                      : 0,
                  }}
                  targetRef={targetRef}
                  onSelect={() => handleDivClick(index)}
                  lock={div.lock}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="flex w-full flex-row items-end justify-between overflow-y-auto text-center">
        {selectedDivIndex != null && (
          <div className="m-2 mx-auto flex w-5/6 flex-row justify-evenly">
            <SelectedDivEditor
              div={divs[selectedDivIndex]}
              onTextChange={(newText: string) =>
                updateText(selectedDivIndex, newText)
              }
              handleSetLock={(lock: boolean) => {
                handleSetLock(selectedDivIndex, lock);
              }}
              onDelete={handleDelete}
            />
          </div>
        )}

        <div className="flex flex-col items-end p-2">
          <button onClick={() => console.log(divs)}>Log Divs</button>
        </div>
      </div>
    </div>
  );
};

export default CreateUi;
