import { Div } from "@/pages/create";
import React from "react";
import { ActionTypeShow } from "../ClickActions";
import { Eye, EyeFill } from "@/components/icons/Eye";

type ShowHideToggleProps = {
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

export const ShowHideToggle = ({
  div,
  divs,
  showHideDiv,
  setShowHideDiv,
  onActionTypeShowChange,
  findDivNameByUuid,
}: ShowHideToggleProps) => {
  return (
    <div className="my-2 flex w-40 flex-row items-center justify-center">
      <div className="mx-1">Default:</div>
      {showHideDiv.show ? (
        <div className="mx-1">Show</div>
      ) : (
        <div className="mx-1">Hide</div>
      )}
      <div
        className="mx-1 cursor-pointer"
        onClick={() => {
          setShowHideDiv({
            ...showHideDiv,
            show: !showHideDiv.show,
          });
          onActionTypeShowChange({
            setterDivUuid: div.uuid,
            setterDivName: div.name,
            targetDivUuid: showHideDiv.targetDivUuid,
            targetDivName: findDivNameByUuid(showHideDiv.targetDivUuid, divs),
            show: !showHideDiv.show,
          });
        }}
      >
        {showHideDiv.show ? <EyeFill /> : <Eye />}
      </div>
    </div>
  );
};
