import React from "react";
import Button from "../Button";
import { useUiElement } from "@/context/UiElementContext";

export const DeleteModal = () => {
  const { deleteItem, setShowDeleteModal, handleDelete } = useUiElement();

  if (!deleteItem) return null;

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
        <div className="m-5 text-center text-white">
          <div>Selected UI Element: {deleteItem.name}</div>
          <div>Type: {deleteItem.uiElementType}</div>
          <div className="mt-2">
            Are you sure you want to delete this UI Element?
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          text="Delete"
          onClick={handleDelete}
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
