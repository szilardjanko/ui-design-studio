import React, { useState } from "react";
import {
  AddIcon,
  AddIconFill,
  SubtractIcon,
  SubtractIconFill,
} from "../icons/AddSub";
import { Eye, EyeFill } from "../icons/Eye";

type GridControlsProps = {
  gridSize: number;
  handleSetShowGrid: () => void;
  handleIncreaseGridSize: () => void;
  handleDecreaseGridSize: () => void;
};

export const GridControls = ({
  gridSize,
  handleSetShowGrid,
  handleIncreaseGridSize,
  handleDecreaseGridSize,
}: GridControlsProps) => {
  const [isGridAdd, setIsGridAdd] = useState(true);
  const [isGridSubtract, setIsGridSubtract] = useState(true);

  return (
    <div className="flex select-none flex-row items-center justify-center">
      <div className="cursor-pointer" onClick={handleSetShowGrid}>
        {gridSize != 20 ? <EyeFill /> : <Eye />}
      </div>
      <button className="px-2 py-1 text-white" onClick={handleSetShowGrid}>
        Grid:
      </button>
      <div className="flex rounded-xl border border-slate-400 bg-slate-700 px-0.5 py-1">
        <button
          className="mx-1 cursor-pointer"
          onClick={handleDecreaseGridSize}
          onMouseEnter={() => setIsGridSubtract(false)}
          onMouseLeave={() => setIsGridSubtract(true)}
        >
          {isGridSubtract && <SubtractIconFill />}
          {!isGridSubtract && <SubtractIcon />}
        </button>
        <button
          className="mx-1 cursor-pointer"
          onClick={handleIncreaseGridSize}
          onMouseEnter={() => setIsGridAdd(false)}
          onMouseLeave={() => setIsGridAdd(true)}
        >
          {isGridAdd && <AddIconFill />}
          {!isGridAdd && <AddIcon />}
        </button>
      </div>
    </div>
  );
};
