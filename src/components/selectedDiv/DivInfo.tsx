import { Div } from "@/pages/CreateUi";
import React from "react";

type DivInfoProps = {
  div: Div;
  handleSetLock: (lock: boolean) => void;
};

export const DivInfo = ({ div, handleSetLock }: DivInfoProps) => {
  return (
    <div className="mx-4 flex h-full w-56 flex-col items-center justify-center border-x border-slate-500 bg-gradient-to-t from-slate-900 to-slate-800 pt-2">
      <div className="mb-2 px-4 text-left text-sm text-white">
        <div>Type: {div.uiElementType}</div>
        <div>Text: {div.text}</div>
        <div>Background Color: {div.backgroundColor}</div>
        <div>
          Position: x: {div.position.x.toFixed(2)}% y:{" "}
          {div.position.y.toFixed(2)}%
        </div>
        <div>
          Size: w: {div.size.width.toFixed(2)} h: {div.size.height.toFixed(2)}
        </div>
        <div
          className="cursor-pointer"
          onClick={() => handleSetLock(!div.lock)}
        >
          Locked: {div.lock ? "True" : "False"}
        </div>
        {div.uiElementType === "button" && (
          <div
            className="cursor-pointer"
            onClick={() => console.log("settup button functions")}
          >
            Set Button Function
          </div>
        )}
      </div>
    </div>
  );
};
