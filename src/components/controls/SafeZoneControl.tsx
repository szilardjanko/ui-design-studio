import React from "react";
import { Eye } from "../icons/Eye";
import { EyeFill } from "../icons/Eye";

type SafeZoneProps = {
  safeZone: boolean;
  setSafeZone: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SafeZoneControl = ({ safeZone, setSafeZone }: SafeZoneProps) => {
  return (
    <div
      className="flex select-none flex-row items-center justify-start pl-[22px] cursor-pointer"
      onClick={() => setSafeZone(!safeZone)}
    >
      <div>{safeZone ? <EyeFill /> : <Eye />}</div>
      <div className="px-2 py-1 text-white">Safe Zone</div>
    </div>
  );
};
