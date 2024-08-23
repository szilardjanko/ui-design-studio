import React, { useEffect, useState } from "react";
import { SelectedContainerLayout } from "./SelectedContainerLayout";
import { Div } from "@/pages/CreateUi";
import { Eye, EyeFill } from "../icons/Eye";

export type ActionTypes = "Open Link" | "Show/Hide" | "Count";

export type ActionTypeShow = {
  setterDivUuid: string;
  setterDivName: string;
  targetDivUuid: string;
  targetDivName: string;
  show: boolean;
};

export type ActionTypeCount = {
  setterDivUuid: string;
  setterDivName: string;
  targetDivUuid: string;
  targetDivName: string;
  count: number;
};

const actionOptions: ActionTypes[] = ["Open Link", "Show/Hide", "Count"];

type ClickActionsProps = {
  div: Div;
  divs: Div[];
  onMouseDownChange: (newMouseDown: string) => void;
  onActionTypeChange: (newActionType: ActionTypes) => void;
  onActionTypeShowChange: (newActionType: ActionTypeShow) => void;
};

export const ClickActions = ({
  div,
  divs,
  onMouseDownChange,
  onActionTypeChange,
  onActionTypeShowChange,
}: ClickActionsProps) => {
  const [hidden, setHidden] = useState(true);
  const [actionType, setActionType] = useState<ActionTypes>("Open Link");
  const [link, setLink] = useState("https://www.decentraland.com");
  const [validationMessage, setValidationMessage] = useState("");
  const [showHideDiv, setShowHideDiv] = useState({
    targetDivUuid: "",
    show: false,
  });

  useEffect(() => {
    setLink(div.onMouseDown || "");
    setActionType(div.actionType || "Open Link");
    setShowHideDiv({
      targetDivUuid: div.actionTypeShow?.targetDivUuid || "",
      show: div.actionTypeShow?.show || false,
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

  return (
    <SelectedContainerLayout
      title="Click Actions"
      hidden={hidden}
      setHidden={setHidden}
    >
      <div className="my-2 flex w-full flex-col items-center justify-between">
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
        {actionType === "Open Link" && (
          <div className="my-2 flex w-full flex-col">
            <label htmlFor="link" className="mx-2 mb-0.5">
              Set Link
            </label>
            <input
              id="link"
              name="link"
              type="text"
              placeholder="https://www.decentraland.com"
              value={link}
              onChange={(value) => handleLinkChange(value.target.value)}
              onBlur={handleOnMouseDownChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleOnMouseDownChange();
                }
              }}
              className="mx-2 w-56 rounded-lg border border-slate-800 bg-slate-800 px-2 py-1 text-sm hover:border-slate-500"
            />
            {validationMessage && (
              <div className="mx-2 mt-1 text-sm text-red-500">
                {validationMessage}
              </div>
            )}
          </div>
        )}
        {actionType === "Show/Hide" && div.uiElementType != "social" && (
          <div className="my-2 flex w-full flex-col items-center">
            <label htmlFor="divOptions" className="text-white">
              Select Container:
            </label>
            <select
              id="divOptions"
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
                  targetDivName:
                    divs.find((div) => div.uuid === e.target.value)?.name || "",
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
            </select>
          </div>
        )}
        {showHideDiv.targetDivUuid != "" && (
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
                  targetDivName:
                    divs.find((div) => div.uuid === showHideDiv.targetDivUuid)
                      ?.name || "",
                  show: !showHideDiv.show,
                });
              }}
            >
              {showHideDiv.show ? <EyeFill /> : <Eye />}
            </div>
          </div>
        )}
      </div>
    </SelectedContainerLayout>
  );
};
