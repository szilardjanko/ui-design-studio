import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "../Button";
import { useUiElement } from "@/context/UiElementContext";
import { Div } from "@/pages/CreateUi";
import { useSideBar } from "@/context/SideBarContext";

export const SaveLoad = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { divs, setDivs } = useUiElement();
  const { setPopupText } = useSideBar();

  const downloadFile = (data: string, filename: string): void => {
    const file = new Blob([data], { type: "application/json" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const readFile = (
    file: File,
    callback: (result: string | ArrayBuffer | null) => void,
  ): void => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) =>
      callback(event.target?.result ?? null);
    reader.readAsText(file);
  };

  const isValidDivArray = (data: any): data is Div[] => {
    return (
      Array.isArray(data) &&
      data.every(
        (item) =>
          typeof item === "object" &&
          "uuid" in item &&
          "uiElementType" in item &&
          "name" in item &&
          "display" in item &&
          "containedElements" in item &&
          Array.isArray(item.containedElements) &&
          "containerName" in item &&
          "positionType" in item &&
          "position" in item &&
          "text" in item &&
          "size" in item &&
          typeof item.size === "object" &&
          "width" in item.size &&
          "height" in item.size &&
          "backgroundColor" in item &&
          "textColor" in item &&
          "lock" in item &&
          "flexDirection" in item &&
          "justifyContent" in item &&
          "alignContent" in item &&
          "alignItems" in item &&
          "flexWrap" in item &&
          "margin" in item &&
          typeof item.margin === "object" &&
          "top" in item.margin &&
          "right" in item.margin &&
          "bottom" in item.margin &&
          "left" in item.margin &&
          "padding" in item &&
          typeof item.padding === "object" &&
          "top" in item.padding &&
          "right" in item.padding &&
          "bottom" in item.padding &&
          "left" in item.padding,
      )
    );
  };

  const handleSave = (): void => {
    const data = JSON.stringify(divs, null, 2);
    downloadFile(data, "UiDesignStudio.json");
  };

  const handleLoad = (event: ChangeEvent<HTMLInputElement>): void => {
    setShowOptions(false);
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/json" && !file.name.endsWith(".json")) {
        setPopupText({
          infoText: "Invalid file type",
          buttonText: "Back",
          handleConfirm: "",
        });
        (event.target as HTMLInputElement).value = "";
        return;
      }

      readFile(file, (content) => {
        if (typeof content === "string") {
          try {
            const parsedDivs: any = JSON.parse(content);
            if (isValidDivArray(parsedDivs)) {
              setDivs(parsedDivs);
            } else {
              setPopupText({
                infoText: "Invalid file format",
                buttonText: "Back",
                handleConfirm: "",
              });
            }
          } catch (error) {
            setPopupText({
              infoText: "Invalid file format",
              buttonText: "Back",
              handleConfirm: "",
            });
          }
        } else {
          setPopupText({
            infoText: "Invalid file format",
            buttonText: "Back",
            handleConfirm: "",
          });
        }
        (event.target as HTMLInputElement).value = "";
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey) {
        switch (event.key) {
          case "n":
          case "N":
            event.preventDefault();
            setPopupText({
              infoText: "Are you sure you want to start a new design?",
              buttonText: "New",
              handleConfirm: "new",
            });
            break;
          case "o":
          case "O":
            event.preventDefault();
            console.log("o pushed");
            document.querySelector<HTMLInputElement>("#fileInput")?.click();
            break;
          case "s":
          case "S":
            event.preventDefault();
            handleSave();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <Button
        text="File"
        className="my-0.5"
        onClick={() => setShowOptions(!showOptions)}
      />
      {showOptions && (
        <div className="flex w-full flex-col justify-around">
          <Button
            text="New"
            className="my-0.5"
            onClick={() => {
              setPopupText({
                infoText: "Are you sure you want to start a new design?",
                buttonText: "New",
                handleConfirm: "new",
              });
              setShowOptions(false);
            }}
          />
          <Button
            text="Open"
            className="my-0.5"
            onClick={() =>
              document.querySelector<HTMLInputElement>("#fileInput")?.click()
            }
          />
          <Button
            text="Save"
            className="my-0.5"
            onClick={() => {
              handleSave();
              setShowOptions(false);
            }}
          />
        </div>
      )}
      <input
        type="file"
        id="fileInput"
        accept=".json"
        className="hidden"
        onChange={handleLoad}
      />
    </div>
  );
};
