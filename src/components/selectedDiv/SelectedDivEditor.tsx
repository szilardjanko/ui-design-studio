import { Div, PositionTypes } from "@/pages/CreateUi";
import { Position, Size } from "../UiElement";
import { useEffect, useState } from "react";
import { TextColorControls } from "./TextColorControls";
import { PositionControls } from "./PositionControls";
import { AlignControls } from "./AlignControls";
import { DivInfo } from "./DivInfo";
import { DeleteModal } from "./DeleteModal";
import { Delete } from "../icons/Delete";
import {
  ButtonIcon,
  ContainerIcon,
  InputIcon,
  LabelIcon,
} from "../icons/UiElementIcons";
import { AddDivs } from "./AddDivs";
import { ContainerProperties } from "./ContainerProperties";
import { PaddingMarginControls } from "./PaddingMarginControls";

type SelectedDivEditorProps = {
  div: Div;
  divs: Div[];
  setDivs: React.Dispatch<React.SetStateAction<Div[]>>;
  onPositionChange: (newPosition: Position) => void;
  onSizeChange: (newSize: Size) => void;
  onTextChange: (newText: string) => void;
  onBackgroundColorChange: (newBackgroundColor: string) => void;
  onTextColorChange: (newTextColor: string) => void;
  onMarginChange: (newMargin: PositionTypes) => void;
  onPaddingChange: (newPadding: PositionTypes) => void;
  onDelete: () => void;
  handleSetLock: (lock: boolean) => void;
  setSelected: React.Dispatch<React.SetStateAction<Div | null>>;
};

export const SelectedDivEditor = ({
  div,
  divs,
  setDivs,
  onPositionChange,
  onSizeChange,
  onTextChange,
  onBackgroundColorChange,
  onTextColorChange,
  onDelete,
  handleSetLock,
  onMarginChange,
  onPaddingChange,
  setSelected,
}: SelectedDivEditorProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [positionX, setPositionX] = useState("0");
  const [positionY, setPositionY] = useState("0");
  const [width, setWidth] = useState("0");
  const [height, setHeight] = useState("0");
  const [margin, setMargin] = useState({
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
  });
  const [padding, setPadding] = useState({
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
  });

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
          <div className="flex items-center">
            <div className="mr-2">
              {div.uiElementType === "label" ? (
                <LabelIcon />
              ) : div.uiElementType === "button" ? (
                <ButtonIcon />
              ) : div.uiElementType === "input" ? (
                <InputIcon />
              ) : div.uiElementType === "container" ? (
                <ContainerIcon />
              ) : null}
            </div>
            {div.name}
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
        onTextColorChange={onTextColorChange}
      />
      <PositionControls
        div={div}
        onPositionChange={onPositionChange}
        onSizeChange={onSizeChange}
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
        onPositionChange={onPositionChange}
        screenWidth={screenWidth}
        screenHeight={screenHeight}
      />
      {div.uiElementType === "container" && (
        <>
          <AddDivs
            containerDiv={div}
            setSelected={setSelected}
            divs={divs}
            setDivs={setDivs}
          />
          <ContainerProperties div={div} divs={divs} setDivs={setDivs} />
          <PaddingMarginControls
            div={div}
            onMarginChange={onMarginChange}
            onPaddingChange={onPaddingChange}
            margin={margin}
            setMargin={setMargin}
            padding={padding}
            setPadding={setPadding}
          />
        </>
      )}
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
