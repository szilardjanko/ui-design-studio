import React from "react";
import {
  ActionTypeCount,
  ActionTypeShow,
  ActionTypes,
  Operations,
  actionOptions,
} from "../ClickActions";
import { Div } from "@/pages/CreateUi";

type ActionTypeSelectProps = {
  div: Div;
  actionType: ActionTypes;
  setActionType: React.Dispatch<React.SetStateAction<ActionTypes>>;
  onActionTypeChange: (newActionType: ActionTypes) => void;
  setShowHideDiv: React.Dispatch<
    React.SetStateAction<{ targetDivUuid: string; show: boolean }>
  >;
  onActionTypeShowChange: (newActionType: ActionTypeShow) => void;
  setLink: React.Dispatch<React.SetStateAction<string>>;
  onMouseDownChange: (newMouseDown: string) => void;
  setShowCount: React.Dispatch<
    React.SetStateAction<{
      targetDivUuid: string;
      type: Operations;
    }>
  >;
  onActionTypeCountChange: (newActionType: ActionTypeCount) => void;
};

export const ActionTypeSelect = ({
  div,
  actionType,
  setActionType,
  onActionTypeChange,
  setShowHideDiv,
  onActionTypeShowChange,
  setLink,
  onMouseDownChange,
  setShowCount,
  onActionTypeCountChange,
}: ActionTypeSelectProps) => {
  return (
    <div className="flex items-center">
      <label htmlFor="actionOptions" className="text-white">
        Action:
      </label>
      {div.uiElementType === "social" ? (
        <div className="ml-2">Open Link</div>
      ) : (
        <select
          id="actionOptions"
          className="mx-2 w-32 cursor-pointer rounded-xl border border-slate-800 bg-slate-800 px-2 py-1 text-sm hover:border-slate-500"
          value={actionType}
          onChange={(e) => {
            setActionType(e.target.value as ActionTypes);
            onActionTypeChange(e.target.value as ActionTypes);
            if (e.target.value != "Show/Hide") {
              setShowHideDiv({ targetDivUuid: "", show: false });
              onActionTypeShowChange({
                setterDivUuid: "",
                setterDivName: "",
                targetDivUuid: "",
                targetDivName: "",
                show: true,
              });
            }
            if (e.target.value != "Open Link") {
              setLink("");
              onMouseDownChange("");
            }
            if (e.target.value != "Count") {
              setShowCount({
                targetDivUuid: "",
                type: "add",
              });
              onActionTypeCountChange({
                setterDivUuid: "",
                setterDivName: "",
                targetDivUuid: "",
                targetDivName: "",
                count: 0,
                type: "add",
              });
            }
          }}
        >
          {actionOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
