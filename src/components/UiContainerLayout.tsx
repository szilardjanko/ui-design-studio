import { Div } from "@/pages/CreateUi";
import React from "react";
import { Boundary, Position, Size, UiElement } from "./UiElement";

type UiElementLayoutProps = {
  divs: Div[];
  div: Div;
  selected: Div | null;
  setDeleteItem: React.Dispatch<React.SetStateAction<Div | null>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  updatePosition: (
    newPosition: Position,
    index?: number,
    isContainer?: boolean,
    isContainerDiv?: boolean,
  ) => void;
  updateSize: (newSize: Size) => void;
  updateText: (newText: string) => void;
  onSelect: (div: Div, e: React.MouseEvent) => void;
  handleDivSetLock: (lock: boolean) => void;
  boundary: Boundary;
  snapToGrid?: (
    position: Position,
    size: { width: number; height: number },
  ) => Position;
  cellWidth: number;
  cellHeight: number;
  zoomLevel: number;
  targetRef: React.RefObject<HTMLDivElement>;
  handleDuplicate: (div: Div) => void;
  safeZone: boolean;
};

export const UiContainerLayout = ({
  divs,
  div,
  selected,
  setDeleteItem,
  setShowDeleteModal,
  updatePosition,
  updateSize,
  updateText,
  onSelect,
  handleDivSetLock,
  boundary,
  snapToGrid,
  cellHeight,
  cellWidth,
  zoomLevel,
  targetRef,
  handleDuplicate,
  safeZone,
}: UiElementLayoutProps) => {
  return (
    <>
      {div.containedElements.map((containedElement, index) => (
        <UiElement
          key={index}
          div={containedElement}
          selected={selected}
          uiElementType={containedElement.uiElementType}
          positionType={containedElement.positionType}
          position={containedElement.position}
          onPositionChange={(newPosition) => updatePosition(newPosition)}
          size={containedElement.size}
          onSizeChange={(newSize) => updateSize(newSize)}
          text={containedElement.text}
          onTextChange={(newText) => updateText(newText)}
          backgroundColor={containedElement.backgroundColor}
          textColor={containedElement.textColor}
          startPosition={{ x: 0, y: 0 }}
          setStartPosition={() => {}}
          boundary={boundary}
          snapToGrid={snapToGrid}
          cellHeight={cellHeight}
          cellWidth={cellWidth}
          zoomLevel={zoomLevel}
          targetDimensions={{
            width: targetRef.current?.offsetWidth
              ? targetRef.current.offsetWidth
              : 0,
            height: targetRef.current?.offsetHeight
              ? targetRef.current.offsetHeight
              : 0,
          }}
          targetRef={targetRef}
          onSelect={onSelect}
          lock={containedElement.lock}
          handleSetLock={(lock) => handleDivSetLock(lock)}
          setDeleteItem={setDeleteItem}
          setShowDeleteModal={setShowDeleteModal}
          divs={divs}
          handleDivSetLock={handleDivSetLock}
          updatePosition={updatePosition}
          updateSize={updateSize}
          updateText={updateText}
          actionType={containedElement.actionType}
          actionTypeCount={containedElement.actionTypeCount}
          handleDuplicate={handleDuplicate}
          safeZone={safeZone}
        />
      ))}
    </>
  );
};
