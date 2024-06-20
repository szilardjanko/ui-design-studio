import React, { useState } from "react";
import {
  CaretLeft,
  CaretLeftFill,
  CaretRight,
  CaretRightFill,
} from "../icons/LeftRightCaret";

type BgImageControlProps = {
  bgImage: string;
  setBgImage: (bgImage: string) => void;
  handleSetBackgroundImage: (direction: number) => () => void;
  setBgImageCount: (bgImageCount: number) => void;
};

export const BgImageControl = ({
  bgImage,
  setBgImage,
  handleSetBackgroundImage,
  setBgImageCount,
}: BgImageControlProps) => {
  const [isBgImageLeft, setIsBgImageLeft] = useState(false);
  const [isBgImageRight, setIsBgImageRight] = useState(false);
  return (
    <div className="my-2 flex w-40 flex-row items-center justify-evenly">
      <div
        className="cursor-pointer"
        onClick={handleSetBackgroundImage(-1)}
        onMouseEnter={() => setIsBgImageLeft(true)}
        onMouseLeave={() => setIsBgImageLeft(false)}
      >
        {!isBgImageLeft && <CaretLeftFill />}
        {isBgImageLeft && <CaretLeft />}
      </div>
      <div
        className="w-24 text-center text-white"
        onClick={() => {
          setBgImage("");
          setBgImageCount(0);
        }}
      >
        {bgImage === ""
          ? "Background"
          : bgImage === "url(dclBgDay.png)"
            ? "Day"
            : bgImage === "url(dclBgNight.png)"
              ? "Night"
              : "Sunrise"}
      </div>
      <div
        className="cursor-pointer"
        onClick={handleSetBackgroundImage(1)}
        onMouseEnter={() => setIsBgImageRight(true)}
        onMouseLeave={() => setIsBgImageRight(false)}
      >
        {!isBgImageRight && <CaretRightFill />}
        {isBgImageRight && <CaretRight />}
      </div>
    </div>
  );
};
