import React, { useEffect, useState } from "react";
import { ClickActions } from "./ClickActions";
import {
  ButtonIcon,
  ContainerIcon,
  InputIcon,
  LabelIcon,
  SocialIcon,
} from "../icons/UiElementIcons";
import { Delete } from "../icons/Delete";
import { DivInfo } from "./DivInfo";
import { TextColorControls } from "./TextColorControls";
import { PositionControls } from "./PositionControls";
import { AlignControls } from "./AlignControls";
import { AddDivs } from "./AddDivs";
import { ContainerProperties } from "./ContainerProperties";
import { PaddingMarginControls } from "./PaddingMarginControls";
import { useUiElement } from "@/context/UiElementContext";

export const SelectedEditor = () => {
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
  const {
    selected,
    setSelected,
    divs,
    setDivs,
    handleSetLock,
    updateText,
    updateBackgroundColor,
    updateTextColor,
    updatePosition,
    updateSize,
    updateMargin,
    updatePadding,
    updateOnMouseDown,
    updateActionType,
    updateActionTypeShow,
    updateActionTypeCount,
    setShowDeleteModal,
    setDeleteItem,
  } = useUiElement();

  const screenWidth = 1248;
  const screenHeight = 702;

  useEffect(() => {
    if (selected) {
      setPositionX(selected.position.x.toFixed(2));
      setPositionY(selected.position.y.toFixed(2));
      setWidth(selected.size.width.toFixed(2));
      setHeight(selected.size.height.toFixed(2));
      setMargin({
        top: selected.margin.top.toFixed(2),
        right: selected.margin.right.toFixed(2),
        bottom: selected.margin.bottom.toFixed(2),
        left: selected.margin.left.toFixed(2),
      });
      setPadding({
        top: selected.padding.top.toFixed(2),
        right: selected.padding.right.toFixed(2),
        bottom: selected.padding.bottom.toFixed(2),
        left: selected.padding.left.toFixed(2),
      });
    }
  }, [selected, selected?.size.width, selected?.size.height]);

  const handleShowDeleteModal = () => {
    if (selected && selected.lock) return;
    setDeleteItem(selected);
    setShowDeleteModal(true);
  };

  return (
    <div className="pl-1">
      {selected ? (
        <div
          className="flex w-72 select-none flex-col items-start justify-start overflow-y-auto border-y border-l border-slate-700 bg-slate-800"
          style={{ maxHeight: "90vh" }}
        >
          <div className="flex w-full items-center justify-between border-b border-slate-500 bg-gradient-to-tl from-slate-600 to-slate-900 py-2 shadow shadow-slate-700">
            <div className="flex flex-col px-4">
              <div className="text-white">Selected UI Element:</div>
              <div className="flex items-center">
                <div className="mr-2">
                  {selected.uiElementType === "label" ? (
                    <LabelIcon />
                  ) : selected.uiElementType === "button" ? (
                    <ButtonIcon />
                  ) : selected.uiElementType === "input" ? (
                    <InputIcon />
                  ) : selected.uiElementType === "container" ? (
                    <ContainerIcon />
                  ) : selected.uiElementType === "social" ? (
                    <SocialIcon />
                  ) : null}
                </div>
                {selected.name}
              </div>
            </div>
            <div
              className="m-2 flex cursor-pointer items-center rounded-full bg-rose-700 p-1 hover:bg-rose-800"
              onClick={handleShowDeleteModal}
            >
              <Delete />
            </div>
          </div>
          <DivInfo div={selected} handleSetLock={handleSetLock} />
          {selected.uiElementType !== "social" && (
            <TextColorControls
              div={selected}
              onTextChange={updateText}
              onBackgroundColorChange={updateBackgroundColor}
              onTextColorChange={updateTextColor}
            />
          )}
          <PositionControls
            div={selected}
            onPositionChange={updatePosition}
            onSizeChange={updateSize}
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
            div={selected}
            onPositionChange={updatePosition}
            screenWidth={screenWidth}
            screenHeight={screenHeight}
          />
          {selected.uiElementType === "container" && (
            <>
              <AddDivs
                containerDiv={selected}
                setSelected={setSelected}
                divs={divs}
                setDivs={setDivs}
              />
              <ContainerProperties
                div={selected}
                divs={divs}
                setDivs={setDivs}
              />
            </>
          )}
          <PaddingMarginControls
            div={selected}
            onMarginChange={updateMargin}
            onPaddingChange={updatePadding}
            margin={margin}
            setMargin={setMargin}
            padding={padding}
            setPadding={setPadding}
          />
          {(selected.uiElementType === "social" ||
            selected.uiElementType === "button" ||
            (selected.uiElementType === "label" &&
              selected.actionType === "Count")) && (
              <ClickActions
                div={selected}
                divs={divs}
                onMouseDownChange={updateOnMouseDown}
                onActionTypeChange={updateActionType}
                onActionTypeShowChange={updateActionTypeShow}
                onActionTypeCountChange={updateActionTypeCount}
              />
            )}
        </div>
      ) : (
        <div className="flex select-none flex-col justify-start border-x border-slate-700 bg-slate-800 text-sm md:w-72 md:text-base">
          <div className="flex justify-between border-y border-slate-500 bg-gradient-to-tl from-slate-600 to-slate-900 px-1 py-2 text-white shadow shadow-slate-700 md:px-4">
            <div className="w-full text-center">No UI Element Selected</div>
          </div>
        </div>
      )}
    </div>
  );
};
