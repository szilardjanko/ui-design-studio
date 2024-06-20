import React from "react";
import Button from "../Button";

export const Social = () => {
  return (
    <div className="mt-2 flex flex-col border-t border-slate-300 pt-2">
      <Button
        text="Instagram"
        onClick={() => console.log("instagram")}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Facebook"
        onClick={() => console.log("facebook")}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Twitter"
        onClick={() => console.log("twitter")}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
      <Button
        text="Lens"
        onClick={() => console.log("lens")}
        padding="small"
        variant="neutral"
        textAlign="left"
      />
    </div>
  );
};
