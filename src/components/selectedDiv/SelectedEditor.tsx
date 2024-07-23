import React from "react";
import { Div, PositionTypes } from "@/pages/CreateUi";
import { SelectedDivEditor } from "./SelectedDivEditor";
import { Position, Size } from "../UiElement";

type SelectedEditorProps = {
    selected: Div | null;
    divs: Div[];
    setDivs: React.Dispatch<React.SetStateAction<Div[]>>;
    updatePosition: (newPosition: Position) => void;
    updateSize: (newSize: Size) => void;
    updateText: (newText: string) => void;
    updateBackgroundColor: (newBackgroundColor: string) => void;
    updateTextColor: (newTextColor: string) => void;
    updateMargin: (newMargin: PositionTypes) => void;
    updatePadding: (newPadding: PositionTypes) => void;
    handleSetLock: (lock: boolean) => void;
    handleDelete: () => void;
    resetDivClickCount: number;
    setSelected: React.Dispatch<React.SetStateAction<Div | null>>;
};

export const SelectedEditor = ({
    selected,
    divs,
    setDivs,
    updatePosition,
    updateSize,
    updateText,
    updateBackgroundColor,
    updateTextColor,
    updateMargin,
    updatePadding,
    handleSetLock,
    handleDelete,
    resetDivClickCount,
    setSelected,
}: SelectedEditorProps) => {
    return (
        <div className="pl-1">
            {selected ? (
                <SelectedDivEditor
                    div={selected}
                    onPositionChange={(newPosition) => updatePosition(newPosition)}
                    onSizeChange={(newSize) => updateSize(newSize)}
                    onTextChange={(newText: string) => updateText(newText)}
                    onBackgroundColorChange={(newBackgroundColor: string) =>
                        updateBackgroundColor(newBackgroundColor)
                    }
                    onTextColorChange={(newTextColor: string) =>
                        updateTextColor(newTextColor)
                    }
                    handleSetLock={(lock: boolean) => {
                        handleSetLock(lock);
                    }}
                    onMarginChange={(newMargin: PositionTypes) => updateMargin(newMargin)}
                    onPaddingChange={(newPadding: PositionTypes) =>
                        updatePadding(newPadding)
                    }
                    onDelete={handleDelete}
                    divs={divs}
                    setDivs={setDivs}
                    setSelected={setSelected}
                />
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
