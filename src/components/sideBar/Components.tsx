import React from "react";
import Button from "../Button";

const Components = () => {
  return (
    <div className="mt-2 flex flex-col border-t border-slate-300 pt-2">
      <Button
        text="Labels"
        onClick={() => console.log("add labels")}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Buttons"
        onClick={() => console.log("add buttons")}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Input Fields"
        onClick={() => console.log("add input fields")}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
    </div>
  );
};

export default Components;
