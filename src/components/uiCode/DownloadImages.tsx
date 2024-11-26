import Image from "next/image";
import React from "react";
import { Download } from "../icons/File";
import { PresetImage } from "./ImageInstructions";

type DownloadImagesProps = {
  socialImages: Set<string>;
  uniquePresetImages: Set<PresetImage>;
};

export const DownloadImages = ({
  socialImages,
  uniquePresetImages,
}: DownloadImagesProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 text-lg">Download Images</div>
      <div className="flex flex-wrap items-end justify-center gap-4 rounded-md border border-slate-500 bg-slate-800 px-4 py-2">
        {Array.from(socialImages).map((image, index) => (
          <div key={index} className="flex flex-col items-center p-1">
            <a
              href={`/uiElements/${image}`}
              download={image}
              className="flex flex-col items-center gap-1 text-blue-200 hover:text-blue-500"
            >
              <Image
                src={`/uiElements/${image}`}
                alt={image}
                width={50}
                height={50}
                style={{ width: "auto", height: "auto" }}
              />
              <Download />
            </a>
          </div>
        ))}
        {Array.from(uniquePresetImages).map((image, index) => (
          <div key={index} className="flex flex-col items-center p-1">
            <a
              href={image.url}
              download={image.name}
              className="flex flex-col items-center gap-1 text-blue-200 hover:text-blue-500"
            >
              <Image
                src={`${image.url}`}
                alt={image.name}
                width={50}
                height={50}
                style={{ width: "auto", height: "auto" }}
              />
              <Download />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
