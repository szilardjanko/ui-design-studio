import React from "react";
import Button from "../Button";
import { useUiElement } from "@/context/UiElementContext";
import { presetOne, presetThree, presetTwo } from "../presets/preset";

export const Preset = () => {
  const { setDivs } = useUiElement();

  return (
    <div className="mt-2 flex flex-col gap-1 border-t border-slate-500 pt-2">
      <Button
        text="Preset 1"
        onClick={() => setDivs(presetOne)}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Preset 2"
        onClick={() => setDivs(presetTwo)}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Preset 3"
        onClick={() => setDivs(presetThree)}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
    </div>
  );
};
