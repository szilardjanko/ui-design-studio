import React from "react";
import Button from "../Button";

export const Preset = () => {
  return (
    <div className="mt-2 flex flex-col border-t border-slate-300 pt-2">
      <Button
        text="Preset 1"
        onClick={() => console.log("add preset 1")}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Preset 2"
        onClick={() => console.log("add preset 2")}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Preset 3"
        onClick={() => console.log("add preset 3")}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
    </div>
  );
};
