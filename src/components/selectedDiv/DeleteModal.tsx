import { Div } from "@/pages/CreateUi";
import React from "react";
import Button from "../Button";

type DeleteModalProps = {
  div: Div;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
};

export const DeleteModal = ({
  div,
  setShowDeleteModal,
  onDelete,
}: DeleteModalProps) => {
  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex select-none flex-col items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
      onClick={() => setShowDeleteModal(false)}
    >
      <div
        className="relative m-2 rounded-2xl border border-neutral-500 bg-gradient-to-tl from-slate-700 to-slate-900 p-2 shadow shadow-slate-700"
        onClick={handleInnerClick}
      >
        <div className="m-5 text-white">
          <div>Selected UI Element: {div.text}</div>
          <div className="mb-2">Type: {div.uiElementType}</div>
          <div>Are you sure you want to delete this UI Element?</div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          text="Delete"
          onClick={onDelete}
          variant="remove"
          padding="medium"
          className="m-2 rounded-2xl"
        />
        <Button
          text="Cancel"
          onClick={() => setShowDeleteModal(false)}
          variant="selected"
          className="m-2 rounded-2xl"
        />
      </div>
    </div>
  );
};
