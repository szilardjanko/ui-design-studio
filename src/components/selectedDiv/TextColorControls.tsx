import { Div } from "@/pages/CreateUi";
import React, { useState } from "react";
import { PresetColors } from "./PresetColors";

type TextColorControlsProps = {
  div: Div;
  onTextChange: (newText: string) => void;
  onBackgroundColorChange: (newBackgroundColor: string) => void;
  onTextColorChange: (newTextColor: string) => void;
};

export const TextColorControls = ({
  div,
  onTextChange,
  onBackgroundColorChange,
  onTextColorChange,
}: TextColorControlsProps) => {
  const [hidden, setHidden] = useState(true);

  return (
    <div
      className={`flex w-full flex-col items-center bg-gradient-to-t from-slate-900 to-slate-800 text-center`}
    >
      <div
        className="mb-1 w-full cursor-pointer border-b border-slate-500 py-2 text-white"
        onClick={() => setHidden(!hidden)}
      >
        Background
      </div>
      <div
        className={`w-full overflow-hidden transition-all duration-700 ${hidden ? "max-h-0" : "max-h-96"
          }`}
      >
        <div className="flex flex-col pb-4">
          {div.uiElementType != "container" && (
            <>
              <label
                htmlFor="text-input"
                className="w-full text-center text-white"
              >
                Text
              </label>
              <input
                id="text-input"
                name="text-input"
                className="mx-auto mb-2 w-fit rounded-xl border border-slate-500 bg-slate-700 text-center text-white hover:border-slate-400"
                type="text"
                value={div.text}
                onChange={(e) => onTextChange(e.target.value)}
              />
              <label
                htmlFor="text-color"
                className="w-full text-center text-white"
              >
                Text Color
              </label>
              <input
                id="text-color"
                name="text-color"
                className="mx-auto w-3/4 cursor-pointer bg-slate-900 bg-opacity-0 px-4"
                type="color"
                value={div.textColor}
                onChange={(e) => onTextColorChange(e.target.value)}
              />
            </>
          )}
          <label htmlFor="bg-color" className="w-full text-center text-white">
            Background Color
          </label>
          <input
            id="bg-color"
            name="bg-color"
            className="mx-auto w-3/4 cursor-pointer bg-slate-900 bg-opacity-0 px-4"
            type="color"
            value={div.backgroundColor}
            onChange={(e) => onBackgroundColorChange(e.target.value)}
          />
          <div className="mt-2">Preset Colors</div>
          <div className="flex w-full justify-center">
            <PresetColors
              onBackgroundColorChange={onBackgroundColorChange}
              onTextColorChange={onTextColorChange}
              hasTextColor={div.uiElementType != "container"}
            />
          </div>
          <div className="mt-2">Background Image</div>
          <div>{"(coming soon)"}</div>
        </div>
      </div>
    </div>
  );
};
