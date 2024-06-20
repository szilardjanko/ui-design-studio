import React from "react";

type ZoomControlProps = {
  zoomLevel: number;
  handleZoomChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleResetZoomLevel: () => void;
};

export const ZoomControl = ({
  zoomLevel,
  handleZoomChange,
  handleResetZoomLevel,
}: ZoomControlProps) => {
  return (
    <div className="w-40 py-1 text-center">
      <label htmlFor="zoom-control" className="text-xs text-white">
        Zoom Level: {(zoomLevel * 100).toFixed(0)}%
      </label>
      <input
        id="zoom-control"
        name="zoom-control"
        type="range"
        min="0.5"
        max="3"
        step="0.01"
        value={zoomLevel}
        onChange={handleZoomChange}
        className="cursor-pointer appearance-none rounded-lg border border-slate-400 bg-gradient-to-r from-slate-800 to-slate-600 accent-slate-100"
      />
      <div
        className="-mt-1 cursor-pointer text-xs text-white"
        onClick={() => handleResetZoomLevel()}
      >
        Reset
      </div>
    </div>
  );
};
