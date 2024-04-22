import React, { useState } from "react";

export type Position = {
  x: number;
  y: number;
}

type Size = {
  width: number;
  height: number;
}

type UiElementProps = {
  uiElementType: "label" | "button" | "input";
  position: Position;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  size: Size;
  text: string;
  backgroundColor: string;
  startPosition: Position;
  setStartPosition: React.Dispatch<React.SetStateAction<Position>>;
  snapToGrid?: (
    position: Position,
    size: { width: number; height: number },
  ) => Position;
  targetRef: React.RefObject<HTMLDivElement>;
}

const UiElement: React.FC<UiElementProps> = ({
  uiElementType,
  position,
  setPosition,
  size,
  text,
  backgroundColor,
  startPosition,
  setStartPosition,
  snapToGrid,
  targetRef,
}) => {
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const dragMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
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
      onMouseEnter={() => setIsMouseEnter(true)}
      onMouseLeave={() => setIsMouseEnter(false)}
    >
      <div>{text}</div>
      {isMouseEnter && (
        <div
          className=""
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrows-move"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default UiElement;
