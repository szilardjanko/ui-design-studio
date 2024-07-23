import React, { useState } from "react";
import { Edit } from "../icons/Edit";
import {
    CaretLeft,
    CaretLeftFill,
    CaretRight,
    CaretRightFill,
} from "../icons/LeftRightCaret";

type PresetColorsProps = {
    onBackgroundColorChange: (color: string) => void;
    onTextColorChange: (newTextColor: string) => void;
    hasTextColor: boolean;
};

export const PresetColors = ({
    onBackgroundColorChange,
    onTextColorChange,
    hasTextColor,
}: PresetColorsProps) => {
    const [colors, setColors] = useState([
        "#000000",
        "#FFFFFF",
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
    ]);
    const [editColors, setEditColors] = useState(false);
    const [presetOptions, setPresetOptions] = useState<"background" | "text">(
        "background",
    );
    const colorPalette = [
        [
            "#000000",
            "#FFFFFF",
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FFFF00",
            "#FF00FF",
        ],
        [
            "#000000",
            "#FFFFFF",
            "#264653",
            "#2a9d8f",
            "#e9c46a",
            "#f4a261",
            "#e76f51",
        ],
        [
            "#000000",
            "#FFFFFF",
            "#606c38",
            "#283618",
            "#fefae0",
            "#dda15e",
            "#bc6c25",
        ],
        [
            "#000000",
            "#FFFFFF",
            "#132a13",
            "#31572c",
            "#4f772d",
            "#90a955",
            "#ecf39e",
        ],
        [
            "#000000",
            "#FFFFFF",
            "#ccd5ae",
            "#e9edc9",
            "#fefae0",
            "#faedcd",
            "#d4a373",
        ],
        [
            "#000000",
            "#FFFFFF",
            "#03045e",
            "#0077b6",
            "#00b4d8",
            "#90e0ef",
            "#caf0f8",
        ],
        [
            "#000000",
            "#FFFFFF",
            "#ffe5ec",
            "#ffc2d1",
            "#ffb3c6",
            "#ff8fab",
            "#fb6f92",
        ],
    ];

    const [colorPaletteIndex, setColorPaletteIndex] = useState(0);
    const [isLeftCaretHover, setIsLeftCaretHover] = useState(false);
    const [isRightCaretHover, setIsRightCaretHover] = useState(false);
    const [isLeftPaletteCaretHover, setIsLeftPaletteCaretHover] = useState(false);
    const [isRightPaletteCaretHover, setIsRightPaletteCaretHover] =
        useState(false);

    const handleColorChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number,
    ) => {
        const newColors = [...colors];
        newColors[index] = event.target.value;
        setColors(newColors);
    };

    const handleColorClick = (index: number) => {
        if (presetOptions === "text") {
            onTextColorChange(colors[index]);
        } else if (presetOptions === "background") {
            onBackgroundColorChange(colors[index]);
        }
    };

    const handleLeftColorPalletClick = () => {
        const newIndex =
            (colorPaletteIndex - 1 + colorPalette.length) % colorPalette.length;
        setColorPaletteIndex(newIndex);
        setColors(colorPalette[newIndex]);
    };

    const handleRightColorPalletClick = () => {
        const newIndex = (colorPaletteIndex + 1) % colorPalette.length;
        setColorPaletteIndex(newIndex);
        setColors(colorPalette[newIndex]);
    };

    const arraysEqual = (a: string[], b: string[]) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    };

    return (
        <div className="flex flex-col">
            <div className="m-2 flex w-fit flex-row items-center justify-center">
                {editColors && (
                    <div className="flex">
                        {colors.map((color, index) => (
                            <div key={index}>
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(event) => handleColorChange(event, index)}
                                    onBlur={() => setEditColors(false)}
                                    className="mx-1 h-6 w-6 cursor-pointer rounded-lg border border-slate-500 bg-slate-800 px-0.5 hover:shadow hover:shadow-slate-500"
                                />
                            </div>
                        ))}
                    </div>
                )}
                {!editColors && (
                    <div className="flex">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                className="mx-1 h-6 w-6 cursor-pointer rounded-lg border border-slate-500 hover:shadow hover:shadow-slate-500"
                                onClick={() => handleColorClick(index)}
                                style={{
                                    backgroundColor: color,
                                }}
                            />
                        ))}
                    </div>
                )}
                <div
                    className="mx-1 cursor-pointer"
                    onClick={() => setEditColors(!editColors)}
                >
                    <Edit />
                </div>
            </div>
            <div className="mb-2 flex w-full flex-row items-center justify-center">
                <div
                    className="cursor-pointer"
                    onClick={handleLeftColorPalletClick}
                    onMouseEnter={() => setIsLeftPaletteCaretHover(true)}
                    onMouseLeave={() => setIsLeftPaletteCaretHover(false)}
                >
                    {!isLeftPaletteCaretHover && <CaretLeftFill />}
                    {isLeftPaletteCaretHover && <CaretLeft />}
                </div>
                <div className="w-32 text-center text-white">
                    {arraysEqual(colors, colorPalette[0])
                        ? "default"
                        : arraysEqual(colors, colorPalette[1])
                            ? "sunset coastal"
                            : arraysEqual(colors, colorPalette[2])
                                ? "rustic earth"
                                : arraysEqual(colors, colorPalette[3])
                                    ? "forest dawn"
                                    : arraysEqual(colors, colorPalette[4])
                                        ? "vintage"
                                        : arraysEqual(colors, colorPalette[5])
                                            ? " breeze"
                                            : arraysEqual(colors, colorPalette[6])
                                                ? "cotton candy"
                                                : "custom"}
                </div>
                <div
                    className="cursor-pointer"
                    onClick={handleRightColorPalletClick}
                    onMouseEnter={() => setIsRightPaletteCaretHover(true)}
                    onMouseLeave={() => setIsRightPaletteCaretHover(false)}
                >
                    {!isRightPaletteCaretHover && <CaretRightFill />}
                    {isRightPaletteCaretHover && <CaretRight />}
                </div>
            </div>
            {hasTextColor && (
                <div className="mb-2 flex w-full flex-row items-center justify-center">
                    <div
                        className="cursor-pointer"
                        onClick={() =>
                            setPresetOptions((prev) =>
                                prev === "background" ? "text" : "background",
                            )
                        }
                        onMouseEnter={() => setIsLeftCaretHover(true)}
                        onMouseLeave={() => setIsLeftCaretHover(false)}
                    >
                        {!isLeftCaretHover && <CaretLeftFill />}
                        {isLeftCaretHover && <CaretLeft />}
                    </div>
                    <div className="w-32 text-center text-white">{presetOptions}</div>
                    <div
                        className="cursor-pointer"
                        onClick={() =>
                            setPresetOptions((prev) =>
                                prev === "background" ? "text" : "background",
                            )
                        }
                        onMouseEnter={() => setIsRightCaretHover(true)}
                        onMouseLeave={() => setIsRightCaretHover(false)}
                    >
                        {!isRightCaretHover && <CaretRightFill />}
                        {isRightCaretHover && <CaretRight />}
                    </div>
                </div>
            )}
        </div>
    );
};
