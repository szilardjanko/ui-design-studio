import { Div } from "@/pages/create";
import React from "react";
import { ActionTypeCount, Operations } from "../ClickActions";
import { AddIcon, SubtractIcon } from "@/components/icons/AddSub";

type CountOptionsProps = {
  div: Div;
  divs: Div[];
  showCount: {
    targetDivUuid: string;
    type: Operations;
  };
  setShowCount: React.Dispatch<
    React.SetStateAction<{
      targetDivUuid: string;
      type: Operations;
    }>
  >;
  onActionTypeCountChange: (newActionType: ActionTypeCount) => void;
  findDivNameByUuid: (uuid: string, divs: Div[]) => string;
  getLabelOptions: (divs: Div[]) => JSX.Element[];
};

export const CountOptions = ({
  div,
  divs,
  showCount,
  setShowCount,
  onActionTypeCountChange,
  findDivNameByUuid,
  getLabelOptions,
}: CountOptionsProps) => {
  return (
    <>
      <div className="my-2 flex w-full flex-col items-center">
        <label htmlFor="labelOptions" className="text-white">
          Select Label:
        </label>
        <select
          id="labelOptions"
          value={showCount.targetDivUuid}
          onChange={(e) => {
            setShowCount({
              targetDivUuid: e.target.value,
              type: "add",
            });
            onActionTypeCountChange({
              setterDivUuid: div.uuid,
              setterDivName: div.name,
              targetDivUuid: e.target.value,
              targetDivName: findDivNameByUuid(e.target.value, divs),
              count: 0,
              type: "add",
            });
          }}
          className="mx-2 w-32 cursor-pointer rounded-xl border border-slate-800 bg-slate-800 px-2 py-1 text-sm hover:border-slate-500"
        >
          <option value="" disabled></option>
          {getLabelOptions(divs)}
        </select>
      </div>
      <div className="my-2 flex w-full flex-col items-center">
        <div>Select Operator:</div>
        <div className="my-1 flex">
          <div
            className={`mx-1.5  flex cursor-pointer items-center rounded-xl border px-2 py-0.5 hover:border-slate-500 ${div.actionTypeCount?.type === "add" ? "border-slate-300" : "border-slate-900"}`}
            onClick={() => {
              setShowCount({
                ...showCount,
                type: "add",
              });
              onActionTypeCountChange({
                setterDivUuid: div.uuid,
                setterDivName: div.name,
                targetDivUuid: showCount.targetDivUuid,
                targetDivName: findDivNameByUuid(showCount.targetDivUuid, divs),
                count: div.actionTypeCount?.count || 0,
                type: "add",
              });
            }}
          >
            Add
            <div className="ml-1.5">
              <AddIcon />
            </div>
          </div>
          <div
            className={`mx-1.5  flex cursor-pointer items-center rounded-xl border px-2 py-0.5 hover:border-slate-500 ${div.actionTypeCount?.type === "subtract" ? "border-slate-300" : "border-slate-900"}`}
            onClick={() => {
              setShowCount({
                ...showCount,
                type: "subtract",
              });
              onActionTypeCountChange({
                setterDivUuid: div.uuid,
                setterDivName: div.name,
                targetDivUuid: showCount.targetDivUuid,
                targetDivName: findDivNameByUuid(showCount.targetDivUuid, divs),
                count: div.actionTypeCount?.count || 0,
                type: "subtract",
              });
            }}
          >
            Subtract
            <div className="ml-1.5">
              <SubtractIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
