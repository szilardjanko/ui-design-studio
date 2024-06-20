import React, { useState } from "react";

type CustomNumberInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

export const CustomNumberInput = ({
  id,
  value,
  onChange,
  onBlur,
}: CustomNumberInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9.-]/g, "");
    if (/^-?\d*\.?\d*$/.test(newValue)) {
      onChange(newValue);
    }
  };

  const formatValue = (value: string, id: string) => {
    if (isFocused) {
      return value;
    }
    if (id === "positionX" || id === "positionY") {
      return `${value} %`;
    } else if (id === "width" || id === "height") {
      return `${value} px`;
    }
    return value;
  };

  return (
    <input
      id={id}
      name={id}
      type="text"
      className="w-24 rounded-xl border border-slate-500 bg-slate-700 text-center text-white hover:border-slate-400"
      value={formatValue(value, id)}
      onChange={handleInputChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => {
        setIsFocused(false);
        onBlur();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onBlur();
        }
      }}
    />
  );
};
