import React from "react";
import { PresetTypes, UiElementTypes } from "@/pages/CreateUi";
import Image from "next/image";

type SocialProps = {
  addDiv: (uiElementType: UiElementTypes, presetType: PresetTypes) => void;
};

type SocialImage = {
  src: string;
  alt: string;
  preset: PresetTypes;
  bgColor: "bg-white" | "bg-black";
};

const socialImages: SocialImage[][] = [
  [
    {
      src: "/social/instagram_color.png",
      alt: "Instagram",
      preset: "instagram_color",
      bgColor: "bg-white",
    },
    {
      src: "/social/instagram.png",
      alt: "Instagram",
      preset: "instagram",
      bgColor: "bg-white",
    },
    {
      src: "/social/instagram_negative.png",
      alt: "Instagram",
      preset: "instagram_negative",
      bgColor: "bg-black",
    },
  ],
  [
    {
      src: "/social/facebook.png",
      alt: "Facebook",
      preset: "facebook",
      bgColor: "bg-white",
    },
    {
      src: "/social/facebook_black.png",
      alt: "Facebook",
      preset: "facebook_black",
      bgColor: "bg-white",
    },
    {
      src: "/social/facebook_negative.png",
      alt: "Facebook",
      preset: "facebook_negative",
      bgColor: "bg-black",
    },
  ],
  [
    {
      src: "/social/twitter.png",
      alt: "Twitter",
      preset: "twitter",
      bgColor: "bg-white",
    },
    {
      src: "/social/twitter_negative.png",
      alt: "Twitter",
      preset: "twitter_negative",
      bgColor: "bg-black",
    },
  ],
  [
    {
      src: "/social/youtube.png",
      alt: "Youtube",
      preset: "youtube",
      bgColor: "bg-white",
    },
    {
      src: "/social/youtube_negative.png",
      alt: "Youtube",
      preset: "youtube_negative",
      bgColor: "bg-black",
    },
  ],
  [
    {
      src: "/social/discord.png",
      alt: "Discord",
      preset: "discord",
      bgColor: "bg-white",
    },
    {
      src: "/social/discord_negative.png",
      alt: "Discord",
      preset: "discord_negative",
      bgColor: "bg-black",
    },
  ],
  [
    {
      src: "/social/github.png",
      alt: "Github",
      preset: "github",
      bgColor: "bg-white",
    },
    {
      src: "/social/github_negative.png",
      alt: "Github",
      preset: "github_negative",
      bgColor: "bg-black",
    },
  ],
  [
    {
      src: "/social/lens.png",
      alt: "Lens",
      preset: "lens",
      bgColor: "bg-black",
    },
    {
      src: "/social/lens_green.png",
      alt: "Lens",
      preset: "lens_green",
      bgColor: "bg-black",
    },
    {
      src: "/social/lens_black.png",
      alt: "Lens",
      preset: "lens_black",
      bgColor: "bg-white",
    },
  ],
];

const createImageElement = (
  src: string,
  alt: string,
  preset: PresetTypes,
  bgColor: "bg-white" | "bg-black",
  addDiv: (uiElementType: UiElementTypes, presetType: PresetTypes) => void,
  key: string,
) => (
  <Image
    key={key}
    src={src}
    alt={alt}
    width={256}
    height={256}
    className={`mx-1.5 w-9 cursor-pointer rounded-lg border border-slate-500 ${bgColor} p-1`}
    onClick={() => addDiv("social", preset)}
  />
);

export const Social = ({ addDiv }: SocialProps) => {
  return (
    <div className="mt-2 flex max-h-48 flex-col overflow-y-auto border-t border-slate-300 pt-2">
      {socialImages.map((imageRow, rowIndex) => (
        <div key={rowIndex} className="my-2 flex justify-center">
          {imageRow.map((image, index) =>
            createImageElement(
              image.src,
              image.alt,
              image.preset,
              image.bgColor,
              addDiv,
              `${rowIndex}-${index}`,
            ),
          )}
        </div>
      ))}
    </div>
  );
};
