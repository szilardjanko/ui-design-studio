import React, { ButtonHTMLAttributes } from "react";
import { useTheme } from "@/context/ThemeContext";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: React.ReactNode;
  padding?: "small" | "medium" | "large" | "squareMedium" | "custom";
  width?: "xs" | "small" | "medium" | "large" | "full";
  variant?: "neutral" | "accept" | "submit" | "remove" | "selected" | "copy";
  textAlign?: "left" | "center" | "right";
  icon?: React.ReactNode;
  iconClasses?: string;
}

const getVariantClasses = (variant: string, theme: string) => {
  switch (variant) {
    case "neutral":
      return "flex items-center border border-slate-600 hover:bg-gradient-to-tl hover:from-slate-700 hover:to-slate-900 hover:border-slate-400 text-white rounded";
    case "selected":
      return "flex items-center border border-slate-500 bg-gradient-to-tl from-slate-700 to-slate-900 hover:border-slate-400 text-white rounded";
    case "copy":
      return "border border-slate-500 bg-gradient-to-tl from-slate-700 to-slate-900 hover:border-slate-400 text-white rounded";
    case "remove":
      return "flex items-center border border-rose-600 bg-gradient-to-tl from-rose-700 to-rose-900 hover:border-rose-400 hover:from-rose-600 hover:to-rose-800 text-white rounded";
    default:
      return "flex items-center border border-black hover:bg-gradient-to-tl hover:from-slate-700 hover:to-slate-900 hover:border-slate-400 text-white rounded";
  }
};

const getPaddingClasses = (padding: string) => {
  switch (padding) {
    case "small":
      return "px-2 py-1";
    case "medium":
      return "px-4 py-2";
    case "large":
      return "px-6 py-3";
    default:
      return "";
  }
};

const getWidthClasses = (width: string) => {
  switch (width) {
    case "xs":
      return "w-fit";
    case "small":
      return "w-24";
    case "medium":
      return "w-32";
    case "large":
      return "w-40";
    case "full":
      return "w-full";
    default:
      return "";
  }
};

const getTextAlignClasses = (textAlign: string) => {
  switch (textAlign) {
    case "left":
      return "justify-start";
    case "center":
      return "justify-center";
    case "right":
      return "justify-end";
    default:
      return "justify-center";
  }
};

const getIconClasses = (iconClasses: string) => {
  switch (iconClasses) {
    case "none":
      return "";
    default:
      return "mr-2";
  }
};

const Button: React.FC<ButtonProps> = ({
  text,
  padding = "medium",
  width = "",
  variant = "neutral",
  textAlign = "center",
  icon,
  iconClasses = "mr-2",
  className = "",
  ...rest
}) => {
  const { theme } = useTheme();

  const variantClasses = getVariantClasses(variant, theme);
  const paddingClasses = getPaddingClasses(padding);
  const widthClasses = getWidthClasses(width);
  const textAlignClasses = getTextAlignClasses(textAlign);

  const combinedClasses = `${variantClasses} ${paddingClasses} ${widthClasses} ${textAlignClasses} ${className} whitespace-nowrap`;

  return (
    <button className={combinedClasses} {...rest}>
      {icon && <span className={getIconClasses(iconClasses)}>{icon}</span>}
      {text && text}
    </button>
  );
};

export default Button;
