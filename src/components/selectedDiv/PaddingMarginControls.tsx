import React, { useState } from "react";
import { CustomNumberInput } from "./CustomNumberInput";
import { Div, PositionTypes } from "@/pages/CreateUi";
import { SelectedContainerLayout } from "./SelectedContainerLayout";

type PositionStringTypes = {
  top: string;
  right: string;
  bottom: string;
  left: string;
};

type PaddingMarginControlProps = {
  div: Div;
  onMarginChange: (newMargin: PositionTypes) => void;
  onPaddingChange: (newPadding: PositionTypes) => void;
  margin: PositionStringTypes;
  setMargin: React.Dispatch<React.SetStateAction<PositionStringTypes>>;
  padding: PositionStringTypes;
  setPadding: React.Dispatch<React.SetStateAction<PositionStringTypes>>;
};

export const LabeledNumberInput = ({
  label,
  id,
  value,
  onChange,
  onBlur,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}) => (
  <div className="mx-1 flex flex-col">
    <label htmlFor={id} className="text-sm text-white">
      {label}
    </label>
    <CustomNumberInput
      id={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  </div>
);

export const PaddingMarginControls = ({
  div,
  onMarginChange,
  onPaddingChange,
  margin,
  setMargin,
  padding,
  setPadding,
}: PaddingMarginControlProps) => {
  const [hidden, setHidden] = useState(true);

  return (
    <SelectedContainerLayout
      title="Margin - Padding"
      hidden={hidden}
      setHidden={setHidden}
    >
      <div className="flex flex-col px-4">
        <div className="m-1">Margin</div>
        <div className="flex flex-row">
          <LabeledNumberInput
            label="Top"
            id="marginTop"
            value={margin.top}
            onChange={(value) => setMargin((prev) => ({ ...prev, top: value }))}
            onBlur={() =>
              onMarginChange({
                top: Number(margin.top),
                right: div.margin.right,
                bottom: div.margin.bottom,
                left: div.margin.left,
              })
            }
          />
          <LabeledNumberInput
            label="Right"
            id="marginRight"
            value={margin.right}
            onChange={(value) =>
              setMargin((prev) => ({ ...prev, right: value }))
            }
            onBlur={() =>
              onMarginChange({
                top: div.margin.top,
                right: Number(margin.right),
                bottom: div.margin.bottom,
                left: div.margin.left,
              })
            }
          />
        </div>
        <div className="flex flex-row">
          <LabeledNumberInput
            label="Bottom"
            id="marginBottom"
            value={margin.bottom}
            onChange={(value) =>
              setMargin((prev) => ({ ...prev, bottom: value }))
            }
            onBlur={() =>
              onMarginChange({
                top: div.margin.top,
                right: div.margin.right,
                bottom: Number(margin.bottom),
                left: div.margin.left,
              })
            }
          />
          <LabeledNumberInput
            label="Left"
            id="marginLeft"
            value={margin.left}
            onChange={(value) =>
              setMargin((prev) => ({ ...prev, left: value }))
            }
            onBlur={() =>
              onMarginChange({
                top: div.margin.top,
                right: div.margin.right,
                bottom: div.margin.bottom,
                left: Number(margin.left),
              })
            }
          />
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div>Padding</div>
        <div className="flex flex-row">
          <LabeledNumberInput
            label="Top"
            id="paddingTop"
            value={padding.top}
            onChange={(value) =>
              setPadding((prev) => ({ ...prev, top: value }))
            }
            onBlur={() =>
              onPaddingChange({
                top: Number(padding.top),
                right: div.padding.right,
                bottom: div.padding.bottom,
                left: div.padding.left,
              })
            }
          />
          <LabeledNumberInput
            label="Right"
            id="paddingRight"
            value={padding.right}
            onChange={(value) =>
              setPadding((prev) => ({ ...prev, right: value }))
            }
            onBlur={() =>
              onPaddingChange({
                top: div.padding.top,
                right: Number(padding.right),
                bottom: div.padding.bottom,
                left: div.padding.left,
              })
            }
          />
        </div>
        <div className="flex flex-row">
          <LabeledNumberInput
            label="Bottom"
            id="paddingBottom"
            value={padding.bottom}
            onChange={(value) =>
              setPadding((prev) => ({ ...prev, bottom: value }))
            }
            onBlur={() =>
              onPaddingChange({
                top: div.padding.top,
                right: div.padding.right,
                bottom: Number(padding.bottom),
                left: div.padding.left,
              })
            }
          />
          <LabeledNumberInput
            label="Left"
            id="paddingLeft"
            value={padding.left}
            onChange={(value) =>
              setPadding((prev) => ({ ...prev, left: value }))
            }
            onBlur={() =>
              onPaddingChange({
                top: div.padding.top,
                right: div.padding.right,
                bottom: div.padding.bottom,
                left: Number(padding.left),
              })
            }
          />
        </div>
      </div>
    </SelectedContainerLayout>
  );
};
