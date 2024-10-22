import { Div, SpritePropertyTypes } from "@/pages/CreateUi";
import React, { useEffect, useState } from "react";
import { PresetColors } from "./PresetColors";
import { SelectedContainerLayout } from "./SelectedContainerLayout";
import { useUiElement } from "@/context/UiElementContext";
import Button from "../Button";
import { UploadIcon } from "../icons/Upload";
import { LabeledNumberInput } from "./PaddingMarginControls";

type TextColorControlsProps = {
  div: Div;
  onTextChange: (newText: string) => void;
  onBackgroundColorChange: (newBackgroundColor: string) => void;
  onTextColorChange: (newTextColor: string) => void;
};

export const TextColorControls = ({
  div,
  onTextChange,
  onBackgroundColorChange,
  onTextColorChange,
}: TextColorControlsProps) => {
  const [hidden, setHidden] = useState(true);
  const [show, setShow] = useState<"color" | "image" | "text">("color");
  const [spriteProperties, setSpriteProperties] = useState<SpritePropertyTypes>(
    {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    },
  );
  const {
    updateBackgroundImage,
    updateHasSprite,
    updateSpriteProperties,
    updateSize,
  } = useUiElement();

  useEffect(() => {
    if (div.spriteProperties) {
      setSpriteProperties(div.spriteProperties);
    }
  }, [div]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          const img = new Image();
          img.onload = () => {
            console.log("image loaded");
            updateBackgroundImage({
              image: result as string,
              imageFileName: file.name,
              width: img.width,
              height: img.height,
            });
          };
          img.src = result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <SelectedContainerLayout
      title="Background"
      hidden={hidden}
      setHidden={setHidden}
    >
      <div className="flex flex-col pb-4 text-center">
        <div className="my-2 flex items-center justify-center">
          <div
            className={`mx-2 cursor-pointer rounded-xl border px-3 py-1 hover:border-slate-500 ${show === "color" ? "border-slate-300" : "border-slate-900"}`}
            onClick={() => setShow("color")}
          >
            Color
          </div>
          <div
            className={`mx-2 cursor-pointer rounded-xl border px-3 py-1 hover:border-slate-500 ${show === "image" ? "border-slate-300" : "border-slate-900"}`}
            onClick={() => setShow("image")}
          >
            Image
          </div>
          {(div.uiElementType === "button" ||
            div.uiElementType === "label" ||
            div.uiElementType === "input") && (
            <div
              className={`mx-2 cursor-pointer rounded-xl border px-3 py-1 hover:border-slate-500 ${show === "text" ? "border-slate-300" : "border-slate-900"}`}
              onClick={() => setShow("text")}
            >
              Text
            </div>
          )}
        </div>
        {show === "text" &&
          div.uiElementType != "container" &&
          div.uiElementType != "social" && (
            <>
              <label
                htmlFor="text-input"
                className="w-full text-center text-white"
              >
                Text
              </label>
              <input
                id="text-input"
                name="text-input"
                className="mx-auto mb-2 w-fit rounded-xl border border-slate-500 bg-slate-700 text-center text-white hover:border-slate-400"
                type="text"
                value={div.text}
                onChange={(e) => onTextChange(e.target.value)}
              />
            </>
          )}
        {show === "color" && (
          <>
            {div.uiElementType != "container" && (
              <>
                <label
                  htmlFor="text-color"
                  className="w-full text-center text-white"
                >
                  Text Color
                </label>
                <input
                  id="text-color"
                  name="text-color"
                  className="mx-auto w-48 cursor-pointer bg-slate-900 bg-opacity-0 px-4"
                  type="color"
                  value={div.textColor}
                  onChange={(e) => onTextColorChange(e.target.value)}
                />
              </>
            )}
            <label htmlFor="bg-color" className="w-full text-center text-white">
              Background Color
            </label>
            <input
              id="bg-color"
              name="bg-color"
              className="mx-auto w-48 cursor-pointer bg-slate-900 bg-opacity-0 px-4"
              type="color"
              value={
                div.backgroundColor === "" ? "#FFFFFF" : div.backgroundColor
              }
              onChange={(e) => onBackgroundColorChange(e.target.value)}
            />
            <label
              htmlFor="transparent"
              className="mx-auto mb-2 mt-1 cursor-pointer"
            >
              Transparent: &nbsp;
              <input
                type="checkbox"
                id="transparent"
                onChange={(e) => {
                  if (e.target.checked) {
                    onBackgroundColorChange("");
                  } else {
                    onBackgroundColorChange("#FFFFFF");
                  }
                }}
                checked={div.backgroundColor === "" ? true : false}
                className="cursor-pointer"
              />
            </label>
            <div>Preset Colors</div>
            <div className="flex w-full justify-center">
              <PresetColors
                div={div}
                onBackgroundColorChange={onBackgroundColorChange}
                onTextColorChange={onTextColorChange}
              />
            </div>
          </>
        )}
        {show === "image" && (
          <div className="mx-auto flex w-56 flex-col items-center">
            <div className="my-2 flex flex-col items-center justify-center">
              <input
                type="file"
                accept="image/png"
                id="imageInput"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="imageInput"
                className="mx-auto flex h-full w-40 cursor-pointer items-center rounded-xl border bg-slate-900 px-4 py-2 text-slate-100"
              >
                <div className="mr-2.5">
                  <UploadIcon />
                </div>
                Upload Image
              </label>
              <label
                htmlFor="spriteToggle"
                className="mx-1 mt-2 inline-flex cursor-pointer items-center md:mx-2"
              >
                Sprite Sheet: &nbsp;
                <input
                  type="checkbox"
                  id="spriteToggle"
                  onChange={(e) => updateHasSprite(e.target.checked)}
                  checked={div.hasSprite ? true : false}
                  className="cursor-pointer"
                />
              </label>
            </div>
            {div.hasSprite && (
              <div>
                <div>
                  w: {div.backgroundImageSize?.width} h:{" "}
                  {div.backgroundImageSize?.height}
                </div>
                <div className="flex flex-col px-4 text-left">
                  <div className="flex flex-row text-center">
                    <LabeledNumberInput
                      label="X"
                      id="spritePositionX"
                      value={spriteProperties.x.toString()}
                      onChange={(value) =>
                        setSpriteProperties((prev) => ({
                          ...prev,
                          x: Number(value),
                        }))
                      }
                      onBlur={() =>
                        updateSpriteProperties({
                          x: Number(spriteProperties.x),
                          y: div.spriteProperties ? div.spriteProperties.y : 0,
                          width: div.spriteProperties
                            ? div.spriteProperties.width
                            : 0,
                          height: div.spriteProperties
                            ? div.spriteProperties.height
                            : 0,
                        })
                      }
                    />
                    <LabeledNumberInput
                      label="Y"
                      id="spritePositionY"
                      value={spriteProperties.y.toString()}
                      onChange={(value) =>
                        setSpriteProperties((prev) => ({
                          ...prev,
                          y: Number(value),
                        }))
                      }
                      onBlur={() =>
                        updateSpriteProperties({
                          x: div.spriteProperties ? div.spriteProperties.x : 0,
                          y: Number(spriteProperties.y),
                          width: div.spriteProperties
                            ? div.spriteProperties.width
                            : 0,
                          height: div.spriteProperties
                            ? div.spriteProperties.height
                            : 0,
                        })
                      }
                    />
                  </div>

                  <div className="mt-2 flex flex-row text-center">
                    <LabeledNumberInput
                      label="Width"
                      id="spriteWidth"
                      value={spriteProperties.width.toString()}
                      onChange={(value) =>
                        setSpriteProperties((prev) => ({
                          ...prev,
                          width: Number(value),
                        }))
                      }
                      onBlur={() => {
                        updateSpriteProperties({
                          x: div.spriteProperties ? div.spriteProperties.x : 0,
                          y: div.spriteProperties ? div.spriteProperties.y : 0,
                          width: Number(spriteProperties.width),
                          height: div.spriteProperties
                            ? div.spriteProperties.height
                            : 0,
                        });
                        updateSize({
                          width: Number(spriteProperties.width),
                          height: div.size.height,
                        });
                      }}
                    />
                    <LabeledNumberInput
                      label="Height"
                      id="spriteHeight"
                      value={spriteProperties.height.toString()}
                      onChange={(value) =>
                        setSpriteProperties((prev) => ({
                          ...prev,
                          height: Number(value),
                        }))
                      }
                      onBlur={() => {
                        updateSpriteProperties({
                          x: div.spriteProperties ? div.spriteProperties.x : 0,
                          y: div.spriteProperties ? div.spriteProperties.y : 0,
                          width: div.spriteProperties
                            ? div.spriteProperties.width
                            : 0,
                          height: Number(spriteProperties.height),
                        });
                        updateSize({
                          width: div.size.width,
                          height: Number(spriteProperties.height),
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            {div.backgroundImageFileName && (
              <Button
                text="Delete Image"
                variant="remove"
                padding="small"
                className={`${div.hasSprite ? "mt-8" : "mt-2"} rounded-xl text-sm`}
                onClick={() =>
                  updateBackgroundImage({
                    image: "",
                    imageFileName: "",
                    width: 0,
                    height: 0,
                  })
                }
              />
            )}
          </div>
        )}
      </div>
    </SelectedContainerLayout>
  );
};
