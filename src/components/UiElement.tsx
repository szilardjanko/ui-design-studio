import React, { useState } from "react";
import { Div, UiElementTypes } from "@/pages/CreateUi";
import { UiElementLayout } from "./UiElementLayout";
import { UiContainerLayout } from "./UiContainerLayout";
import {
  ActionTypeCount,
  ActionTypeShow,
  ActionTypes,
} from "./selectedDiv/ClickActions";

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Boundary = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

export type PositionType = "absolute" | "relative";

type UiElementProps = {
  div: Div;
  divs: Div[];
  uiElementType: UiElementTypes;
  positionType: PositionType;
  position: Position;
  onPositionChange: (position: Position) => void;
  size: Size;
  onSizeChange: (size: Size) => void;
  text: string;
  onTextChange: (text: string) => void;
  backgroundColor: string;
  textColor: string;
  startPosition: Position;
  setStartPosition: React.Dispatch<React.SetStateAction<Position>>;
  boundary: Boundary;
  snapToGrid?: (
    position: Position,
    size: { width: number; height: number },
  ) => Position;
  cellWidth: number;
  cellHeight: number;
  zoomLevel: number;
  targetDimensions: { width: number; height: number };
  targetRef: React.RefObject<HTMLDivElement>;
  onSelect: (div: Div, e: React.MouseEvent) => void;
  selected: Div | null;
  lock: boolean;
  handleSetLock: (lock: boolean) => void;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteItem: React.Dispatch<React.SetStateAction<Div | null>>;
  updatePosition: (newPosition: Position) => void;
  updateSize: (newSize: Size) => void;
  updateText: (newText: string) => void;
  handleDivSetLock: (lock: boolean) => void;
  actionType: ActionTypes;
  actionTypeShow?: ActionTypeShow;
  actionTypeCount?: ActionTypeCount;
  handleDuplicate: (div: Div) => void;
  safeZone: boolean;
};

export const UiElement = ({
  div,
  divs,
  uiElementType,
  positionType,
  position,
  onPositionChange,
  size,
  onSizeChange,
  text,
  onTextChange,
  backgroundColor,
  textColor,
  startPosition,
  setStartPosition,
  boundary,
  snapToGrid,
  cellWidth,
  cellHeight,
  zoomLevel,
  targetDimensions,
  targetRef,
  onSelect,
  selected,
  lock,
  handleSetLock,
  setShowDeleteModal,
  setDeleteItem,
  updatePosition,
  updateSize,
  updateText,
  handleDivSetLock,
  actionType,
  actionTypeShow,
  actionTypeCount,
  handleDuplicate,
  safeZone,
}: UiElementProps) => {
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const dragMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    if (lock) {
      return;
    }
    if ((e.target as HTMLElement).closest(".resize-handle")) {
      return;
    }
    if (!targetRef.current) {
      return;
    }
    const rect = targetRef.current.getBoundingClientRect();

    const startX = ((e.clientX - rect.left) / rect.width) * 100;
    const startY = ((e.clientY - rect.top) / rect.height) * 100;

    setStartPosition({ x: startX - position.x, y: startY - position.y });
    let latestPosition = { ...position };

    const elementDrag = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      if (!targetRef.current) {
        return;
      }
      const newPosX =
        ((moveEvent.clientX - rect.left) / rect.width) * 100 - startPosition.x;
      const newPosY =
        ((moveEvent.clientY - rect.top) / rect.height) * 100 - startPosition.y;

      const constrainedX = Math.max(
        safeZone ? 25 : 0,
        Math.min(
          newPosX,
          100 - (size.width / targetRef.current.offsetWidth) * 100,
        ),
      );
      const constrainedY = Math.max(
        0,
        Math.min(
          newPosY,
          100 - (size.height / targetRef.current.offsetHeight) * 100,
        ),
      );

      onPositionChange({ x: constrainedX, y: constrainedY });
      latestPosition = { x: constrainedX, y: constrainedY };
    };

    const closeDragElement = () => {
      if (snapToGrid) {
        const snappedPosition = snapToGrid(latestPosition, size);
        onPositionChange(snappedPosition);
      }
      document.removeEventListener("mousemove", elementDrag);
      document.removeEventListener("mouseup", closeDragElement);
    };

    document.addEventListener("mousemove", elementDrag);
    document.addEventListener("mouseup", closeDragElement);
  };

  const onResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (lock) {
      return;
    }

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const doResize = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();

      let newWidth = Math.max(
        0,
        startWidth + (moveEvent.clientX - startX) / zoomLevel,
      );
      let newHeight = Math.max(
        0,
        startHeight + (moveEvent.clientY - startY) / zoomLevel,
      );

      if (targetRef.current) {
        const maxWidth =
          targetRef.current.offsetWidth -
          (position.x / 100) * targetRef.current.offsetWidth;
        newWidth = Math.min(newWidth, maxWidth);

        const maxHeight =
          targetRef.current.offsetHeight -
          (position.y / 100) * targetRef.current.offsetHeight;
        newHeight = Math.min(newHeight, maxHeight);
      }

      newWidth =
        Math.round(newWidth / (cellWidth * zoomLevel)) *
        (cellWidth * zoomLevel);
      newHeight =
        Math.round(newHeight / (cellHeight * zoomLevel)) *
        (cellHeight * zoomLevel);

      onSizeChange({ width: newWidth, height: newHeight });
    };

    const stopResize = () => {
      document.removeEventListener("mousemove", doResize);
      document.removeEventListener("mouseup", stopResize);
    };

    document.addEventListener("mousemove", doResize);
    document.addEventListener("mouseup", stopResize);
  };

  return (
    <UiElementLayout
      div={div}
      isMouseEnter={isMouseEnter}
      setIsMouseEnter={setIsMouseEnter}
      onSelect={onSelect}
      selected={selected}
      onResizeMouseDown={onResizeMouseDown}
      dragMouseDown={dragMouseDown}
      handleSetLock={handleSetLock}
      setDeleteItem={setDeleteItem}
      setShowDeleteModal={setShowDeleteModal}
      handleDuplicate={handleDuplicate}
    >
      {uiElementType === "input" ? (
        <input
          className={`cursor-pointer pl-4`}
          style={{
            width: `${size.width}px`,
            height: `${size.height}px`,
            backgroundColor: backgroundColor,
            color: textColor,
          }}
          type="text"
          id="input"
          name="input"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
        />
      ) : uiElementType === "container" ? (
        <UiContainerLayout
          div={div}
          selected={selected}
          boundary={boundary}
          snapToGrid={snapToGrid}
          cellHeight={cellHeight}
          cellWidth={cellWidth}
          zoomLevel={zoomLevel}
          targetRef={targetRef}
          setDeleteItem={setDeleteItem}
          setShowDeleteModal={setShowDeleteModal}
          updatePosition={updatePosition}
          updateSize={updateSize}
          updateText={updateText}
          handleDivSetLock={handleDivSetLock}
          divs={divs}
          onSelect={onSelect}
          handleDuplicate={handleDuplicate}
          safeZone={safeZone}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          {uiElementType === "label" && actionType === "Count" ? (
            <div>{actionTypeCount?.count}</div>
          ) : (
            text
          )}
        </div>
      )}
    </UiElementLayout>
  );
};
