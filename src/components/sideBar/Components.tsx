import React from "react";
import Button from "../Button";

type AddDivFunction = (uiElementType: "label" | "button" | "input") => void;

const Components: React.FC<{ addDiv: AddDivFunction }> = ({ addDiv }) => {
  return (
    <div className="mt-2 flex flex-col border-t border-slate-300 pt-2">
      <Button
        text="Labels"
        onClick={() => addDiv("label")}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Buttons"
        onClick={() => addDiv("button")}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Input Field"
        onClick={() => addDiv("input")}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
    </div>
  );
};

export default Components;
