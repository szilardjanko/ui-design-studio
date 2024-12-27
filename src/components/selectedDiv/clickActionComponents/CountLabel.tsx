import { Div } from "@/pages/create";
import React from "react";
import { ActionTypeCount, ActionTypes, Operations } from "../ClickActions";
import { AddIcon, SubtractIcon } from "@/components/icons/AddSub";
import Button from "@/components/Button";

type CountLabelProps = {
  div: Div;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  onActionTypeCountChange: (
    newActionType: ActionTypeCount,
    remove?: boolean,
  ) => void;
  setActionType: React.Dispatch<React.SetStateAction<ActionTypes>>;
  setShowCount: React.Dispatch<
    React.SetStateAction<{
      targetDivUuid: string;
      type: Operations;
    }>
  >;
};

export const CountLabel = ({
  div,
  count,
  setCount,
  onActionTypeCountChange,
  setActionType,
  setShowCount,
}: CountLabelProps) => {
  return (
    <div className="my-2 flex flex-col items-center justify-center">
      <div className="flex w-40 flex-row items-center">
        <div className="mx-1">Set Count:</div>
        <div
          className="mx-1 cursor-pointer"
          onClick={() => {
            setCount(count - 1);
            onActionTypeCountChange({
              setterDivUuid: div.actionTypeCount?.setterDivUuid || "",
              setterDivName: div.actionTypeCount?.setterDivName || "",
              targetDivUuid: div.actionTypeCount?.targetDivUuid || "",
              targetDivName: div.actionTypeCount?.targetDivName || "",
              count: count - 1,
              type: div.actionTypeCount?.type || "add",
            });
          }}
        >
          <SubtractIcon />
        </div>
        <div className="mx-1">{div.actionTypeCount?.count}</div>
        <div
          className="mx-1 cursor-pointer"
          onClick={() => {
            setCount(count + 1);
            onActionTypeCountChange({
              setterDivUuid: div.actionTypeCount?.setterDivUuid || "",
              setterDivName: div.actionTypeCount?.setterDivName || "",
              targetDivUuid: div.actionTypeCount?.targetDivUuid || "",
              targetDivName: div.actionTypeCount?.targetDivName || "",
              count: count + 1,
              type: div.actionTypeCount?.type || "add",
            });
          }}
        >
          <AddIcon />
        </div>
      </div>
      <Button
        text="Remove"
        variant="remove"
        padding="small"
        className="mt-4 rounded-xl text-sm"
        onClick={() => {
          onActionTypeCountChange(
            {
              setterDivUuid: div.actionTypeCount?.setterDivUuid || "",
              setterDivName: div.actionTypeCount?.setterDivName || "",
              targetDivUuid: div.actionTypeCount?.targetDivUuid || "",
              targetDivName: div.actionTypeCount?.targetDivName || "",
              count: 0,
              type: "add",
            },
            true,
          );
          setActionType("None");
          setShowCount({
            targetDivUuid: "",
            type: "add",
          });
        }}
      />
    </div>
  );
};
