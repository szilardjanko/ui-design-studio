import React from "react";
import Button from "../Button";
import { UiElementTypes } from "@/pages/create";
import {
  ButtonIcon,
  ContainerIcon,
  InputIcon,
  LabelIcon,
} from "../icons/UiElementIcons";

type ComponentsProps = {
  addDiv: (uiElementType: UiElementTypes) => void;
};

export const Components = ({ addDiv }: ComponentsProps) => {
  return (
    <div className="mt-2 flex flex-col gap-1 border-t border-slate-500 pt-2">
      <Button
        text="Container"
        onClick={() => addDiv("container")}
        padding="small"
        textAlign="left"
        icon={<ContainerIcon />}
      />
      <Button
        text="Labels"
        onClick={() => addDiv("label")}
        padding="small"
        variant="neutral"
        textAlign="left"
        icon={<LabelIcon />}
      />
      <Button
        text="Buttons"
        onClick={() => addDiv("button")}
        padding="small"
        variant="neutral"
        textAlign="left"
        icon={<ButtonIcon />}
      />
      <Button
        text="Input Field"
        onClick={() => addDiv("input")}
        padding="small"
        variant="neutral"
        textAlign="left"
        icon={<InputIcon />}
      />
    </div>
  );
};
