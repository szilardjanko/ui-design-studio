import { Div } from "@/pages/create";
import React from "react";
import { MoveIcon, ResizeIcon } from "./icons/UiElementIcons";
import { Lock, Unlock } from "./icons/Lock";
import { Trash } from "./icons/Delete";
import { Copy } from "./icons/Edit";

type UiElementLayoutProps = {
  children: React.ReactNode;
  div: Div;
  isMouseEnter: boolean;
  setIsMouseEnter: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: (div: Div, e: React.MouseEvent) => void;
  selected: Div | null;
  onResizeMouseDown: (e: React.MouseEvent) => void;
  dragMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleSetLock: (lock: boolean) => void;
  setDeleteItem: React.Dispatch<React.SetStateAction<Div | null>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDuplicate: (div: Div) => void;
};

export const UiElementLayout = ({
  children,
  div,
  isMouseEnter,
  setIsMouseEnter,
  onSelect,
  selected,
  onResizeMouseDown,
  dragMouseDown,
  handleSetLock,
  setDeleteItem,
  setShowDeleteModal,
  handleDuplicate,
}: UiElementLayoutProps) => {
  const getBackgroundColor = (div: Div) => {
    if (div.backgroundImage) {
      return "rgba(0,0,0,0)";
    }
    return div.backgroundColor === ""
      ? "transparent"
      : div.backgroundColor || "#ffffff";
  };

  return (
    <div
      className={`ui-element flex cursor-pointer select-none items-center justify-center text-center`}
      style={{
        display: div.display,
        position: div.positionType,
        left: `${div.position.x}%`,
        top: `${div.position.y}%`,
        width: `${div.size.width}px`,
        height: `${div.size.height}px`,
        flexDirection: div.flexDirection,
        justifyContent: div.justifyContent,
        alignItems: div.alignItems,
        alignContent: div.alignContent,
        flexWrap: div.flexWrap,
        margin: `${div.margin.top}px ${div.margin.right}px ${div.margin.bottom}px ${div.margin.left}px`,
        padding: `${div.padding.top}px ${div.padding.right}px ${div.padding.bottom}px ${div.padding.left}px`,
        zIndex: 9,
        fontSize: `${div.fontSize}px`,
        fontFamily: div.fontFamily,
        color: div.textColor,
        backgroundImage: div.backgroundImage
          ? `url(${div.backgroundImage})`
          : "",
        backgroundColor: getBackgroundColor(div),

        backgroundRepeat: "no-repeat",
        backgroundSize:
          div.hasSprite && div.spriteProperties && div.backgroundImageSize
            ? `${(div.backgroundImageSize.width / div.spriteProperties.width) * div.size.width}px ${(div.backgroundImageSize.height / div.spriteProperties.height) * div.size.height}px`
            : "contain",
        backgroundPosition:
          div.hasSprite && div.spriteProperties
            ? `-${(div.spriteProperties.x / div.spriteProperties.width) * div.size.width}px -${(div.spriteProperties.y / div.spriteProperties.height) * div.size.height}px`
            : "center",
      }}
      onMouseEnter={() => {
        setIsMouseEnter(true);
      }}
      onMouseLeave={() => setIsMouseEnter(false)}
      onClick={(e) => {
        onSelect(div, e);
        // console.log(div, e);
      }}
    >
      {children}
      {selected && selected.uuid === div.uuid && (
        <div
          className="resize-handle cursor-se-resize rounded-full bg-slate-100 bg-opacity-50 text-black"
          style={{
            position: "absolute",
            right: "-15px",
            bottom: "-15px",
            padding: "5px",
          }}
          onMouseDown={onResizeMouseDown}
        >
          <ResizeIcon />
        </div>
      )}
      {selected && selected.uuid === div.uuid && div.containerName === "" && (
        <div
          className="cursor-move rounded-full bg-slate-100 bg-opacity-50 text-black"
          style={{
            position: "absolute",
            left: "-15px",
            top: "-15px",
            padding: "5px",
          }}
          onMouseDown={dragMouseDown}
        >
          <MoveIcon />
        </div>
      )}
      {(isMouseEnter || (selected && selected.uuid === div.uuid)) && (
        <div className="absolute -top-10 left-5 flex w-fit flex-row whitespace-nowrap bg-slate-900 bg-opacity-50">
          <div className="p-2 text-xs text-white">{div.name}</div>
          <div
            className="p-2 text-xs text-white"
            onClick={() => handleDuplicate(div)}
          >
            <Copy />
          </div>
          <div
            className="p-2 text-xs text-white"
            onClick={() => handleSetLock(!div.lock)}
          >
            {div.lock ? <Lock /> : <Unlock />}
          </div>
          <div
            className="p-2 text-xs text-white"
            onClick={() => {
              if (div.lock) return;
              setDeleteItem(div);
              setShowDeleteModal(true);
            }}
          >
            <Trash />
          </div>
        </div>
      )}
    </div>
  );
};
