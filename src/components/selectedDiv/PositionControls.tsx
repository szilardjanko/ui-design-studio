import React from "react";
import { CustomNumberInput } from "./CustomNumberInput";
import { Div } from "@/pages/CreateUi";
import { Position, Size } from "../UiElement";

type PositionControlsProps = {
  div: Div;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  setSize: React.Dispatch<React.SetStateAction<Size>>;
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
  setPosition,
  setSize,
  positionX,
  setPositionX,
  positionY,
  setPositionY,
  width,
  setWidth,
  height,
  setHeight,
}: PositionControlsProps) => {
  return (
    <div className="flex w-full flex-col items-center border-b border-slate-500 bg-gradient-to-t from-slate-900 to-slate-800 pb-3 pt-2 text-center">
      <div className="mb-1 w-full border-b border-slate-500 pb-2 text-white">
        Position
      </div>
      <div className="flex flex-row px-4">
        <div className="mx-1 flex flex-col">
          <label htmlFor="positionX" className="text-sm text-white">
            X
          </label>
          <CustomNumberInput
            id="positionX"
            value={positionX}
            onChange={setPositionX}
            onBlur={() =>
              setPosition({
                x: Number(positionX),
                y: div.position.y,
              })
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
              setPosition({
                x: div.position.x,
                y: Number(positionY),
              })
            }
          />
        </div>
      </div>
      <div className="mt-4 flex flex-row">
        <div className="mx-1 flex flex-col">
          <label htmlFor="width" className="text-sm text-white">
            Width
          </label>
          <CustomNumberInput
            id="width"
            value={width}
            onChange={setWidth}
            onBlur={() =>
              setSize({
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
              setSize({
                width: div.size.width,
                height: Number(height),
              })
            }
          />
        </div>
      </div>
    </div>
  );
};
