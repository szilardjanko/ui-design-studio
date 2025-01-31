import React from "react";
import Button from "../Button";
import { useUiElement } from "@/context/UiElementContext";
import {
  presetFive,
  presetFour,
  presetOne,
  presetSix,
  presetThree,
  presetTwo,
} from "../presets/preset";

export const Preset = () => {
  const { setDivs } = useUiElement();

  return (
    <div className="mt-2 flex flex-col gap-1 border-t border-slate-500 pt-2">
      <Button
        text="Medieval"
        onClick={() => setDivs(presetFour)}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Pro"
        onClick={() => setDivs(presetSix)}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Standard 1"
        onClick={() => setDivs(presetOne)}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Standard 2"
        onClick={() => setDivs(presetFive)}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Scroll"
        onClick={() => setDivs(presetThree)}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Greek"
        onClick={() => setDivs(presetTwo)}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
    </div>
  );
};
