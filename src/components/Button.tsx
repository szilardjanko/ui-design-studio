import React, { ButtonHTMLAttributes } from "react";
import { useTheme } from "@/context/ThemeContext";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: React.ReactNode;
  padding?: "small" | "medium" | "large" | "squareMedium" | "custom";
  variant?: "neutral" | "accept" | "submit" | "remove";
  textAlign?: "left" | "center" | "right";
}

const getVariantClasses = (variant: string, theme: string) => {
  if (theme === "dark") {
    switch (variant) {
      case "neutral":
        return "border border-black hover:bg-gradient-to-tl hover:from-slate-700 hover:to-slate-900 hover:border-slate-400";
      default:
        return "border border-black hover:bg-gradient-to-tl hover:from-slate-700 hover:to-slate-900 hover:border-slate-400";
    }
  } else {
    switch (variant) {
      case "neutral":
        return "hover:bg-slate-400";
      default:
        return "hover:bg-slate-400";
    }
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

const getTextAlignClasses = (textAlign: string) => {
  switch (textAlign) {
    case "left":
      return "text-left";
    case "center":
      return "text-center";
    case "right":
      return "text-right";
    default:
      return "text-center";
  }
};

const Button: React.FC<ButtonProps> = ({
  text,
  padding = "medium",
  variant = "neutral",
  textAlign = "left",
  className = "",
  ...rest
}) => {
  const { theme } = useTheme();

  const variantClasses = getVariantClasses(variant, theme);
  const paddingClasses = getPaddingClasses(padding);
  const textAlignClasses = getTextAlignClasses(textAlign);

  const combinedClasses = `${variantClasses} ${paddingClasses} ${textAlignClasses} ${className}`;

  return (
    <button className={combinedClasses} {...rest}>
      {text}
    </button>
  );
};

export default Button;
