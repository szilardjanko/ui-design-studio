import React, { useState } from "react";
import { MoveIcon, ResizeIcon } from "./icons/UiElementIcons";

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

type UiElementProps = {
  uiElementType: "label" | "button" | "input";
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  size: Size;
  setSize: React.Dispatch<React.SetStateAction<Size>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  backgroundColor: string;
  startPosition: Position;
  setStartPosition: React.Dispatch<React.SetStateAction<Position>>;
  snapToGrid?: (
    position: Position,
    size: { width: number; height: number },
  ) => Position;
  cellWidth: number;
  cellHeight: number;
  zoomLevel: number;
  targetDimensions: { width: number; height: number };
  targetRef: React.RefObject<HTMLDivElement>;
  onSelect: () => void;
  lock: boolean;
};

export const UiElement = ({
  uiElementType,
  position,
  setPosition,
  size,
  setSize,
  text,
  setText,
  backgroundColor,
  startPosition,
  setStartPosition,
  snapToGrid,
  cellWidth,
  cellHeight,
  zoomLevel,
  targetRef,
  onSelect,
  lock,
}: UiElementProps) => {
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const dragMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
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
        0,
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

      setPosition({ x: constrainedX, y: constrainedY });
      latestPosition = { x: constrainedX, y: constrainedY };
    };

    const closeDragElement = () => {
      if (snapToGrid) {
        const snappedPosition = snapToGrid(latestPosition, size);
        setPosition(snappedPosition);
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

      setSize({ width: newWidth, height: newHeight });
    };

    const stopResize = () => {
      document.removeEventListener("mousemove", doResize);
      document.removeEventListener("mouseup", stopResize);
    };

    document.addEventListener("mousemove", doResize);
    document.addEventListener("mouseup", stopResize);
  };

  return (
    <div
      className={`fixed flex cursor-move select-none items-center justify-center text-center`}
      style={{
        position: "absolute",
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: 9,
        backgroundColor: uiElementType === "input" ? "" : backgroundColor,
      }}
      onMouseDown={dragMouseDown}
      onMouseEnter={() => {
        setIsMouseEnter(true);
        !lock && onSelect();
      }}
      onMouseLeave={() => setIsMouseEnter(false)}
      onClick={() => onSelect()}
    >
      {uiElementType === "input" ? (
        <input
          className={`cursor-pointer ${backgroundColor} pl-4 text-black`}
          style={{
            width: `${size.width}px`,
            height: `${size.height}px`,
          }}
          type="text"
          id="input"
          name="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <div>{text}</div>
      )}
      {isMouseEnter && (
        <div
          className="cursor-se-resize"
          style={{
            position: "absolute",
            right: "2px",
            bottom: "0px",
          }}
          onMouseDown={onResizeMouseDown}
        >
          <ResizeIcon />
        </div>
      )}
      {isMouseEnter && (
        <div
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
          }}
        >
          <MoveIcon />
        </div>
      )}
    </div>
  );
};
