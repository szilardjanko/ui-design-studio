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
  div: Div | null;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  setSize: React.Dispatch<React.SetStateAction<Size>>;
  onTextChange: (newText: string) => void;
  onBackgroundColorChange: (newBackgroundColor: string) => void;
  onDelete: () => void;
  handleSetLock: (lock: boolean) => void;
};

export const SelectedDivEditor: React.FC<SelectedDivEditorProps> = ({
  div,
  setPosition,
  setSize,
  onTextChange,
  onBackgroundColorChange,
  onDelete,
  handleSetLock,
}) => {
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

  if (!div) return null;

  const handleDelete = () => {
    if (div.lock) return;
    setShowDeleteModal(true);
  };

  return (
    <div className="my-2 ml-44 flex w-fit select-none flex-col justify-start rounded-b-xl border-x border-b border-slate-700 bg-slate-800">
      <div className="flex justify-between border-y border-slate-500 bg-gradient-to-tl from-slate-600 to-slate-900 p-2 pl-4 shadow shadow-slate-700">
        <div>
          Selected UI Element:{" "}
          {div.text === ""
            ? "Unnamed - " + div.uiElementType
            : div.text + " - " + div.uiElementType}
        </div>
        <div
          className="flex cursor-pointer items-center rounded-full bg-rose-700 px-1 hover:bg-rose-800"
          onClick={handleDelete}
        >
          <Delete />
        </div>
      </div>
      <div className="flex h-44 flex-row items-start justify-start">
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
      </div>
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
