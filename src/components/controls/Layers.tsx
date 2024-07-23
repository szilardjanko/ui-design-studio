import { Div } from "@/pages/CreateUi";
import React, { useEffect, useState } from "react";
import { Lock, LockFill, Unlock, UnlockFill } from "../icons/Lock";
import {
  ButtonIcon,
  ContainerIcon,
  InputIcon,
  LabelIcon,
} from "../icons/UiElementIcons";

type LayersProps = {
  divs: Div[];
  onSelect: (div: Div, e: React.MouseEvent) => void;
  selected: Div | null;
  handleSetLock: (lock: boolean) => void;
};

export const Layers = ({
  divs,
  onSelect,
  selected,
  handleSetLock,
}: LayersProps) => {
  const [isDivLockHover, setIsDivLockHover] = useState<boolean[]>([]);
  const [isContainerLockHover, setIsContainerLockHover] = useState<boolean[]>(
    [],
  );

  useEffect(() => {
    setIsDivLockHover(new Array(divs.length).fill(false));
    setIsContainerLockHover(new Array(divs.length).fill(false));
  }, [divs]);

  const handleMouseEnter = (index: number, isContainer: boolean) => {
    if (isContainer) {
      setIsContainerLockHover((prev) =>
        prev.map((lock, i) => (i === index ? true : lock)),
      );
    } else {
      setIsDivLockHover((prev) =>
        prev.map((lock, i) => (i === index ? true : lock)),
      );
    }
  };

  const handleMouseLeave = (index: number, isContainer: boolean) => {
    if (isContainer) {
      setIsContainerLockHover((prev) =>
        prev.map((lock, i) => (i === index ? false : lock)),
      );
    } else {
      setIsDivLockHover((prev) =>
        prev.map((lock, i) => (i === index ? false : lock)),
      );
    }
  };

  return (
    <div className="items-left flex max-h-64 flex-col overflow-y-auto p-2">
      {divs.length > 0 && (
        <div className="mb-2">
          <div className="my-1">Containers</div>
          {divs
            .filter((div) => div.uiElementType === "container")
            .map((div, index) => (
              <div
                key={index}
                onClick={(e) => onSelect(div, e)}
                className={`flex cursor-pointer items-center justify-between border border-black hover:border-slate-500 ${selected && selected.uuid === div.uuid && "border border-slate-500"}`}
              >
                <div className="m-1 flex max-w-28 flex-col items-start overflow-clip whitespace-nowrap text-xs text-white">
                  <div className="flex items-center">
                    <div className="mr-2">
                      <ContainerIcon />
                    </div>
                    {div.name}
                  </div>
                  <div>
                    {div.containedElements.map((div, index) => (
                      <div
                        key={index}
                        className="my-1 ml-3 flex text-xs text-white"
                      >
                        <div className="mr-2">
                          {div.uiElementType === "label" ? (
                            <LabelIcon />
                          ) : div.uiElementType === "button" ? (
                            <ButtonIcon />
                          ) : div.uiElementType === "input" ? (
                            <InputIcon />
                          ) : div.uiElementType === "container" ? (
                            <ContainerIcon />
                          ) : null}
                        </div>
                        {div.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  onMouseDown={(e) => onSelect(div, e)}
                  onMouseUp={() => handleSetLock(!div.lock)}
                  onMouseEnter={() => handleMouseEnter(index, true)}
                  onMouseLeave={() => handleMouseLeave(index, true)}
                >
                  {div.lock ? (
                    isContainerLockHover[index] ? (
                      <LockFill />
                    ) : (
                      <Lock />
                    )
                  ) : isContainerLockHover[index] ? (
                    <UnlockFill />
                  ) : (
                    <Unlock />
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
      {divs.length > 0 && (
        <div className="my-2">
          <div className="my-1">Elements</div>
          {divs
            .filter((div) => div.uiElementType !== "container")
            .map((div, index) => (
              <div
                key={index}
                onClick={(e) => onSelect(div, e)}
                className={`flex cursor-pointer items-center justify-between border border-black hover:border-slate-500 ${selected && selected.uuid === div.uuid && "border border-slate-500"}`}
              >
                <div className="m-1 flex max-w-24 items-center overflow-clip whitespace-nowrap text-xs text-white">
                  <div className="mr-2">
                    {div.uiElementType === "label" ? (
                      <LabelIcon />
                    ) : div.uiElementType === "button" ? (
                      <ButtonIcon />
                    ) : div.uiElementType === "input" ? (
                      <InputIcon />
                    ) : div.uiElementType === "container" ? (
                      <ContainerIcon />
                    ) : null}
                  </div>
                  {div.name}
                </div>
                <div
                  onMouseDown={(e) => onSelect(div, e)}
                  onMouseUp={() => handleSetLock(!div.lock)}
                  onMouseEnter={() => handleMouseEnter(index, false)}
                  onMouseLeave={() => handleMouseLeave(index, false)}
                >
                  {div.lock ? (
                    isDivLockHover[index] ? (
                      <LockFill />
                    ) : (
                      <Lock />
                    )
                  ) : isDivLockHover[index] ? (
                    <UnlockFill />
                  ) : (
                    <Unlock />
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
