import React, { ChangeEvent, useEffect, useRef } from "react";
import { Back, Download } from "../icons/File";
import Button from "../Button";
import { Login, New, Open, Save } from "../icons/File";
import { SignUp } from "../icons/File";
import { useAuth } from "@/context/AuthContext";
import { useSideBar } from "@/context/SideBarContext";
import { useUiElement } from "@/context/UiElementContext";
import { Div } from "@/pages/create";

type SaveLoadProps = {
  setShowFileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SaveLoad = ({ setShowFileMenu }: SaveLoadProps) => {
  const { divs, setDivs } = useUiElement();
  const { setPopupText } = useSideBar();
  const { user } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowFileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleDownload = (): void => {
    const data = JSON.stringify(divs, null, 2);
    downloadFile(data, "UiDesignStudio.json");
  };

  const handleSave = () => {
    setPopupText({
      infoText: "Are you sure you want to save your design?",
      buttonText: "Save",
      handleConfirm: "save",
    });
  };

  const handleLoad = (event: ChangeEvent<HTMLInputElement>): void => {
    setShowFileMenu(false);
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

  const handleOpen = () => {
    setPopupText({
      infoText:
        "Would you like to open a saved design from your account or local storage?",
      buttonText: "Open",
      handleConfirm: "open",
    });
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
    <div className="flex flex-col gap-1">
      {!user && (
        <>
          <Button
            text="Sign Up"
            icon={<SignUp />}
            textAlign="left"
            onClick={() => {
              setPopupText({
                infoText: "Sign up to save your design",
                buttonText: "Sign Up",
                handleConfirm: "signup",
              });
              setShowFileMenu(false);
            }}
          />
          <Button
            text="Login"
            icon={<Login />}
            textAlign="left"
            onClick={() => {
              setPopupText({
                infoText: "Login to save your design",
                buttonText: "Login",
                handleConfirm: "login",
              });
              setShowFileMenu(false);
            }}
          />
        </>
      )}
      {user && (
        <Button
          text="Save"
          icon={<Save />}
          textAlign="left"
          onClick={() => {
            handleSave();
            setShowFileMenu(false);
          }}
        />
      )}
      <Button
        text="New"
        icon={<New />}
        textAlign="left"
        onClick={() => {
          setPopupText({
            infoText: "Are you sure you want to start a new design?",
            buttonText: "New",
            handleConfirm: "new",
          });
          setShowFileMenu(false);
        }}
      />
      <Button
        text="Open"
        icon={<Open />}
        textAlign="left"
        onClick={() => handleOpen()}
      />
      <Button
        text="Download"
        icon={<Download />}
        textAlign="left"
        onClick={() => {
          handleDownload();
          setShowFileMenu(false);
        }}
      />
      <Button
        text={"Back"}
        icon={<Back />}
        textAlign="left"
        variant="remove"
        onClick={() => setShowFileMenu(false)}
      />
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
