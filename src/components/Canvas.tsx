import React from "react";
import { Boundary, Position, Size, UiElement } from "./UiElement";
import { Div } from "@/pages/CreateUi";

type CanvasProps = {
    divs: Div[];
    selected: Div | null;
    setDeleteItem: React.Dispatch<React.SetStateAction<Div | null>>;
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    bgImage: string | null;
    gridBackgroundStyle: React.CSSProperties;
    boundary: Boundary;
    snapToGrid: (
        position: Position,
        size: { width: number; height: number },
    ) => Position;
    cellWidth: number;
    cellHeight: number;
    zoomLevel: number;
    targetRef: React.RefObject<HTMLDivElement>;
    handleDivClick: (div: Div, e: React.MouseEvent) => void;
    updatePosition: (newPosition: Position) => void;
    updateSize: (newSize: Size) => void;
    updateText: (newText: string) => void;
    handleSetLock: (lock: boolean) => void;
    handleResetDivClick: () => void;
};

export const Canvas = ({
    divs,
    selected,
    setDeleteItem,
    setShowDeleteModal,
    bgImage,
    gridBackgroundStyle,
    boundary,
    snapToGrid,
    cellWidth,
    cellHeight,
    zoomLevel,
    targetRef,
    handleDivClick,
    updatePosition,
    updateSize,
    updateText,
    handleSetLock,
    handleResetDivClick,
}: CanvasProps) => {
    return (
        <div className="overflow-auto" style={{ width: "100vw" }}>
            <div
                style={{
                    width: `${1248 * zoomLevel}px`,
                    height: `${702 * zoomLevel}px`,
                    transformOrigin: "top left",
                }}
            >
                <div
                    ref={targetRef}
                    className={`relative overflow-hidden text-black`}
                    style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: "top left",
                        width: `1248px`,
                        height: `702px`,
                        backgroundColor: bgImage ? undefined : "#ffffff",
                    }}
                    onClick={handleResetDivClick}
                >
                    {/* Background Image Layer */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: bgImage || undefined,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                        }}
                    />
                    {/* Grid Layer */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            ...gridBackgroundStyle,
                        }}
                    />
                    {divs.map((div, index) => (
                        <UiElement
                            key={index}
                            div={div}
                            selected={selected}
                            uiElementType={div.uiElementType}
                            positionType={div.positionType}
                            position={div.position}
                            onPositionChange={(newPosition) => updatePosition(newPosition)}
                            size={div.size}
                            onSizeChange={(newSize) => updateSize(newSize)}
                            text={div.text}
                            onTextChange={(newText) => updateText(newText)}
                            backgroundColor={div.backgroundColor}
                            textColor={div.textColor}
                            startPosition={{ x: 0, y: 0 }}
                            setStartPosition={() => { }}
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
                            onSelect={handleDivClick}
                            lock={div.lock}
                            handleSetLock={(lock: boolean) => {
                                handleSetLock(lock);
                            }}
                            setDeleteItem={setDeleteItem}
                            setShowDeleteModal={setShowDeleteModal}
                            divs={divs}
                            handleDivSetLock={(lock) => handleSetLock(lock)}
                            updatePosition={updatePosition}
                            updateSize={updateSize}
                            updateText={updateText}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
