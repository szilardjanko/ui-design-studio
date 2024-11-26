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
      src: "/uiElements/instagram_color.png",
      alt: "Instagram",
      preset: "instagram_color",
      bgColor: "bg-white",
    },
    {
      src: "/uiElements/instagram.png",
      alt: "Instagram",
      preset: "instagram",
      bgColor: "bg-white",
    },
    {
      src: "/uiElements/instagram_negative.png",
      alt: "Instagram",
      preset: "instagram_negative",
      bgColor: "bg-black",
    },
  ],
  [
    {
      src: "/uiElements/facebook.png",
      alt: "Facebook",
      preset: "facebook",
      bgColor: "bg-white",
    },
    {
      src: "/uiElements/facebook_black.png",
      alt: "Facebook",
      preset: "facebook_black",
      bgColor: "bg-white",
    },
    {
      src: "/uiElements/facebook_negative.png",
      alt: "Facebook",
      preset: "facebook_negative",
      bgColor: "bg-black",
    },
  ],
  [
    {
      src: "/uiElements/twitter.png",
      alt: "Twitter",
      preset: "twitter",
      bgColor: "bg-white",
    },
    {
      src: "/uiElements/twitter_negative.png",
      alt: "Twitter",
      preset: "twitter_negative",
      bgColor: "bg-black",
    },
  ],
  [
    {
      src: "/uiElements/youtube.png",
      alt: "Youtube",
      preset: "youtube",
      bgColor: "bg-white",
    },
    {
      src: "/uiElements/youtube_negative.png",
      alt: "Youtube",
      preset: "youtube_negative",
      bgColor: "bg-black",
    },
  ],
  [
    {
      src: "/uiElements/discord.png",
      alt: "Discord",
      preset: "discord",
      bgColor: "bg-white",
    },
    {
      src: "/uiElements/discord_negative.png",
      alt: "Discord",
      preset: "discord_negative",
      bgColor: "bg-black",
    },
  ],
  [
    {
      src: "/uiElements/github.png",
      alt: "Github",
      preset: "github",
      bgColor: "bg-white",
    },
    {
      src: "/uiElements/github_negative.png",
      alt: "Github",
      preset: "github_negative",
      bgColor: "bg-black",
    },
  ],
  [
    {
      src: "/uiElements/lens.png",
      alt: "Lens",
      preset: "lens",
      bgColor: "bg-black",
    },
    {
      src: "/uiElements/lens_green.png",
      alt: "Lens",
      preset: "lens_green",
      bgColor: "bg-black",
    },
    {
      src: "/uiElements/lens_black.png",
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
    <div className="mt-2 flex max-h-48 flex-col border-t border-slate-500 pt-2">
      <div className="overflow-y-auto">
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
    </div>
  );
};
