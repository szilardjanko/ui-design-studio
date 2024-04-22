import React, { useState } from "react";
import {
  AddIcon,
  AddIconFill,
  SubtractIcon,
  SubtractIconFill,
} from "../icons/AddSub";

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
    <div className="flex flex-row items-center justify-center select-none">
      <button className="px-2 py-1" onClick={handleSetShowGrid}>
        Grid: {gridSize}
      </button>
      <div className="flex bg-slate-700 rounded-xl px-0.5 py-1 border border-slate-400">
        <button
          className="mx-1 cursor-pointer"
          onClick={handleIncreaseGridSize}
          onMouseEnter={() => setIsGridAdd(false)}
          onMouseLeave={() => setIsGridAdd(true)}
        >
          {isGridAdd && <AddIconFill />}
          {!isGridAdd && <AddIcon />}
        </button>
        <button
          className="mx-1 cursor-pointer"
          onClick={handleDecreaseGridSize}
          onMouseEnter={() => setIsGridSubtract(false)}
          onMouseLeave={() => setIsGridSubtract(true)}
        >
          {isGridSubtract && <SubtractIconFill />}
          {!isGridSubtract && <SubtractIcon />}
        </button>
      </div>
    </div>
  );
};
