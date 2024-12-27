import React, { useState } from "react";
import Button from "../Button";
import { Copy } from "../icons/Edit";
import { Back, Check, Download, Help, No } from "../icons/File";
import { useUiCode } from "@/context/UiCodeContext";

type UiCodeMenuProps = {
  setShowUiCode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UiCodeMenu = ({ setShowUiCode }: UiCodeMenuProps) => {
  const [copyCodeText, setCopyCodeText] = useState("Copy Code");

  const {
    uiCode,
    setShowInstructions,
    setShowImages,
    useCanvasInfo,
    setUseCanvasInfo,
  } = useUiCode();

  return (
    <div className="flex flex-col gap-1">
      <Button
        text={copyCodeText}
        icon={<Copy />}
        textAlign="left"
        onClick={() => {
          setShowInstructions(false);
          navigator.clipboard.writeText(uiCode);
          setCopyCodeText("Code Copied");
          setTimeout(() => {
            setCopyCodeText("Copy Code");
          }, 2000);
        }}
      />
      <Button
        text={"Instructions"}
        icon={<Help />}
        textAlign="left"
        onClick={() => {
          setShowImages(false);
          setShowInstructions(true);
        }}
      />
      <Button
        text={"Save Images"}
        icon={<Download />}
        textAlign="left"
        onClick={() => {
          setShowInstructions(true);
          setShowImages(true);
        }}
      />
      <Button
        text={"Auto Scale"}
        icon={useCanvasInfo ? <Check /> : <No />}
        textAlign="left"
        onClick={() => {
          setUseCanvasInfo(!useCanvasInfo);
        }}
      />
      <Button
        text={"Back"}
        icon={<Back />}
        textAlign="left"
        variant="remove"
        onClick={() => setShowUiCode(false)}
      />
    </div>
  );
};
