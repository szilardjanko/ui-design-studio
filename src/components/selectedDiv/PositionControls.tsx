import React, { useState } from "react";
import { CustomNumberInput } from "./CustomNumberInput";
import { Div } from "@/pages/CreateUi";
import { Position, Size } from "../UiElement";
import { SelectedContainerLayout } from "./SelectedContainerLayout";

type PositionControlsProps = {
  div: Div;
  onPositionChange: (
    newPosition: Position,
    isContainer: boolean,
    isContainerDiv: boolean,
    containerIndex?: number,
  ) => void;
  onSizeChange: (newSize: Size) => void;
  positionX: string;
  setPositionX: React.Dispatch<React.SetStateAction<string>>;
  positionY: string;
  setPositionY: React.Dispatch<React.SetStateAction<string>>;
  width: string;
  setWidth: React.Dispatch<React.SetStateAction<string>>;
  height: string;
  setHeight: React.Dispatch<React.SetStateAction<string>>;
};

export const PositionControls = ({
  div,
  onPositionChange,
  onSizeChange,
  positionX,
  setPositionX,
  positionY,
  setPositionY,
  width,
  setWidth,
  height,
  setHeight,
}: PositionControlsProps) => {
  const [hidden, setHidden] = useState(true);

  return (
    <SelectedContainerLayout
      title="Position - Size"
      hidden={hidden}
      setHidden={setHidden}
    >
      <div className="flex flex-row px-4 text-center">
        <div className="mx-1 flex flex-col">
          <label htmlFor="positionX" className="text-sm text-white">
            X
          </label>
          <CustomNumberInput
            id="positionX"
            value={positionX}
            onChange={setPositionX}
            onBlur={() =>
              onPositionChange(
                {
                  x: Number(positionX),
                  y: div.position.y,
                },
                div.uiElementType === "container",
                div.containerName === "" ? false : true,
              )
            }
          />
        </div>
        <div className="mx-1 flex flex-col">
          <label htmlFor="positionY" className="text-sm text-white">
            Y
          </label>
          <CustomNumberInput
            id="positionY"
            value={positionY}
            onChange={setPositionY}
            onBlur={() =>
              onPositionChange(
                {
                  x: div.position.x,
                  y: Number(positionY),
                },
                div.uiElementType === "container",
                div.containerName === "" ? false : true,
              )
            }
          />
        </div>
      </div>
      <div className="flex flex-row p-4 text-center">
        <div className="mx-1 flex flex-col">
          <label htmlFor="width" className="text-sm text-white">
            Width
          </label>
          <CustomNumberInput
            id="width"
            value={width}
            onChange={setWidth}
            onBlur={() =>
              onSizeChange({
                width: Number(width),
                height: div.size.height,
              })
            }
          />
        </div>
        <div className="mx-1 flex flex-col">
          <label htmlFor="height" className="text-sm text-white">
            Height
          </label>
          <CustomNumberInput
            id="height"
            value={height}
            onChange={setHeight}
            onBlur={() =>
              onSizeChange({
                width: div.size.width,
                height: Number(height),
              })
            }
          />
        </div>
      </div>
    </SelectedContainerLayout>
  );
};
