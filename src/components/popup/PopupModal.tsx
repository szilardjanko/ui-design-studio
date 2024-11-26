import React, { useState } from "react";
import { useUiElement } from "@/context/UiElementContext";
import { useSideBar } from "@/context/SideBarContext";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { PopupContent } from "./PopupContent";
import { PopupButtons } from "./PopupButtons";

export const PopupModal = () => {
  const [saveStatus, setSaveStatus] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const { divs, setDivs } = useUiElement();
  const { popupText, setPopupText } = useSideBar();
  const router = useRouter();

  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleOpenAccount = () => {
    router.push("/account");
  };

  const handleOpenLocal = () => {
    document.querySelector<HTMLInputElement>("#fileInput")?.click();
  };

  const handleSave = async () => {
    if (name === "") {
      setNameError("File name is required");
      return;
    }

    setSaveStatus("Saving...");
    try {
      const { error } = await supabase
        .from("UiElements")
        .insert({ element: divs, name: name });

      if (error) throw error;

      setSaveStatus("Saved!");
      setTimeout(() => {
        setPopupText({ infoText: "", buttonText: "", handleConfirm: "" });
        setSaveStatus("");
      }, 2000);
    } catch (error) {
      console.error("Failed to save:", error);
      setSaveStatus(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-20 flex select-none flex-col items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
      onClick={() =>
        setPopupText({ infoText: "", buttonText: "", handleConfirm: "" })
      }
    >
      <div
        className="relative m-2 rounded-2xl border border-neutral-500 bg-gradient-to-tl from-slate-700 to-slate-900 p-2 shadow shadow-slate-700"
        onClick={handleInnerClick}
      >
        <PopupContent
          popupText={popupText}
          name={name}
          setName={setName}
          setNameError={setNameError}
          nameError={nameError}
          saveStatus={saveStatus}
        />
      </div>
      <div className="flex justify-center">
        <PopupButtons
          popupText={popupText}
          setDivs={setDivs}
          setPopupText={setPopupText}
          handleOpenAccount={handleOpenAccount}
          handleOpenLocal={handleOpenLocal}
          handleSave={handleSave}
          saveStatus={saveStatus}
        />
      </div>
    </div>
  );
};
