import React from "react";

type OpenLinkInputProps = {
  link: string;
  handleLinkChange: (link: string) => void;
  handleOnMouseDownChange: () => void;
  validationMessage: string;
};

export const OpenLinkInput = ({
  link,
  handleLinkChange,
  handleOnMouseDownChange,
  validationMessage,
}: OpenLinkInputProps) => {
  return (
    <div className="my-2 flex w-full flex-col">
      <label htmlFor="link" className="mx-2 mb-0.5">
        Set Link
      </label>
      <input
        id="link"
        name="link"
        type="text"
        placeholder="https://www.decentraland.org"
        value={link}
        onChange={(value) => handleLinkChange(value.target.value)}
        onBlur={handleOnMouseDownChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleOnMouseDownChange();
          }
        }}
        className="mx-2 w-56 rounded-lg border border-slate-800 bg-slate-800 px-2 py-1 text-sm hover:border-slate-500"
      />
      {validationMessage && (
        <div className="mx-2 mt-1 text-sm text-red-500">
          {validationMessage}
        </div>
      )}
    </div>
  );
};
