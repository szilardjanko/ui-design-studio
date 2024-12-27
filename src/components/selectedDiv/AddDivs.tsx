import { Div } from "@/pages/create";
import React, { useState } from "react";
import { AddIcon, SubtractIcon } from "../icons/AddSub";

type AddDivsProps = {
  containerDiv: Div;
  setSelected: React.Dispatch<React.SetStateAction<Div | null>>;
  divs: Div[];
  setDivs: React.Dispatch<React.SetStateAction<Div[]>>;
};

export const AddDivs = ({
  containerDiv,
  setSelected,
  divs,
  setDivs,
}: AddDivsProps) => {
  const [hidden, setHidden] = useState(true);

  const findDivByUUID = (uuid: string, divs: Div[]): Div | undefined => {
    for (const div of divs) {
      if (div.uuid === uuid) return div;
      const foundInContained = findDivByUUID(uuid, div.containedElements);
      if (foundInContained) return foundInContained;
    }
    return undefined;
  };

  const addContainedElement = (
    containers: Div[],
    targetUUID: string,
    newElement: Div,
  ): Div[] => {
    return containers.map((container) => {
      if (container.uuid === targetUUID) {
        return {
          ...container,
          containedElements: [...container.containedElements, newElement],
        };
      } else {
        return {
          ...container,
          containedElements: addContainedElement(
            container.containedElements,
            targetUUID,
            newElement,
          ),
        };
      }
    });
  };

  const handleAddDiv = (div: Div) => {
    const newElement: Div = {
      ...div,
      positionType: "relative",
      containerName: containerDiv.uuid,
      position: { x: 0, y: 0 },
    };

    const newDivs = addContainedElement(divs, containerDiv.uuid, newElement);

    const filteredDivs = newDivs.filter((d) => d.uuid !== div.uuid);

    setDivs(filteredDivs);

    const updatedContainerDiv = findDivByUUID(containerDiv.uuid, newDivs);

    if (updatedContainerDiv) {
      setSelected(updatedContainerDiv);
    }
  };

  const removeContainedElement = (
    containers: Div[],
    divUUID: string,
  ): Div[] => {
    return containers.map((container) => {
      if (container.containedElements.some((el) => el.uuid === divUUID)) {
        return {
          ...container,
          containedElements: container.containedElements.filter(
            (el) => el.uuid !== divUUID,
          ),
        };
      } else {
        return {
          ...container,
          containedElements: removeContainedElement(
            container.containedElements,
            divUUID,
          ),
        };
      }
    });
  };

  const handleRemoveDiv = (div: Div) => {
    const newDivs = removeContainedElement(divs, div.uuid);

    const updatedDivs: Div[] = [
      ...newDivs,
      { ...div, positionType: "absolute", containerName: "" },
    ];

    setDivs(updatedDivs);

    const updatedContainerDiv = findDivByUUID(containerDiv.uuid, newDivs);

    if (updatedContainerDiv) {
      setSelected(updatedContainerDiv);
    }
  };

  return (
    <div className="flex w-full flex-col items-center bg-gradient-to-t from-slate-900 to-slate-800">
      <div
        className="mb-1 w-full cursor-pointer border-y border-slate-500 py-2 text-center text-white"
        onClick={() => setHidden(!hidden)}
      >
        Add Elements
      </div>
      <div
        className={`w-full overflow-hidden transition-all duration-700 ${
          hidden ? "max-h-0" : "max-h-96"
        }`}
      >
        <div className="flex w-full flex-row justify-center pb-1">
          <div className="w-1/2 border-r border-slate-500">
            <div className="mb-1 w-full border-b border-slate-500 pb-1 text-center">
              Available
            </div>
            <div className="flex max-h-40 flex-col items-center overflow-y-auto">
              {divs
                .filter((div) => div.uuid != containerDiv.uuid)
                .filter((div) => div.uuid != containerDiv.containerName)
                .map((div, index) => (
                  <div
                    key={index}
                    className="mx-2 flex w-28 cursor-pointer items-center justify-between"
                    onClick={() => handleAddDiv(div)}
                  >
                    {div.name} <AddIcon />
                  </div>
                ))}
            </div>
          </div>
          <div className="w-1/2 border-r border-slate-500">
            <div className="mb-1 w-full border-b border-slate-500 pb-1 text-center">
              Contained
            </div>
            <div className="flex max-h-40 flex-col items-center overflow-y-auto">
              {containerDiv.containedElements.map((containedDiv, index) => (
                <div
                  key={index}
                  className="mx-2 flex w-28 cursor-pointer items-center justify-between"
                  onClick={() => handleRemoveDiv(containedDiv)}
                >
                  {containedDiv.name} <SubtractIcon />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
