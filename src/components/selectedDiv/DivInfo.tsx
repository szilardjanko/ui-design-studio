import { Div } from "@/pages/CreateUi";
import React, { useState } from "react";
import {
  CaretDown,
  CaretDownFill,
  CaretUp,
  CaretUpFill,
} from "../icons/UpDownCaret";

type DivInfoProps = {
  div: Div;
  handleSetLock: (lock: boolean) => void;
};

export const DivInfo = ({ div, handleSetLock }: DivInfoProps) => {
  const [hidden, setHidden] = useState(false);
  const [isCaretDownHover, setIsCaretDownHover] = useState(false);
  const [isCaretUpHover, setIsCaretUpHover] = useState(false);

  return (
    <div className="flex w-full flex-col items-start justify-center border-b border-slate-500 bg-gradient-to-t from-slate-900 to-slate-800 py-2">
      <div className="ml-4 text-left text-sm text-white">
        <div
          className={`overflow-hidden transition-all duration-700 ${
            hidden ? "max-h-0" : "max-h-96"
          }`}
        >
          <div>Type: {div.uiElementType}</div>
          {div.uiElementType != "container" &&
            div.uiElementType != "social" && <div>Text: {div.text}</div>}
          {div.backgroundImage ? (
            <div>Image: {div.backgroundImage}</div>
          ) : (
            <div>Background Color: {div.backgroundColor}</div>
          )}
          <div>Position Type: {div.positionType}</div>
          <div>
            Position: x: {div.position.x.toFixed(2)}% y:{" "}
            {div.position.y.toFixed(2)}%
          </div>
          <div>
            Size: w: {div.size.width.toFixed(2)} h: {div.size.height.toFixed(2)}
          </div>
          <div>
            Margin: t: {div.margin.top} r: {div.margin.right} b:{" "}
            {div.margin.bottom} l: {div.margin.left}
          </div>
          <div>
            Padding: t: {div.padding.top} r: {div.padding.right} b:{" "}
            {div.padding.bottom} l: {div.padding.left}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleSetLock(!div.lock)}
          >
            Locked: {div.lock ? "True" : "False"}
          </div>
          <div>Action Type: {div.actionType}</div>
          {div.actionType === "Open Link" ? (
            <div>Action: {div.onMouseDown}</div>
          ) : div.actionType === "Show/Hide" ? (
            <>
              <div>Show: {div.actionTypeShow?.show ? "True" : "False"}</div>
              <div>
                Setter: {div.actionTypeShow?.setterDivName}
                <br />
                Target: {div.actionTypeShow?.targetDivName}
              </div>
            </>
          ) : div.actionType === "Count" ? (
            <div>Count: {div.actionTypeCount?.count}</div>
          ) : null}
        </div>
      </div>
      <div
        className="flex w-full cursor-pointer justify-center"
        onClick={() => setHidden(!hidden)}
      >
        {hidden ? (
          <div
            onMouseEnter={() => setIsCaretDownHover(true)}
            onMouseLeave={() => setIsCaretDownHover(false)}
          >
            {isCaretDownHover ? <CaretDown /> : <CaretDownFill />}
          </div>
        ) : (
          <div
            onMouseEnter={() => setIsCaretUpHover(true)}
            onMouseLeave={() => setIsCaretUpHover(false)}
          >
            {isCaretUpHover ? <CaretUp /> : <CaretUpFill />}
          </div>
        )}
      </div>
    </div>
  );
};
