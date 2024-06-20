import { Div } from "@/pages/CreateUi";
import { Position, Size } from "../UiElement";
import { useEffect, useState } from "react";
import { TextColorControls } from "./TextColorControls";
import { PositionControls } from "./PositionControls";
import { AlignControls } from "./AlignControls";
import { DivInfo } from "./DivInfo";
import { DeleteModal } from "./DeleteModal";
import { Delete } from "../icons/Delete";

type SelectedDivEditorProps = {
  div: Div;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  setSize: React.Dispatch<React.SetStateAction<Size>>;
  onTextChange: (newText: string) => void;
  onBackgroundColorChange: (newBackgroundColor: string) => void;
  onDelete: () => void;
  handleSetLock: (lock: boolean) => void;
};

export const SelectedDivEditor = ({
  div,
  setPosition,
  setSize,
  onTextChange,
  onBackgroundColorChange,
  onDelete,
  handleSetLock,
}: SelectedDivEditorProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [positionX, setPositionX] = useState(
    div ? div.position.x.toFixed(2) : "0",
  );
  const [positionY, setPositionY] = useState(
    div ? div.position.y.toFixed(2) : "0",
  );
  const [width, setWidth] = useState(div ? div.size.width.toFixed(2) : "0");
  const [height, setHeight] = useState(div ? div.size.height.toFixed(2) : "0");

  const screenWidth = 1248;
  const screenHeight = 702;

  useEffect(() => {
    if (div) {
      setPositionX(div.position.x.toFixed(2));
      setPositionY(div.position.y.toFixed(2));
      setWidth(div.size.width.toFixed(2));
      setHeight(div.size.height.toFixed(2));
    }
  }, [div]);

  const handleDelete = () => {
    if (div.lock) return;
    setShowDeleteModal(true);
  };

  return (
    <div className="flex w-72 select-none flex-col items-start justify-start border-y border-l border-slate-700 bg-slate-800">
      <div className="flex w-full items-center justify-between border-b border-slate-500 bg-gradient-to-tl from-slate-600 to-slate-900 py-2 shadow shadow-slate-700">
        <div className="flex flex-col px-4">
          <div className="text-white">Selected UI Element:</div>
          <div>
            {div.text === ""
              ? "Unnamed - " + div.uiElementType
              : div.text + " - " + div.uiElementType}
          </div>
        </div>
        <div
          className="m-2 flex cursor-pointer items-center rounded-full bg-rose-700 p-1 hover:bg-rose-800"
          onClick={handleDelete}
        >
          <Delete />
        </div>
      </div>
      <DivInfo div={div} handleSetLock={handleSetLock} />
      <TextColorControls
        div={div}
        onTextChange={onTextChange}
        onBackgroundColorChange={onBackgroundColorChange}
      />
      <PositionControls
        div={div}
        setPosition={setPosition}
        setSize={setSize}
        setHeight={setHeight}
        setWidth={setWidth}
        setPositionX={setPositionX}
        setPositionY={setPositionY}
        height={height}
        width={width}
        positionX={positionX}
        positionY={positionY}
      />
      <AlignControls
        div={div}
        setPosition={setPosition}
        screenWidth={screenWidth}
        screenHeight={screenHeight}
      />
      {showDeleteModal && (
        <DeleteModal
          div={div}
          setShowDeleteModal={setShowDeleteModal}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};
