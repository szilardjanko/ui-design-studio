import React from "react";
import Button from "../Button";
import { useRouter } from "next/router";
import { PopupTextType } from "@/context/SideBarContext";

type PopupButtonsProps = {
  popupText: PopupTextType;
  setDivs: (divs: any[]) => void;
  setPopupText: (popupText: any) => void;
  handleOpenAccount: () => void;
  handleOpenLocal: () => void;
  handleSave: () => void;
  saveStatus: string;
};

export const PopupButtons: React.FC<PopupButtonsProps> = ({
  popupText,
  setDivs,
  setPopupText,
  handleOpenAccount,
  handleOpenLocal,
  handleSave,
  saveStatus,
}) => {
  const router = useRouter();

  const handleCancel = () => {
    setPopupText({ infoText: "", buttonText: "", handleConfirm: "" });
  };

  switch (popupText.handleConfirm) {
    case "new":
      return (
        <>
          <Button
            text={popupText.buttonText}
            onClick={() => setDivs([])}
            variant="remove"
            padding="medium"
            className="m-2 rounded-2xl"
          />
          <Button
            text="Cancel"
            onClick={handleCancel}
            variant="selected"
            className="m-2 rounded-2xl"
          />
        </>
      );
    case "open":
      return (
        <div className="flex flex-col items-center p-2 md:flex-row">
          <Button
            text="Open"
            onClick={handleOpenAccount}
            variant="selected"
            padding="medium"
            width="medium"
            className="m-2 rounded-2xl"
          />
          <Button
            text="Upload"
            onClick={handleOpenLocal}
            variant="selected"
            padding="medium"
            width="medium"
            className="m-2 rounded-2xl"
          />
          <Button
            text="Cancel"
            onClick={handleCancel}
            variant="remove"
            padding="medium"
            width="medium"
            className="m-2 rounded-2xl"
          />
        </div>
      );
    case "save":
      return (
        <div className="flex" onClick={(e) => e.stopPropagation()}>
          <Button
            text="Save"
            onClick={handleSave}
            variant="selected"
            width="medium"
            className={`m-2 rounded-2xl disabled:text-slate-500 disabled:hover:border-slate-900 disabled:hover:bg-slate-900 disabled:border-slate-900`}
            disabled={saveStatus !== ""}
          />
          <Button
            text="Cancel"
            onClick={handleCancel}
            variant="remove"
            width="medium"
            className="m-2 rounded-2xl"
          />
        </div>
      );
    case "signup":
      return (
        <div className="flex">
          <Button
            text="Sign Up"
            onClick={() => router.push("/signup")}
            variant="selected"
            className="m-2 rounded-2xl"
          />
          <Button
            text="Cancel"
            onClick={handleCancel}
            variant="remove"
            className="m-2 rounded-2xl"
          />
        </div>
      );
    case "login":
      return (
        <div className="flex">
          <Button
            text="Login"
            onClick={() => router.push("/login")}
            variant="selected"
            className="m-2 rounded-2xl"
          />
          <Button
            text="Cancel"
            onClick={handleCancel}
            variant="remove"
            className="m-2 rounded-2xl"
          />
        </div>
      );
    case "account":
      return (
        <div className="flex">
          <Button
            text="Back"
            onClick={handleCancel}
            variant="remove"
            className="m-2 rounded-2xl"
          />
        </div>
      );
    default:
      return (
        <Button
          text={popupText.buttonText}
          onClick={handleCancel}
          variant="remove"
          className="m-2 rounded-2xl"
        />
      );
  }
};
