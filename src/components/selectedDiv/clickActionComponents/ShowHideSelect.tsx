import { Div } from "@/pages/create";
import React from "react";
import { ActionTypeShow } from "../ClickActions";

type ShowHideSelectProps = {
  div: Div;
  divs: Div[];
  showHideDiv: {
    targetDivUuid: string;
    show: boolean;
  };
  setShowHideDiv: React.Dispatch<
    React.SetStateAction<{
      targetDivUuid: string;
      show: boolean;
    }>
  >;
  onActionTypeShowChange: (newActionType: ActionTypeShow) => void;
  findDivNameByUuid: (uuid: string, divs: Div[]) => string;
};

export const ShowHideSelect = ({
  div,
  divs,
  showHideDiv,
  setShowHideDiv,
  onActionTypeShowChange,
  findDivNameByUuid,
}: ShowHideSelectProps) => {
  return (
    <div className="my-2 flex w-full flex-col items-center">
      <label htmlFor="containerOptions" className="text-white">
        Select Container:
      </label>
      <select
        id="containerOptions"
        value={showHideDiv.targetDivUuid}
        onChange={(e) => {
          setShowHideDiv({
            targetDivUuid: e.target.value,
            show: true,
          });
          onActionTypeShowChange({
            setterDivUuid: div.uuid,
            setterDivName: div.name,
            targetDivUuid: e.target.value,
            targetDivName: findDivNameByUuid(e.target.value, divs),
            show: true,
          });
        }}
        className="mx-2 w-32 cursor-pointer rounded-xl border border-slate-800 bg-slate-800 px-2 py-1 text-sm hover:border-slate-500"
      >
        <option value="" disabled></option>
        {divs.map(
          (div) =>
            div.uiElementType === "container" && (
              <option key={div.uuid} value={div.uuid}>
                {div.name}
              </option>
            ),
        )}
        {/* {divs
    .filter((filteredDiv) => filteredDiv.uuid != div.uuid)
    .map((div) =>
      div.uiElementType === "container" ? (
        div.containedElements.map((containedElement) => (
          <option
            key={containedElement.uuid}
            value={containedElement.uuid}
          >
            {containedElement.name}
          </option>
        ))
      ) : (
        <option key={div.uuid} value={div.uuid}>
          {div.name}
        </option>
      ),
    )} */}
      </select>
    </div>
  );
};
