import { Div } from "@/pages/CreateUi";
import React from "react";

type TextColorControlsProps = {
  div: Div;
  onTextChange: (newText: string) => void;
  onBackgroundColorChange: (newBackgroundColor: string) => void;
};

export const TextColorControls = ({
  div,
  onTextChange,
  onBackgroundColorChange,
}: TextColorControlsProps) => {
  return (
    <div className="mx-4 flex h-full flex-col items-start border-x border-slate-500 bg-gradient-to-t from-slate-900 to-slate-800 pt-2">
      <label htmlFor="text-input" className="w-full text-center">
        Text
      </label>
      <input
        id="text-input"
        name="text-input"
        className="mx-4 mb-2 rounded-xl border border-slate-500 bg-slate-700 text-center text-white hover:border-slate-400"
        type="text"
        value={div.text}
        onChange={(e) => onTextChange(e.target.value)}
      />
      <label htmlFor="bg-color" className="w-full text-center">
        Background Color
      </label>
      <input
        id="bg-color"
        name="bg-color"
        className="mx-auto w-full cursor-pointer bg-slate-900 bg-opacity-0 px-4"
        type="color"
        value={div.backgroundColor}
        onChange={(e) => onBackgroundColorChange(e.target.value)}
      />
    </div>
  );
};
