import { Div } from "@/pages/CreateUi";
import React, { useEffect, useState } from "react";
import { Lock, LockFill, Unlock, UnlockFill } from "../icons/Lock";

type LayersProps = {
  divs: Div[];
  onSelect: (index: number) => void;
  handleSetLock: (index: number, lock: boolean) => void;
};

export const Layers = ({ divs, onSelect, handleSetLock }: LayersProps) => {
  const [isLockHover, setIsLockHover] = useState<boolean[]>([]);

  useEffect(() => {
    setIsLockHover(new Array(divs.length).fill(false));
  }, [divs]);

  const handleMouseEnter = (index: number) => {
    setIsLockHover((prev) =>
      prev.map((lock, i) => (i === index ? true : lock)),
    );
  };

  const handleMouseLeave = (index: number) => {
    setIsLockHover((prev) =>
      prev.map((lock, i) => (i === index ? false : lock)),
    );
  };

  return (
    <div className="items-left flex max-h-40 flex-col overflow-y-auto p-2">
      {divs.map((div, index) => (
        <div
          key={index}
          onClick={() => onSelect(index)}
          className="flex cursor-pointer items-center justify-between border border-black hover:border-slate-500"
        >
          <div className="m-1 max-w-24 overflow-clip whitespace-nowrap text-xs">
            {div.text === "" ? "Unnamed" : div.text}
          </div>
          <div
            onMouseDown={() => handleSetLock(index, !div.lock)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {div.lock ? (
              isLockHover[index] ? (
                <LockFill />
              ) : (
                <Lock />
              )
            ) : isLockHover[index] ? (
              <UnlockFill />
            ) : (
              <Unlock />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
