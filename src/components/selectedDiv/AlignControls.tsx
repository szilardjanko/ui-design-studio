import React, { useState } from "react";
import {
  AlignBottom,
  AlignCenter,
  AlignEnd,
  AlignMiddle,
  AlignStart,
  AlignTop,
} from "../icons/Align";
import { Div } from "@/pages/CreateUi";
import { Position } from "../UiElement";
import { SelectedContainerLayout } from "./SelectedContainerLayout";

type AlignControlsProps = {
  div: Div;
  onPositionChange: (newPosition: Position) => void;
  screenWidth: number;
  screenHeight: number;
};

export const AlignControls = ({
  div,
  onPositionChange,
  screenWidth,
  screenHeight,
}: AlignControlsProps) => {
  const [hidden, setHidden] = useState(true);

  const createAlignButton = (
    Icon: React.FC,
    label: string,
    newPosition: Position,
  ) => (
    <div
      className="m-2 flex cursor-pointer items-center rounded-xl border border-slate-500 border-opacity-0 px-2 py-0.5 text-white hover:border-opacity-100"
      onClick={() => onPositionChange(newPosition)}
    >
      <Icon />
      <div className="ml-2">{label}</div>
    </div>
  );

  return (
    <SelectedContainerLayout
      title="Align"
      hidden={hidden}
      setHidden={setHidden}
    >
      <div className="flex flex-row">
        <div className="mx-2 pl-2">
          {createAlignButton(AlignTop, "Top", { x: div.position.x, y: 0 })}
          {createAlignButton(AlignMiddle, "Middle", {
            x: div.position.x,
            y: 50 - ((div.size.height / screenHeight) * 100) / 2,
          })}
          {createAlignButton(AlignBottom, "Bottom", {
            x: div.position.x,
            y: 100 - (div.size.height / screenHeight) * 100,
          })}
        </div>
        <div className="mx-2 pr-2">
          {createAlignButton(AlignStart, "Left", { x: 0, y: div.position.y })}
          {createAlignButton(AlignCenter, "Center", {
            x: 50 - ((div.size.width / screenWidth) * 100) / 2,
            y: div.position.y,
          })}
          {createAlignButton(AlignEnd, "Right", {
            x: 100 - (div.size.width / screenWidth) * 100,
            y: div.position.y,
          })}
        </div>
      </div>
    </SelectedContainerLayout>
  );
};
