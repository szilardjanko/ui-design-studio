import React from "react";
import { Div } from "@/pages/create";
import { DownloadImages } from "./DownloadImages";
import { useUiCode } from "@/context/UiCodeContext";

type ImageInstructionsProps = {
  divs: Div[];
};

export type PresetImage = {
  url: string;
  name: string;
};

export const ImageInstructions = ({ divs }: ImageInstructionsProps) => {
  const { showImages } = useUiCode();

  const uniqueSocialImages = new Set<string>();
  const uniqueCustomImages = new Set<string>();
  const uniqueCustomImageUrls = new Set<string>();
  const uniquePresetImages = new Set<PresetImage>();

  const addUniquePresetImage = (image: PresetImage) => {
    const exists = Array.from(uniquePresetImages).some(
      (existingImage) =>
        existingImage.url === image.url && existingImage.name === image.name,
    );
    if (!exists) {
      uniquePresetImages.add(image);
    }
  };

  const findContainedImages = (divs: Div[]) => {
    for (const div of divs) {
      if (
        div.backgroundImage &&
        div.uiElementType !== "social" &&
        !div.backgroundImage?.startsWith("/presets/")
      ) {
        uniqueCustomImages.add(div.backgroundImageFileName ?? "");
        uniqueCustomImageUrls.add(div.backgroundImage ?? "");
      }
      if (div.uiElementType === "social") {
        uniqueSocialImages.add(div.backgroundImageFileName ?? "");
      }
      if (div.backgroundImage && div.backgroundImage.includes("/presets/")) {
        addUniquePresetImage({
          url: div.backgroundImage ?? "",
          name: div.backgroundImageFileName ?? "",
        });
      }
      if (div.uiElementType === "container") {
        findContainedImages(div.containedElements);
      }
    }
  };

  findContainedImages(divs);

  return (
    <div className="flex flex-col items-start justify-between px-8 py-4">
      {showImages ? (
        <DownloadImages
          socialImages={uniqueSocialImages}
          uniquePresetImages={uniquePresetImages}
          customImages={uniqueCustomImages}
          customImageUrls={uniqueCustomImageUrls}
        />
      ) : (
        <div className="flex flex-col items-start">
          <div
            onClick={() => console.log(divs)}
            className="mb-2 w-full text-xl"
          >
            Image Instructions
          </div>
          <div className="mb-2">
            You are using the following{" "}
            {uniqueCustomImages.size + uniqueSocialImages.size}{" "}
            {uniqueCustomImages.size + uniqueSocialImages.size > 1
              ? "images"
              : "image"}
          </div>
          {uniqueCustomImages.size > 0 && (
            <>
              <div>Custom Images</div>
              <div className="mb-2 max-h-24 w-fit overflow-y-auto rounded-md border border-slate-500 bg-slate-800 px-2 py-1">
                {Array.from(uniqueCustomImages).map((image) => (
                  <div key={image}>{image}</div>
                ))}
              </div>
            </>
          )}
          {uniqueSocialImages.size > 0 && (
            <>
              <div>Social Images</div>
              <div className="mb-2 max-h-24 w-fit overflow-y-auto rounded-md border border-slate-500 bg-slate-800 px-2 py-1">
                {Array.from(uniqueSocialImages).map((image) => (
                  <div key={image}>{image}</div>
                ))}
              </div>
            </>
          )}
          <div className="mt-2 max-w-[23rem]">
            Make sure to include a folder named &quot;images&quot; with a
            subfolder named &quot;uiElements&quot; and include{" "}
            {uniqueCustomImages.size + uniqueSocialImages.size > 1
              ? `all ${uniqueCustomImages.size + uniqueSocialImages.size} image files `
              : "the image file "}
            in the &quot;uiElements&quot; folder. If you are using any custom
            images, make sure to include those as well.
          </div>
        </div>
      )}
    </div>
  );
};
