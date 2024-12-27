import React, { useEffect, useState } from "react";
import { SelectedContainerLayout } from "./SelectedContainerLayout";
import { Div } from "@/pages/create";
import { ActionTypeSelect } from "./clickActionComponents/ActionTypeSelect";
import { OpenLinkInput } from "./clickActionComponents/OpenLinkInput";
import { ShowHideSelect } from "./clickActionComponents/ShowHideSelect";
import { ShowHideToggle } from "./clickActionComponents/ShowHideToggle";
import { CountOptions } from "./clickActionComponents/CountOptions";
import { CountLabel } from "./clickActionComponents/CountLabel";

export type ActionTypes = "Open Link" | "Show/Hide" | "Count" | "None";

export type ActionTypeShow = {
  setterDivUuid: string;
  setterDivName: string;
  targetDivUuid: string;
  targetDivName: string;
  show: boolean;
};

export type Operations = "add" | "subtract";

export type ActionTypeCount = {
  setterDivUuid: string;
  setterDivName: string;
  targetDivUuid: string;
  targetDivName: string;
  count: number;
  type: Operations;
};

export const actionOptions: ActionTypes[] = ["Open Link", "Show/Hide", "Count"];

type ClickActionsProps = {
  div: Div;
  divs: Div[];
  onMouseDownChange: (newMouseDown: string) => void;
  onActionTypeChange: (newActionType: ActionTypes) => void;
  onActionTypeShowChange: (newActionType: ActionTypeShow) => void;
  onActionTypeCountChange: (
    newActionType: ActionTypeCount,
    remove?: boolean,
  ) => void;
};

export const ClickActions = ({
  div,
  divs,
  onMouseDownChange,
  onActionTypeChange,
  onActionTypeShowChange,
  onActionTypeCountChange,
}: ClickActionsProps) => {
  const [hidden, setHidden] = useState(true);
  const [actionType, setActionType] = useState<ActionTypes>("Open Link");
  const [link, setLink] = useState("https://www.decentraland.com");
  const [validationMessage, setValidationMessage] = useState("");
  const [showHideDiv, setShowHideDiv] = useState({
    targetDivUuid: "",
    show: false,
  });
  const [showCount, setShowCount] = useState<{
    targetDivUuid: string;
    type: Operations;
  }>({
    targetDivUuid: "",
    type: "add",
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    setLink(div.onMouseDown || "");
    setActionType(div.actionType || "Open Link");
    setShowHideDiv({
      targetDivUuid: div.actionTypeShow?.targetDivUuid || "",
      show: div.actionTypeShow?.show || false,
    });
    setShowCount({
      targetDivUuid: div.actionTypeCount?.targetDivUuid || "",
      type: div.actionTypeCount?.type || "add",
    });

    const targetDiv = findDivByUuid(
      div.actionTypeCount?.targetDivUuid || "",
      divs,
    );
    setCount(targetDiv?.actionTypeCount?.count || 0);
    onActionTypeCountChange({
      setterDivUuid: div.actionTypeCount?.setterDivUuid || "",
      setterDivName: div.actionTypeCount?.setterDivName || "",
      targetDivUuid: div.actionTypeCount?.targetDivUuid || "",
      targetDivName: targetDiv?.name || "",
      count: targetDiv?.actionTypeCount?.count || 0,
      type: div.actionTypeCount?.type || "add",
    });
  }, [div]);

  const handleLinkChange = (value: string) => {
    if (value === "https:/") {
      setLink("");
    } else if (!value.startsWith("https://")) {
      setLink("https://" + value);
    } else {
      setLink(value);
    }
  };

  const handleOnMouseDownChange = () => {
    const urlPattern =
      /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    if (urlPattern.test(link)) {
      setValidationMessage("");
      onMouseDownChange(link);
    } else {
      setValidationMessage("Invalid URL");
    }
  };

  const findDivByUuid = (uuid: string, divs: Div[]): Div | undefined => {
    for (const div of divs) {
      if (div.uuid === uuid) {
        return div;
      }
      if (
        div.uiElementType === "container" &&
        div.containedElements.length > 0
      ) {
        const foundName = findDivByUuid(uuid, div.containedElements);
        if (foundName) {
          return foundName;
        }
      }
    }
    return undefined;
  };

  const findDivNameByUuid = (uuid: string, divs: Div[]): string => {
    for (const div of divs) {
      if (div.uuid === uuid) {
        return div.name;
      }
      if (
        div.uiElementType === "container" &&
        div.containedElements.length > 0
      ) {
        const foundName = findDivNameByUuid(uuid, div.containedElements);
        if (foundName) {
          return foundName;
        }
      }
    }
    return "";
  };

  const getLabelOptions = (divs: Div[]) => {
    const options: JSX.Element[] = [];

    const findLabels = (divs: Div[]) => {
      divs.forEach((div) => {
        if (div.uiElementType === "label") {
          options.push(
            <option key={div.uuid} value={div.uuid}>
              {div.name}
            </option>,
          );
        } else if (div.uiElementType === "container") {
          findLabels(div.containedElements);
        }
      });
    };

    findLabels(divs);
    return options;
  };

  return (
    <SelectedContainerLayout
      title="Click Actions"
      hidden={hidden}
      setHidden={setHidden}
    >
      <div className="my-2 flex w-full flex-col items-center justify-between">
        {div.uiElementType != "label" && (
          <>
            <ActionTypeSelect
              div={div}
              actionType={actionType}
              setActionType={setActionType}
              onActionTypeChange={onActionTypeChange}
              setShowHideDiv={setShowHideDiv}
              onActionTypeShowChange={onActionTypeShowChange}
              setLink={setLink}
              onMouseDownChange={onMouseDownChange}
              setShowCount={setShowCount}
              onActionTypeCountChange={onActionTypeCountChange}
            />
            {actionType === "Open Link" && (
              <OpenLinkInput
                link={link}
                handleLinkChange={handleLinkChange}
                handleOnMouseDownChange={handleOnMouseDownChange}
                validationMessage={validationMessage}
              />
            )}
            {actionType === "Show/Hide" && div.uiElementType != "social" && (
              <ShowHideSelect
                div={div}
                divs={divs}
                showHideDiv={showHideDiv}
                setShowHideDiv={setShowHideDiv}
                onActionTypeShowChange={onActionTypeShowChange}
                findDivNameByUuid={findDivNameByUuid}
              />
            )}
            {showHideDiv.targetDivUuid != "" && (
              <ShowHideToggle
                div={div}
                divs={divs}
                showHideDiv={showHideDiv}
                setShowHideDiv={setShowHideDiv}
                onActionTypeShowChange={onActionTypeShowChange}
                findDivNameByUuid={findDivNameByUuid}
              />
            )}
            {actionType === "Count" && (
              <CountOptions
                div={div}
                divs={divs}
                showCount={showCount}
                setShowCount={setShowCount}
                onActionTypeCountChange={onActionTypeCountChange}
                getLabelOptions={getLabelOptions}
                findDivNameByUuid={findDivNameByUuid}
              />
            )}
          </>
        )}
        {div.uiElementType === "label" && (
          <CountLabel
            div={div}
            count={count}
            setCount={setCount}
            onActionTypeCountChange={onActionTypeCountChange}
            setActionType={setActionType}
            setShowCount={setShowCount}
          />
        )}
      </div>
    </SelectedContainerLayout>
  );
};
