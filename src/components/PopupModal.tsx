import React from "react";
import Button from "./Button";
import { useUiElement } from "@/context/UiElementContext";
import { useSideBar } from "@/context/SideBarContext";

export const PopupModal = () => {
  const { setDivs } = useUiElement();
  const { popupText, setPopupText } = useSideBar();

  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleConfirm = () => {
    switch (popupText.handleConfirm) {
      case "new":
        setDivs([]);
        break;
      default:
        return;
    }
  };

  return (
    <div
      className="fixed inset-0 flex select-none flex-col items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
      onClick={() =>
        setPopupText({ infoText: "", buttonText: "", handleConfirm: "" })
      }
    >
      <div
        className="relative m-2 rounded-2xl border border-neutral-500 bg-gradient-to-tl from-slate-700 to-slate-900 p-2 shadow shadow-slate-700"
        onClick={handleInnerClick}
      >
        <div className="m-5 text-center text-white">{popupText.infoText}</div>
      </div>
      <div className="flex justify-center">
        {popupText.handleConfirm === "new" ? (
          <>
            {" "}
            <Button
              text={popupText.buttonText}
              onClick={handleConfirm}
              variant="remove"
              padding="medium"
              className="m-2 rounded-2xl"
            />
            <Button
              text="Cancel"
              onClick={() =>
                setPopupText({
                  infoText: "",
                  buttonText: "",
                  handleConfirm: "",
                })
              }
              variant="selected"
              className="m-2 rounded-2xl"
            />
          </>
        ) : (
          <Button
            text={popupText.buttonText}
            onClick={() =>
              setPopupText({
                infoText: "",
                buttonText: "",
                handleConfirm: "",
              })
            }
            variant="remove"
            className="m-2 rounded-2xl"
          />
        )}
      </div>
    </div>
  );
};
